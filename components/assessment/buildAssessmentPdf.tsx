import { pdf } from "@react-pdf/renderer";
import type { AssessmentDetails } from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { ReportDocument } from "./ReportDocument";
import { registerReportFonts } from "./report/registerFonts";

export async function buildAssessmentPdfBlob(
  details: AssessmentDetails,
  result: AssessmentResult,
): Promise<Blob> {
  registerReportFonts(window.location.origin);
  const origin = window.location.origin;
  return pdf(
    <ReportDocument
      details={details}
      result={result}
      logoSrc={`${origin}/cerity-logo.png`}
      coverLogoSrc={`${origin}/cerity-logo-contact.png`}
    />,
  ).toBlob();
}
