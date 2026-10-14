import { AssessmentType, EmailStatus, type MaturityBand } from "@prisma/client";
import { db } from "@/lib/db";
import { replyToForPeople, salesTeamEmail, sendEmail } from "@/lib/email";
import { shouldSkipUserEmail } from "@/lib/email-limit";
import { assessment0SalesEmail, assessment0UserEmail } from "@/lib/email-templates";
import { scoreAssessment0 } from "@/lib/assessment0-scoring";
import { clientIp, hashIp } from "@/lib/hash-ip";
import { enforceRateLimit, jsonError, jsonOk, tooLarge } from "@/lib/http";
import { assessment0PayloadSchema, zodFieldErrors } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_JSON_BYTES = 64 * 1024;

export async function POST(request: Request) {
  if (tooLarge(request, MAX_JSON_BYTES)) {
    return jsonError(413, { error: "payload_too_large" });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError(400, { error: "invalid_json" });
  }

  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    String((raw as { website?: unknown }).website ?? "").trim()
  ) {
    return jsonOk({ userEmailSent: false });
  }

  const limited = enforceRateLimit(request, "assessment0");
  if (limited.blocked) return limited.blocked;

  const parsed = assessment0PayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError(400, { error: "validation", fields: zodFieldErrors(parsed.error) });
  }

  const { details, answers, consent } = parsed.data;
  const result = scoreAssessment0(answers);
  const ipHash = hashIp(clientIp(request));
  const consentAt = new Date();

  let row;
  try {
    row = await db.assessmentSubmission.create({
      data: {
        assessmentType: AssessmentType.QUICK,
        name: null,
        email: details.email,
        company: "",
        companySize: details.companySize,
        industry: "",
        hrHeadcount: details.hrHeadcount,
        currentHrms: details.hrmsToday,
        answers,
        categoryScores: result.categories,
        overallScore: Math.round(result.overall),
        maturityBand: result.overallBand as MaturityBand,
        textAnswers: result.quotedText,
        consent,
        consentAt,
        salesEmailStatus: EmailStatus.PENDING,
        userEmailStatus: EmailStatus.PENDING,
        ipHash,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "save_failed";
    console.error("[assessment0] save failed", message);
    return jsonError(500, { error: "save_failed" });
  }

  let userEmailSent = false;

  try {
    const mail = assessment0SalesEmail(details, result, { id: row.id, submittedAt: row.createdAt });
    await sendEmail({
      to: salesTeamEmail(),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: details.email,
    });
    await db.assessmentSubmission.update({
      where: { id: row.id },
      data: {
        salesEmailStatus: EmailStatus.SENT,
        salesEmailError: null,
        salesEmailSentAt: new Date(),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "email_failed";
    console.error("[assessment0] sales email failed", row.id, message);
    await db.assessmentSubmission.update({
      where: { id: row.id },
      data: { salesEmailStatus: EmailStatus.FAILED, salesEmailError: message.slice(0, 500) },
    });
  }

  try {
    if (await shouldSkipUserEmail(details.email)) {
      await db.assessmentSubmission.update({
        where: { id: row.id },
        data: { userEmailStatus: EmailStatus.SKIPPED, userEmailError: "hourly_cap" },
      });
    } else {
      const mail = assessment0UserEmail(details, result);
      await sendEmail({
        to: details.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        replyTo: replyToForPeople(),
      });
      await db.assessmentSubmission.update({
        where: { id: row.id },
        data: {
          userEmailStatus: EmailStatus.SENT,
          userEmailError: null,
          userEmailSentAt: new Date(),
        },
      });
      userEmailSent = true;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "email_failed";
    console.error("[assessment0] user email failed", row.id, message);
    await db.assessmentSubmission.update({
      where: { id: row.id },
      data: { userEmailStatus: EmailStatus.FAILED, userEmailError: message.slice(0, 500) },
    });
  }

  return jsonOk({ userEmailSent });
}
