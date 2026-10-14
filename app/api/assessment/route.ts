import { AssessmentType, EmailStatus, type MaturityBand } from "@prisma/client";
import { scoreAssessment } from "@/lib/assessment-scoring";
import { db } from "@/lib/db";
import { replyToForPeople, salesTeamEmail, sendEmail } from "@/lib/email";
import { shouldSkipUserEmail } from "@/lib/email-limit";
import { assessmentPdfFilename, assessmentSalesEmail, assessmentUserEmail } from "@/lib/email-templates";
import { clientIp, hashIp } from "@/lib/hash-ip";
import { enforceRateLimit, jsonError, jsonOk, tooLarge } from "@/lib/http";
import { assessmentPayloadSchema, zodFieldErrors } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BODY_BYTES = 5 * 1024 * 1024;
const MAX_PDF_BYTES = 4 * 1024 * 1024;
const PDF_MAGIC = Buffer.from("%PDF");

function isPdf(buf: Buffer, mime: string): boolean {
  const typeOk = mime === "application/pdf" || mime === "application/octet-stream" || mime === "";
  return typeOk && buf.length >= 4 && buf.subarray(0, 4).equals(PDF_MAGIC);
}

export async function POST(request: Request) {
  if (tooLarge(request, MAX_BODY_BYTES)) {
    return jsonError(413, { error: "payload_too_large" });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError(400, { error: "invalid_form" });
  }

  const website = String(form.get("website") ?? "");
  if (website.trim()) {
    return jsonOk({ userEmailSent: false });
  }

  const limited = enforceRateLimit(request, "assessment");
  if (limited.blocked) return limited.blocked;

  const payloadRaw = form.get("payload");
  if (typeof payloadRaw !== "string") {
    return jsonError(400, { error: "missing_payload" });
  }

  let json: unknown;
  try {
    json = JSON.parse(payloadRaw);
  } catch {
    return jsonError(400, { error: "invalid_json" });
  }

  const parsed = assessmentPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return jsonError(400, { error: "validation", fields: zodFieldErrors(parsed.error) });
  }

  const file = form.get("pdf");
  if (!(file instanceof File)) {
    return jsonError(400, { error: "missing_pdf" });
  }
  if (file.size > MAX_PDF_BYTES) {
    return jsonError(400, { error: "pdf_too_large" });
  }
  const pdfBuf = Buffer.from(await file.arrayBuffer());
  if (!isPdf(pdfBuf, file.type)) {
    return jsonError(400, { error: "invalid_pdf" });
  }

  const { details, answers } = parsed.data;
  const result = scoreAssessment(answers, details.companySize);
  const ipHash = hashIp(clientIp(request));
  const consentAt = new Date();
  const pdfFileName = assessmentPdfFilename(details.company);

  const row = await db.assessmentSubmission.create({
    data: {
      assessmentType: AssessmentType.FULL,
      name: details.name,
      email: details.email,
      company: details.company,
      companySize: details.companySize,
      industry: details.industry,
      hrHeadcount: details.hrHeadcount,
      currentHrms: details.hrmsToday,
      answers,
      categoryScores: result.categories,
      overallScore: Math.round(result.overall),
      maturityBand: result.overallBand as MaturityBand,
      textAnswers: result.quotedText,
      consent: true,
      consentAt,
      salesEmailStatus: EmailStatus.PENDING,
      userEmailStatus: EmailStatus.PENDING,
      pdfFileName,
      ipHash,
    },
  });

  const attachment = { filename: pdfFileName, content: pdfBuf, contentType: "application/pdf" as const };
  let userEmailSent = false;

  try {
    const mail = assessmentSalesEmail(details, result, { id: row.id, submittedAt: row.createdAt });
    await sendEmail({
      to: salesTeamEmail(),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: details.email,
      attachments: [attachment],
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
    console.error("[assessment] sales email failed", row.id, message);
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
      const mail = assessmentUserEmail(details, result);
      await sendEmail({
        to: details.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        replyTo: replyToForPeople(),
        attachments: [attachment],
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
    console.error("[assessment] user email failed", row.id, message);
    await db.assessmentSubmission.update({
      where: { id: row.id },
      data: { userEmailStatus: EmailStatus.FAILED, userEmailError: message.slice(0, 500) },
    });
  }

  return jsonOk({ userEmailSent });
}
