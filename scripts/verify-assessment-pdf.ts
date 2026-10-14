/**
 * Generate assessment PDFs for fixture profiles and print fill % per page.
 * Run from cg-people: npx tsx scripts/verify-assessment-pdf.ts
 */
import fs from "fs";
import path from "path";
import { createElement } from "react";
import { renderToFile } from "@react-pdf/renderer";
import { ASSESSMENT_QUESTIONS, type AssessmentDetails } from "../lib/assessment-data";
import { scoreAssessment } from "../lib/assessment-scoring";
import { ReportDocument } from "../components/assessment/ReportDocument";
import { registerReportFonts } from "../components/assessment/report/registerFonts";

registerReportFonts(path.join(process.cwd(), "public"));

function answersFor(pickMcq: (i: number) => number, text: string) {
  const answers: Record<string, string> = {};
  let i = 0;
  for (const q of ASSESSMENT_QUESTIONS) {
    if (q.type === "mcq") {
      answers[q.id] = q.options[pickMcq(i)].label;
      i += 1;
    } else {
      answers[q.id] = text;
    }
  }
  return answers;
}

const detailsBase: AssessmentDetails = {
  name: "Alex Test",
  email: "alex@example.com",
  company: "Northline",
  companySize: "51–200",
  industry: "IT & Technology",
  hrHeadcount: "4",
  hrmsToday: "Spreadsheets",
};

const lowestAnswers = answersFor(() => 0, "Delay in every cycle.");
const firstText = ASSESSMENT_QUESTIONS.find((q) => q.type === "text");
if (firstText) lowestAnswers[firstText.id] = "";

const profiles = [
  {
    name: "lowest",
    answers: lowestAnswers,
    details: { ...detailsBase, companySize: "1–50", hrHeadcount: "1" },
  },
  {
    name: "mixed",
    answers: answersFor((i) => (i % 2 === 0 ? 1 : 2), "Mixed comments."),
    details: detailsBase,
  },
  {
    name: "highest",
    answers: answersFor(() => 3, "We already run a full HRMS."),
    details: { ...detailsBase, companySize: "501–2000", hrHeadcount: "12" },
  },
  {
    name: "long-text",
    answers: answersFor(
      (i) => (i % 2 === 0 ? 0 : 3),
      `${"Very long comment. ".repeat(20)} 你好 🎉 café`,
    ),
    details: {
      ...detailsBase,
      company: "Northline Global Holdings International Private Limited Bengaluru Campus Extra",
      companySize: "201–500",
      hrHeadcount: "1",
    },
  },
];

async function main() {
  const outDir = path.join(process.cwd(), "scripts", "out");
  fs.mkdirSync(outDir, { recursive: true });
  const publicDir = path.join(process.cwd(), "public");
  const logoSrc = `data:image/png;base64,${fs.readFileSync(path.join(publicDir, "cerity-logo.png")).toString("base64")}`;
  const coverLogoSrc = `data:image/png;base64,${fs.readFileSync(path.join(publicDir, "cerity-logo-contact.png")).toString("base64")}`;
  const generatedAt = new Date("2026-10-12T00:00:00.000Z");
  const manifest: { name: string; file: string; overall: number; band: string }[] = [];

  for (const profile of profiles) {
    const result = scoreAssessment(profile.answers, profile.details.companySize);
    const file = path.join(outDir, `${profile.name}.pdf`);
    await renderToFile(
      createElement(ReportDocument, {
        details: profile.details,
        result,
        logoSrc,
        coverLogoSrc,
        generatedAt,
      }) as never,
      file,
    );
    const buf = fs.readFileSync(file);
    manifest.push({
      name: profile.name,
      file,
      overall: result.overall,
      band: result.overallBand,
    });
    console.log(
      JSON.stringify({
        profile: profile.name,
        overall: result.overall,
        band: result.overallBand,
        hours: result.indicativeHoursPerMonth,
        bytes: buf.length,
      }),
    );
  }
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
