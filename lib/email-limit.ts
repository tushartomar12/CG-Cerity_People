import { EmailStatus } from "@prisma/client";
import { db } from "./db";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_USER_MAILS = 3;

export async function confirmationEmailsSentLastHour(email: string): Promise<number> {
  const since = new Date(Date.now() - WINDOW_MS);
  const [contacts, assessments] = await Promise.all([
    db.contactSubmission.count({
      where: { email, userEmailStatus: EmailStatus.SENT, userEmailSentAt: { gte: since } },
    }),
    db.assessmentSubmission.count({
      where: { email, userEmailStatus: EmailStatus.SENT, userEmailSentAt: { gte: since } },
    }),
  ]);
  return contacts + assessments;
}

export async function shouldSkipUserEmail(email: string): Promise<boolean> {
  return (await confirmationEmailsSentLastHour(email)) >= MAX_USER_MAILS;
}
