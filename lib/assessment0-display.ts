import { ASSESSMENT0_MCQS } from "./assessment0-data";
import type { Assessment0Category } from "./assessment0-data";
import type { Assessment0Result } from "./assessment0-scoring";
import type { MaturityBand } from "./assessment-data";

export type RiskLevel = "High" | "Medium" | "Low";

export type DisplayRiskAreaId =
  | "compliance"
  | "performance"
  | "payroll"
  | "hiring"
  | "employee_relations"
  | "onboarding";

export type DisplayRiskArea = {
  id: DisplayRiskAreaId;
  label: string;
  percent: number;
  risk: RiskLevel;
  body: string;
  basedOn: string;
};

export type Assessment0DisplayReport = {
  overall: number;
  overallHeadline: string;
  attentionCount: number;
  summaryParagraph: string;
  areas: DisplayRiskArea[];
};

const DISPLAY_AREAS: {
  id: DisplayRiskAreaId;
  label: string;
  categories: Assessment0Category[];
  primaryQuestionId: string;
  basedOnParts: string[];
}[] = [
  {
    id: "compliance",
    label: "Compliance",
    categories: ["HR Data & Reporting"],
    primaryQuestionId: "dat-q2",
    basedOnParts: ["people data and reporting"],
  },
  {
    id: "performance",
    label: "Performance",
    categories: ["Performance Management"],
    primaryQuestionId: "perf-q0",
    basedOnParts: ["formal performance system"],
  },
  {
    id: "payroll",
    label: "Payroll",
    categories: ["Payroll & Compliance", "Attendance & Leave"],
    primaryQuestionId: "pay-q1",
    basedOnParts: ["payroll preparation and filings", "attendance tracking"],
  },
  {
    id: "hiring",
    label: "Hiring",
    categories: ["Recruitment & Hiring"],
    primaryQuestionId: "rec-q1",
    basedOnParts: ["how open roles and candidates are managed"],
  },
  {
    id: "employee_relations",
    label: "Employee relations",
    categories: ["Engagement & Retention"],
    primaryQuestionId: "eng-q0",
    basedOnParts: ["engagement and attrition signals"],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    categories: ["Onboarding"],
    primaryQuestionId: "onb-q1",
    basedOnParts: ["new joiner paperwork and day-one tasks"],
  },
];

export function riskLevelFromPercent(percent: number): RiskLevel {
  if (percent < 40) return "High";
  if (percent < 80) return "Medium";
  return "Low";
}

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  High: "#DC2626",
  Medium: "#D97706",
  Low: "#059669",
};

export function overallRiskHeadline(band: MaturityBand, attentionCount: number): string {
  if (band === "Optimized") {
    return attentionCount === 0 ? "Lower risk: keep strengthening HR foundations" : `Lower risk: ${attentionCount} area${attentionCount === 1 ? "" : "s"} to watch`;
  }
  if (band === "Critical" || band === "Reactive") {
    return attentionCount > 0
      ? `Higher risk: ${attentionCount} area${attentionCount === 1 ? "" : "s"} need attention now`
      : "Higher risk: review your HR foundations";
  }
  return attentionCount > 0
    ? `Moderate risk: ${attentionCount} area${attentionCount === 1 ? "" : "s"} need attention now`
    : "Moderate risk: a few upgrades would strengthen HR";
}

function gapInsightForQuestion(questionId: string): string {
  const q = ASSESSMENT0_MCQS.find((m) => m.id === questionId);
  return q?.gapInsight ?? "";
}

function percentForCategories(
  result: Assessment0Result,
  categories: Assessment0Category[],
): number {
  const matches = result.categories.filter((c) => categories.includes(c.category));
  if (matches.length === 0) return 0;
  return Math.min(...matches.map((c) => c.percent));
}

function buildSummaryParagraph(areas: DisplayRiskArea[], result: Assessment0Result): string {
  const high = areas.filter((a) => a.risk === "High");
  if (high.length >= 2) {
    const names = high.slice(0, 2).map((a) => a.label);
    return `${names[0]} and ${names[1]} scored High. Both carry real exposure if left as they are. The good news: most of this can be improved in the next quarter.`;
  }
  if (high.length === 1) {
    return `${high[0].label} scored High. Addressing it early reduces compliance and people risk. Other areas are in better shape at ${Math.round(result.overall)}/100 overall.`;
  }
  const medium = areas.filter((a) => a.risk === "Medium");
  if (medium.length > 0) {
    return `No critical hotspots, but ${medium.length} area${medium.length === 1 ? "" : "s"} sit at Medium risk. Small process upgrades can move your HR Risk Index toward the green zone.`;
  }
  return "Your answers point to a solid HR foundation. Keep documenting processes and reviewing people data so risk stays low as you scale.";
}

export function buildAssessment0DisplayReport(result: Assessment0Result): Assessment0DisplayReport {
  const areas: DisplayRiskArea[] = DISPLAY_AREAS.map((def) => {
    const percent = percentForCategories(result, def.categories);
    const risk = riskLevelFromPercent(percent);
    const basedOn = def.basedOnParts.join(", ");
    return {
      id: def.id,
      label: def.label,
      percent,
      risk,
      body: gapInsightForQuestion(def.primaryQuestionId),
      basedOn,
    };
  });

  const attentionCount = areas.filter((a) => a.risk === "High").length;
  const summaryParagraph = buildSummaryParagraph(areas, result);

  return {
    overall: result.overall,
    overallHeadline: overallRiskHeadline(result.overallBand, attentionCount),
    attentionCount,
    summaryParagraph,
    areas,
  };
}

/** Static sample for landing preview card */
export const SAMPLE_DISPLAY_REPORT: Assessment0DisplayReport = {
  overall: 50,
  overallHeadline: "Moderate risk: 2 areas need attention now",
  attentionCount: 2,
  summaryParagraph:
    "Compliance and Performance scored High. Both carry real exposure if left as they are. The good news: most of this can be improved in the next quarter.",
  areas: [
    {
      id: "compliance",
      label: "Compliance",
      percent: 33.3,
      risk: "High",
      body: "There is no reliable source of truth for people data, so payroll and leadership reports wait on extracts.",
      basedOn: "people data and reporting",
    },
    {
      id: "performance",
      label: "Performance",
      percent: 0,
      risk: "High",
      body: "Goals and reviews are hard to coach against because they are not captured consistently.",
      basedOn: "formal performance system",
    },
    {
      id: "payroll",
      label: "Payroll",
      percent: 66.7,
      risk: "Medium",
      body: "Payroll and compliance still depend on manual inputs, which raises error and evidence risk.",
      basedOn: "payroll preparation and filings, attendance tracking",
    },
    {
      id: "hiring",
      label: "Hiring",
      percent: 66.7,
      risk: "Medium",
      body: "Hiring lives outside a system of record, so pipelines stall and offers are hard to audit.",
      basedOn: "how open roles and candidates are managed",
    },
    {
      id: "employee_relations",
      label: "Employee relations",
      percent: 66.7,
      risk: "Medium",
      body: "Retention risk stays invisible until people leave, so action often comes too late.",
      basedOn: "engagement and attrition signals",
    },
    {
      id: "onboarding",
      label: "Onboarding",
      percent: 100,
      risk: "Low",
      body: "Onboarding is fragmented, so day-one readiness depends on who remembers to chase.",
      basedOn: "new joiner paperwork and day-one tasks",
    },
  ],
};

export const WIZARD_TOPIC_TRAIL = [
  "Size",
  "Hiring",
  "Onboarding",
  "Payroll",
  "Payroll",
  "Performance",
  "People",
  "Compliance",
  "People",
] as const;

export const WIZARD_TOTAL_STEPS = 9;
