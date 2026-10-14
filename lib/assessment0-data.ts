import { ASSESSMENT_QUESTIONS, type McqOption, type McqQuestion, type TextQuestion } from "./assessment-data";
import { hrTechModules } from "./data";

export const ASSESSMENT0_CATEGORIES = [
  "Recruitment & Hiring",
  "Onboarding",
  "Attendance & Leave",
  "Payroll & Compliance",
  "Performance Management",
  "Engagement & Retention",
  "HR Data & Reporting",
] as const;

export type Assessment0Category = (typeof ASSESSMENT0_CATEGORIES)[number];

export type Assessment0Mcq = Omit<McqQuestion, "category"> & { category: Assessment0Category };
export type Assessment0Text = Omit<TextQuestion, "category"> & { category: Assessment0Category };
export type Assessment0Question = Assessment0Mcq | Assessment0Text;

function moduleTitle(title: string): string {
  const match = hrTechModules.find((m) => m.title === title);
  if (!match) {
    throw new Error(`Unknown HR tech module: ${title}`);
  }
  return match.title;
}

function fromExisting(id: string, category: Assessment0Category): Assessment0Mcq {
  const found = ASSESSMENT_QUESTIONS.find((q) => q.id === id);
  if (!found || found.type !== "mcq") {
    throw new Error(`Missing MCQ ${id}`);
  }
  return { ...found, category };
}

function mcq(
  id: string,
  category: Assessment0Category,
  prompt: string,
  options: [McqOption, McqOption, McqOption, McqOption],
  gapInsight: string,
  solvedBy: string,
): Assessment0Mcq {
  return {
    id,
    category,
    type: "mcq",
    prompt,
    options,
    gapInsight,
    solvedBy: moduleTitle(solvedBy),
  };
}

function text(id: string, category: Assessment0Category, prompt: string): Assessment0Text {
  return { id, category, type: "text", prompt };
}

/** Seven scored MCQs (reused by id where they fit) plus one optional one-liner. */
export const ASSESSMENT0_QUESTIONS: Assessment0Question[] = [
  fromExisting("rec-q1", "Recruitment & Hiring"),
  fromExisting("onb-q1", "Onboarding"),
  fromExisting("att-q1", "Attendance & Leave"),
  fromExisting("pay-q1", "Payroll & Compliance"),
  mcq(
    "perf-q0",
    "Performance Management",
    "How do you set goals and run performance reviews?",
    [
      { label: "Informal conversations only — no consistent record", score: 0 },
      { label: "Annual reviews in documents or slides", score: 1 },
      { label: "A review tool, with goals still loosely tracked", score: 2 },
      { label: "Ongoing goals, reviews, and development in one system", score: 3 },
    ],
    "Goals and reviews are hard to coach against because they are not captured consistently.",
    "Performance",
  ),
  mcq(
    "eng-q0",
    "Engagement & Retention",
    "How do you track engagement, attrition risk, and why people leave?",
    [
      { label: "We hear issues only when someone resigns", score: 0 },
      { label: "Occasional surveys or manager notes", score: 1 },
      { label: "Regular pulse surveys, with limited follow-up", score: 2 },
      { label: "Engagement signals, stay conversations, and action tracking", score: 3 },
    ],
    "Retention risk stays invisible until people leave, so action often comes too late.",
    "Employee Management",
  ),
  fromExisting("dat-q2", "HR Data & Reporting"),
  text("headache-t0", "Engagement & Retention", "What is your single biggest HR headache today?"),
];

export const ASSESSMENT0_MCQS = ASSESSMENT0_QUESTIONS.filter(
  (q): q is Assessment0Mcq => q.type === "mcq",
);

export const ASSESSMENT0_TEXT = ASSESSMENT0_QUESTIONS.find(
  (q): q is Assessment0Text => q.type === "text",
)!;

export const HEADACHE_MAX = 200;

export type Assessment0Details = {
  email: string;
  companySize: string;
  hrHeadcount: string;
  hrmsToday: string;
};

export const emptyAssessment0Details = (): Assessment0Details => ({
  email: "",
  companySize: "",
  hrHeadcount: "",
  hrmsToday: "",
});
