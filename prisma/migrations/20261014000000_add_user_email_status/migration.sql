-- AlterEnum
ALTER TYPE "EmailStatus" ADD VALUE 'SKIPPED';

-- AlterTable ContactSubmission
ALTER TABLE "ContactSubmission" ADD COLUMN "salesEmailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "ContactSubmission" ADD COLUMN "userEmailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "ContactSubmission" ADD COLUMN "salesEmailError" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN "userEmailError" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN "salesEmailSentAt" TIMESTAMP(3);
ALTER TABLE "ContactSubmission" ADD COLUMN "userEmailSentAt" TIMESTAMP(3);

UPDATE "ContactSubmission"
SET
  "salesEmailStatus" = "emailStatus",
  "salesEmailError" = "emailError",
  "salesEmailSentAt" = CASE WHEN "emailStatus" = 'SENT' THEN "createdAt" ELSE NULL END;

ALTER TABLE "ContactSubmission" DROP COLUMN "emailStatus";
ALTER TABLE "ContactSubmission" DROP COLUMN "emailError";

-- AlterTable AssessmentSubmission
ALTER TABLE "AssessmentSubmission" ADD COLUMN "salesEmailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "AssessmentSubmission" ADD COLUMN "userEmailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "AssessmentSubmission" ADD COLUMN "salesEmailError" TEXT;
ALTER TABLE "AssessmentSubmission" ADD COLUMN "userEmailError" TEXT;
ALTER TABLE "AssessmentSubmission" ADD COLUMN "salesEmailSentAt" TIMESTAMP(3);
ALTER TABLE "AssessmentSubmission" ADD COLUMN "userEmailSentAt" TIMESTAMP(3);

UPDATE "AssessmentSubmission"
SET
  "salesEmailStatus" = "emailStatus",
  "salesEmailError" = "emailError",
  "salesEmailSentAt" = CASE WHEN "emailStatus" = 'SENT' THEN "createdAt" ELSE NULL END;

ALTER TABLE "AssessmentSubmission" DROP COLUMN "emailStatus";
ALTER TABLE "AssessmentSubmission" DROP COLUMN "emailError";
