import { BAND_COLORS } from "./assessment-data";
import {
  ASSESSMENT0_CATEGORIES,
  ASSESSMENT0_MCQS,
  ASSESSMENT0_TEXT,
  type Assessment0Category,
} from "./assessment0-data";
import { bandForScore, type AssessmentAnswers } from "./assessment-scoring";
import type { MaturityBand } from "./assessment-data";

export type Assessment0CategoryScore = {
  category: Assessment0Category;
  percent: number;
  band: MaturityBand;
  mcqCount: number;
  rawSum: number;
};

export type Assessment0Gap = {
  category: Assessment0Category;
  percent: number;
  band: MaturityBand;
  insights: string[];
  solvedBy: string[];
};

export type Assessment0Result = {
  overall: number;
  overallBand: MaturityBand;
  categories: Assessment0CategoryScore[];
  gaps: Assessment0Gap[];
  quotedText: { questionId: string; category: Assessment0Category; prompt: string; answer: string }[];
};

export function scoreAssessment0(answers: AssessmentAnswers): Assessment0Result {
  const categories: Assessment0CategoryScore[] = ASSESSMENT0_CATEGORIES.map((category) => {
    const catMcqs = ASSESSMENT0_MCQS.filter((q) => q.category === category);
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

  const weight = 1 / categories.length;
  const overall =
    Math.round(categories.reduce((acc, c) => acc + c.percent * weight, 0) * 10) / 10;

  const ranked = [...categories].sort((a, b) => a.percent - b.percent);
  const gaps: Assessment0Gap[] = ranked.slice(0, 3).map((c) => {
    const catMcqs = ASSESSMENT0_MCQS.filter((q) => q.category === c.category);
    return {
      category: c.category,
      percent: c.percent,
      band: c.band,
      insights: [...new Set(catMcqs.map((q) => q.gapInsight))],
      solvedBy: [...new Set(catMcqs.map((q) => q.solvedBy))],
    };
  });

  const textAnswer = (answers[ASSESSMENT0_TEXT.id] ?? "").trim();
  const quotedText = textAnswer
    ? [
        {
          questionId: ASSESSMENT0_TEXT.id,
          category: ASSESSMENT0_TEXT.category,
          prompt: ASSESSMENT0_TEXT.prompt,
          answer: textAnswer,
        },
      ]
    : [];

  return {
    overall,
    overallBand: bandForScore(overall),
    categories,
    gaps,
    quotedText,
  };
}

export { BAND_COLORS };
