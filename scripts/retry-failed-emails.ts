/**
 * Resend FAILED contact sales and/or user emails.
 * Assessment PDFs are not stored. User assessment mail is never resent without a PDF.
 * Optional: RETRY_ASSESSMENT_SALES_WITHOUT_PDF=1 sends assessment sales-only (no attachment).
 *
 *   npx tsx scripts/retry-failed-emails.ts
 */
import { AssessmentType, EmailStatus } from "@prisma/client";
import { scoreAssessment } from "../lib/assessment-scoring";
import { scoreAssessment0 } from "../lib/assessment0-scoring";
import type { AssessmentDetails } from "../lib/assessment-data";
import type { Assessment0Details } from "../lib/assessment0-data";
import type { AssessmentAnswers } from "../lib/assessment-scoring";
import { db } from "../lib/db";
import { replyToForPeople, salesTeamEmail, sendEmail } from "../lib/email";
import {
  assessment0SalesEmail,
  assessment0UserEmail,
  assessmentSalesEmail,
  contactSalesEmail,
  contactUserEmail,
} from "../lib/email-templates";
import type { ContactInput } from "../lib/validation";

function asContactInput(row: {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  companySize: string | null;
  country: string | null;
  service: string | null;
  message: string;
}): ContactInput {
  return {
    fullName: row.name,
    email: row.email,
    phone: row.phone ?? "",
    company: row.company ?? "",
    companySize: (row.companySize ?? "1–50") as ContactInput["companySize"],
    country: row.country ?? "",
    service: (row.service ?? "Other") as ContactInput["service"],
    message: row.message,
    consent: true,
    website: "",
  };
}

async function retryContactSales() {
  const rows = await db.contactSubmission.findMany({
    where: { salesEmailStatus: EmailStatus.FAILED },
    orderBy: { createdAt: "asc" },
  });
  console.log(`Contact sales FAILED: ${rows.length}`);
  for (const row of rows) {
    const data = asContactInput(row);
    try {
      const mail = contactSalesEmail(data, { id: row.id, submittedAt: row.createdAt });
      await sendEmail({
        to: salesTeamEmail(),
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        replyTo: row.email,
      });
      await db.contactSubmission.update({
        where: { id: row.id },
        data: {
          salesEmailStatus: EmailStatus.SENT,
          salesEmailError: null,
          salesEmailSentAt: new Date(),
        },
      });
      console.log(`resent contact sales ${row.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "email_failed";
      console.error(`still failed contact sales ${row.id}`, message);
    }
  }
}

async function retryContactUser() {
  const rows = await db.contactSubmission.findMany({
    where: { userEmailStatus: EmailStatus.FAILED },
    orderBy: { createdAt: "asc" },
  });
  console.log(`Contact user FAILED: ${rows.length}`);
  for (const row of rows) {
    const data = asContactInput(row);
    try {
      const mail = contactUserEmail(data);
      await sendEmail({
        to: row.email,
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
      console.log(`resent contact user ${row.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "email_failed";
      console.error(`still failed contact user ${row.id}`, message);
    }
  }
}

async function retryAssessments() {
  const salesFailed = await db.assessmentSubmission.findMany({
    where: { salesEmailStatus: EmailStatus.FAILED },
    orderBy: { createdAt: "asc" },
  });
  const userFailed = await db.assessmentSubmission.findMany({
    where: { userEmailStatus: EmailStatus.FAILED },
    select: { id: true, email: true, company: true, createdAt: true, assessmentType: true },
  });

  console.log(`Assessment sales FAILED: ${salesFailed.length}`);
  const allowSalesWithoutPdf = process.env.RETRY_ASSESSMENT_SALES_WITHOUT_PDF === "1";

  for (const row of salesFailed) {
    const isQuick = row.assessmentType === AssessmentType.QUICK;
    if (!isQuick && !allowSalesWithoutPdf) {
      console.log(`PDF not stored — regenerate to resend ${row.id}`);
      continue;
    }
    try {
      if (isQuick) {
        const details: Assessment0Details = {
          name: row.name ?? "",
          email: row.email,
          phone: row.phone ?? "",
          companySize: row.companySize,
          hrHeadcount: row.hrHeadcount,
          hrmsToday: row.currentHrms,
        };
        const result = scoreAssessment0(row.answers as AssessmentAnswers);
        const mail = assessment0SalesEmail(details, result, { id: row.id, submittedAt: row.createdAt });
        await sendEmail({
          to: salesTeamEmail(),
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
          replyTo: row.email,
        });
      } else {
        const details: AssessmentDetails = {
          name: row.name ?? "",
          email: row.email,
          company: row.company,
          companySize: row.companySize,
          industry: row.industry,
          hrHeadcount: row.hrHeadcount,
          hrmsToday: row.currentHrms,
        };
        const result = scoreAssessment(row.answers as AssessmentAnswers, details.companySize);
        const mail = assessmentSalesEmail(details, result, { id: row.id, submittedAt: row.createdAt });
        await sendEmail({
          to: salesTeamEmail(),
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
          replyTo: row.email,
        });
      }
      await db.assessmentSubmission.update({
        where: { id: row.id },
        data: {
          salesEmailStatus: EmailStatus.SENT,
          salesEmailError: null,
          salesEmailSentAt: new Date(),
        },
      });
      console.log(`resent assessment sales${isQuick ? " (quick)" : " (no PDF)"} ${row.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "email_failed";
      console.error(`still failed assessment sales ${row.id}`, message);
    }
  }

  const quickUserFailed = await db.assessmentSubmission.findMany({
    where: { userEmailStatus: EmailStatus.FAILED, assessmentType: AssessmentType.QUICK },
    orderBy: { createdAt: "asc" },
  });
  console.log(`Assessment QUICK user FAILED: ${quickUserFailed.length}`);
  for (const row of quickUserFailed) {
    try {
      const details: Assessment0Details = {
        name: row.name ?? "",
        email: row.email,
        phone: row.phone ?? "",
        companySize: row.companySize,
        hrHeadcount: row.hrHeadcount,
        hrmsToday: row.currentHrms,
      };
      const result = scoreAssessment0(row.answers as AssessmentAnswers);
      const mail = assessment0UserEmail(details, result);
      await sendEmail({
        to: row.email,
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
      console.log(`resent assessment0 user ${row.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "email_failed";
      console.error(`still failed assessment0 user ${row.id}`, message);
    }
  }

  const fullUserFailed = userFailed.filter((row) => row.assessmentType !== AssessmentType.QUICK);
  console.log(`Assessment FULL user FAILED (PDF not stored — regenerate to resend): ${fullUserFailed.length}`);
  for (const row of fullUserFailed) {
    console.log(`  ${row.id} ${row.email} ${row.company} ${row.createdAt.toISOString()}`);
  }
}

async function main() {
  await retryContactSales();
  await retryContactUser();
  await retryAssessments();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
