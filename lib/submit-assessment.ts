import type { AssessmentDetails } from "./assessment-data";
import type { AssessmentAnswers, AssessmentResult } from "./assessment-scoring";

export type AssessmentPayload = {
  details: AssessmentDetails;
  answers: AssessmentAnswers;
  scores: AssessmentResult;
  submittedAt: string;
};

export async function submitAssessment(payload: AssessmentPayload): Promise<void> {
  // TODO: wire CRM
  await new Promise((r) => setTimeout(r, 600));
  if (process.env.NODE_ENV !== "production") {
    console.info("[assessment] lead captured (no CRM)", {
      email: payload.details.email,
      company: payload.details.company,
      overall: payload.scores.overall,
      band: payload.scores.overallBand,
    });
  }
}