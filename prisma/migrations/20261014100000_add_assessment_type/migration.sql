-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('FULL', 'QUICK');

-- AlterTable
ALTER TABLE "AssessmentSubmission" ADD COLUMN "assessmentType" "AssessmentType" NOT NULL DEFAULT 'FULL';
ALTER TABLE "AssessmentSubmission" ADD COLUMN "phone" TEXT;
ALTER TABLE "AssessmentSubmission" ADD COLUMN "jobTitle" TEXT;
