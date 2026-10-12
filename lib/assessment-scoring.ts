import { companySizesForm } from "./data";
import {
  ASSESSMENT_CATEGORIES,
  ASSESSMENT_QUESTIONS,
  CATEGORY_WEIGHTS,
  MATURITY_BANDS,
  type AssessmentCategory,
  type MaturityBand,
  type McqQuestion,
} from "./assessment-data";

export type AssessmentAnswers = Record<string, string>;

export type CategoryScore = {
  category: AssessmentCategory;
  percent: number;
  band: MaturityBand;
  mcqCount: number;
  rawSum: number;
};

export type GapItem = {
  category: AssessmentCategory;
  percent: number;
  band: MaturityBand;
  insights: string[];
  solvedBy: string[];
  indicativeHoursPerMonth: number;
};

export type AssessmentResult = {
  overall: number;
  overallBand: MaturityBand;
  categories: CategoryScore[];
  gaps: GapItem[];
  quotedText: { questionId: string; category: AssessmentCategory; prompt: string; answer: string }[];
  mcqRows: {
    questionId: string;
    category: AssessmentCategory;
    prompt: string;
    answerLabel: string;
    score: 0 | 1 | 2 | 3;
    gapInsight: string;
    solvedBy: string;
  }[];
  indicativeHoursPerMonth: number;
  complianceLevel: "High" | "Medium" | "Low";
  headcountMidpoint: number;
};

export function bandForScore(percent: number): MaturityBand {
  const clamped = Math.max(0, Math.min(100, percent));
  const match = MATURITY_BANDS.find((b) => clamped >= b.min && clamped <= b.max);
  return match?.band ?? "Critical";
}

export function parseHeadcountMidpoint(companySize: string): number {
  const known = companySizesForm.find((s) => s === companySize);
  if (!known) return 25;
  if (known === "1–50") return 25;
  if (known === "51–200") return 125;
  if (known === "201–500") return 350;
  if (known === "501–2000") return 1250;
  return 2500;
}

function mcqQuestions(): McqQuestion[] {
  return ASSESSMENT_QUESTIONS.filter((q): q is McqQuestion => q.type === "mcq");
}

export function scoreAssessment(
  answers: AssessmentAnswers,
  companySize: string,
): AssessmentResult {
  const mcqs = mcqQuestions();
  const categories: CategoryScore[] = ASSESSMENT_CATEGORIES.map((category) => {
    const catMcqs = mcqs.filter((q) => q.category === category);
    const rawSum = catMcqs.reduce((sum, q) => {
      const chosen = q.options.find((o) => o.label === answers[q.id]);
      return sum + (chosen?.score ?? 0);
    }, 0);
    const max = 3 * catMcqs.length;
    const percent = max === 0 ? 0 : Math.round((rawSum / max) * 1000) / 10;
    return {
      category,
      percent,
      band: bandForScore(percent),
      mcqCount: catMcqs.length,
      rawSum,
    };
  });

  const overall =
    Math.round(
      categories.reduce((acc, c) => acc + c.percent * CATEGORY_WEIGHTS[c.category], 0) * 10,
    ) / 10;

  const ranked = [...categories].sort((a, b) => a.percent - b.percent);
  const lowCount = ranked.filter((c) => c.percent < 80).length;
  const gapCount = Math.min(5, Math.max(3, lowCount === 0 ? 3 : Math.min(5, Math.max(3, lowCount))));
  const gapCats = ranked.slice(0, gapCount);

  const headcountMidpoint = parseHeadcountMidpoint(companySize);
  const hoursCoeff = 0.35;

  const gaps: GapItem[] = gapCats.map((c) => {
    const catMcqs = mcqs.filter((q) => q.category === c.category);
    const insights = [...new Set(catMcqs.map((q) => q.gapInsight))];
    const solvedBy = [...new Set(catMcqs.map((q) => q.solvedBy))];
    const indicativeHoursPerMonth =
      Math.round(headcountMidpoint * (1 - c.percent / 100) * hoursCoeff * 10) / 10;
    return {
      category: c.category,
      percent: c.percent,
      band: c.band,
      insights,
      solvedBy,
      indicativeHoursPerMonth,
    };
  });

  const quotedText = ASSESSMENT_QUESTIONS.filter((q) => q.type === "text")
    .map((q) => ({
      questionId: q.id,
      category: q.category,
      prompt: q.prompt,
      answer: (answers[q.id] ?? "").trim(),
    }))
    .filter((row) => row.answer.length > 0);

  const mcqRows = mcqs.map((q) => {
    const chosen = q.options.find((o) => o.label === answers[q.id]);
    return {
      questionId: q.id,
      category: q.category,
      prompt: q.prompt,
      answerLabel: chosen?.label ?? "Not answered",
      score: (chosen?.score ?? 0) as 0 | 1 | 2 | 3,
      gapInsight: q.gapInsight,
      solvedBy: q.solvedBy,
    };
  });

  const indicativeHoursPerMonth =
    Math.round(gaps.reduce((s, g) => s + g.indicativeHoursPerMonth, 0) * 10) / 10;

  const payroll = categories.find((c) => c.category === "Payroll, Compliance & HR Data");
  const p = payroll?.percent ?? 0;
  let complianceLevel: "High" | "Medium" | "Low" = "Low";
  if (p < 40) complianceLevel = "High";
  else if (p < 60) complianceLevel = "Medium";

  return {
    overall,
    overallBand: bandForScore(overall),
    categories,
    gaps,
    quotedText,
    mcqRows,
    indicativeHoursPerMonth,
    complianceLevel,
    headcountMidpoint,
  };
}
