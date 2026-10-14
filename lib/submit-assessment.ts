import { buildAssessmentPdfBlob } from "@/components/assessment/buildAssessmentPdf";
import type { AssessmentDetails } from "./assessment-data";
import type { AssessmentAnswers, AssessmentResult } from "./assessment-scoring";

export type AssessmentPayload = {
  details: AssessmentDetails;
  answers: AssessmentAnswers;
  scores: AssessmentResult;
  consent: boolean;
  website?: string;
  submittedAt: string;
};

export async function submitAssessment(
  payload: AssessmentPayload,
): Promise<{ userEmailSent: boolean }> {
  const pdfBlob = await buildAssessmentPdfBlob(payload.details, payload.scores);
  const body = new FormData();
  body.append(
    "payload",
    JSON.stringify({
      details: payload.details,
      answers: payload.answers,
      consent: payload.consent,
      website: payload.website ?? "",
      submittedAt: payload.submittedAt,
    }),
  );
  body.append("website", payload.website ?? "");
  body.append("pdf", pdfBlob, "cerity-people-hr-assessment.pdf");

  const res = await fetch("/api/assessment", { method: "POST", body });
  if (!res.ok) {
    throw new Error(`assessment_submit_${res.status}`);
  }
  const json = (await res.json().catch(() => ({}))) as { userEmailSent?: boolean };
  return { userEmailSent: Boolean(json.userEmailSent) };
}
