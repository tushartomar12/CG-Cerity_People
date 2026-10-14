import { EmailStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { replyToForPeople, salesTeamEmail, sendEmail } from "@/lib/email";
import { shouldSkipUserEmail } from "@/lib/email-limit";
import { contactSalesEmail, contactUserEmail } from "@/lib/email-templates";
import { clientIp, hashIp } from "@/lib/hash-ip";
import { enforceRateLimit, jsonError, jsonOk, tooLarge } from "@/lib/http";
import { contactSchema, zodFieldErrors } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_JSON_BYTES = 32 * 1024;

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

  const limited = enforceRateLimit(request, "contact");
  if (limited.blocked) return limited.blocked;

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError(400, { error: "validation", fields: zodFieldErrors(parsed.error) });
  }

  const data = parsed.data;
  const ipHash = hashIp(clientIp(request));
  const userAgent = request.headers.get("user-agent")?.slice(0, 400) ?? null;
  const consentAt = new Date();

  const row = await db.contactSubmission.create({
    data: {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      companySize: data.companySize,
      country: data.country,
      service: data.service,
      message: data.message,
      consent: true,
      consentAt,
      source: "contact-page",
      salesEmailStatus: EmailStatus.PENDING,
      userEmailStatus: EmailStatus.PENDING,
      ipHash,
      userAgent,
    },
  });

  let userEmailSent = false;

  try {
    const mail = contactSalesEmail(data, { id: row.id, submittedAt: row.createdAt });
    await sendEmail({
      to: salesTeamEmail(),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: data.email,
    });
    await db.contactSubmission.update({
      where: { id: row.id },
      data: {
        salesEmailStatus: EmailStatus.SENT,
        salesEmailError: null,
        salesEmailSentAt: new Date(),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "email_failed";
    console.error("[contact] sales email failed", row.id, message);
    await db.contactSubmission.update({
      where: { id: row.id },
      data: { salesEmailStatus: EmailStatus.FAILED, salesEmailError: message.slice(0, 500) },
    });
  }

  try {
    if (await shouldSkipUserEmail(data.email)) {
      await db.contactSubmission.update({
        where: { id: row.id },
        data: { userEmailStatus: EmailStatus.SKIPPED, userEmailError: "hourly_cap" },
      });
    } else {
      const mail = contactUserEmail(data);
      await sendEmail({
        to: data.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        replyTo: replyToForPeople(),
      });
      await db.contactSubmission.update({
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
    console.error("[contact] user email failed", row.id, message);
    await db.contactSubmission.update({
      where: { id: row.id },
      data: { userEmailStatus: EmailStatus.FAILED, userEmailError: message.slice(0, 500) },
    });
  }

  return jsonOk({ userEmailSent });
}
