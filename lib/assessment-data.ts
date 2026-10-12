import { hrTechModules } from "./data";

export const ASSESSMENT_CATEGORIES = [
  "Recruitment & Hiring",
  "Onboarding",
  "Attendance & Leave",
  "Payroll, Compliance & HR Data",
] as const;

export type AssessmentCategory = (typeof ASSESSMENT_CATEGORIES)[number];

export const CATEGORY_WEIGHTS: Record<AssessmentCategory, number> = {
  "Recruitment & Hiring": 0.25,
  Onboarding: 0.25,
  "Attendance & Leave": 0.25,
  "Payroll, Compliance & HR Data": 0.25,
};

export type MaturityBand = "Critical" | "Reactive" | "Developing" | "Optimized";

export const MATURITY_BANDS: { min: number; max: number; band: MaturityBand }[] = [
  { min: 0, max: 39, band: "Critical" },
  { min: 40, max: 59, band: "Reactive" },
  { min: 60, max: 79, band: "Developing" },
  { min: 80, max: 100, band: "Optimized" },
];

export const BAND_COLORS: Record<MaturityBand, string> = {
  Critical: "#DC2626",
  Reactive: "#D97706",
  Developing: "#1677E8",
  Optimized: "#059669",
};

export type McqOption = { label: string; score: 0 | 1 | 2 | 3 };

export type McqQuestion = {
  id: string;
  category: AssessmentCategory;
  type: "mcq";
  prompt: string;
  options: [McqOption, McqOption, McqOption, McqOption];
  gapInsight: string;
  solvedBy: string;
};

export type TextQuestion = {
  id: string;
  category: AssessmentCategory;
  type: "text";
  prompt: string;
};

export type AssessmentQuestion = McqQuestion | TextQuestion;

export const HRMS_TODAY_OPTIONS = ["None", "Spreadsheets", "Basic tool", "Full HRMS"] as const;
export type HrmsToday = (typeof HRMS_TODAY_OPTIONS)[number];

function mcq(
  id: string,
  category: AssessmentCategory,
  prompt: string,
  options: [McqOption, McqOption, McqOption, McqOption],
  gapInsight: string,
  solvedBy: string,
): McqQuestion {
  return { id, category, type: "mcq", prompt, options, gapInsight, solvedBy };
}

function text(id: string, category: AssessmentCategory, prompt: string): TextQuestion {
  return { id, category, type: "text", prompt };
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  mcq(
    "rec-q1",
    "Recruitment & Hiring",
    "How do you manage open roles and candidates today?",
    [
      { label: "Email, WhatsApp, or memory — no single tracker", score: 0 },
      { label: "Spreadsheets shared across the hiring team", score: 1 },
      { label: "A standalone ATS or job board inbox", score: 2 },
      { label: "Integrated ATS with stages, SLAs, and reporting", score: 3 },
    ],
    "Hiring lives outside a system of record, so pipelines stall and offers are hard to audit.",
    "Recruitment & ATS",
  ),
  mcq(
    "rec-q2",
    "Recruitment & Hiring",
    "How are interviews scheduled and feedback collected?",
    [
      { label: "Ad-hoc chats and calendar ping-pong", score: 0 },
      { label: "Manual calendar holds with notes in email", score: 1 },
      { label: "A scheduling tool, feedback still unstructured", score: 2 },
      { label: "Coordinated scheduling with captured interviewer scores", score: 3 },
    ],
    "Interview coordination is manual, which slows time-to-offer and weakens hiring decisions.",
    "Recruitment & ATS",
  ),
  text("rec-t1", "Recruitment & Hiring", "What is the single biggest delay in your hiring process today?"),

  mcq(
    "onb-q1",
    "Onboarding",
    "How do new joiners complete paperwork and day-one tasks?",
    [
      { label: "Paper files and chase-ups after they join", score: 0 },
      { label: "Email checklists and shared folders", score: 1 },
      { label: "A basic onboarding form or HR tool", score: 2 },
      { label: "Automated tasks, documents, and day-one readiness in one flow", score: 3 },
    ],
    "Onboarding is fragmented, so day-one readiness depends on who remembers to chase.",
    "Onboarding",
  ),
  mcq(
    "onb-q2",
    "Onboarding",
    "How are assets, access, and policy acknowledgements assigned?",
    [
      { label: "IT and HR coordinate informally", score: 0 },
      { label: "Spreadsheets of laptops, IDs, and sign-offs", score: 1 },
      { label: "Partial tracking in separate IT and HR tools", score: 2 },
      { label: "Joined-up assignment with a complete joining record", score: 3 },
    ],
    "Joining formalities and equipment are not tied to a single employee record.",
    "Onboarding",
  ),
  text("onb-t1", "Onboarding", "What usually goes wrong in the first week for a new hire?"),

  mcq(
    "att-q1",
    "Attendance & Leave",
    "How is attendance tracked?",
    [
      { label: "Paper register or no consistent record", score: 0 },
      { label: "Spreadsheets updated by managers", score: 1 },
      { label: "Basic biometric or app, little auto-regularisation", score: 2 },
      { label: "Integrated attendance with policy-based regularisation", score: 3 },
    ],
    "Attendance is not reliable enough for payroll, leave, or compliance.",
    "Attendance",
  ),
  mcq(
    "att-q2",
    "Attendance & Leave",
    "How do employees apply for leave and see balances?",
    [
      { label: "Verbal or email requests, balances unknown", score: 0 },
      { label: "Spreadsheets or shared calendars", score: 1 },
      { label: "A leave tool not tied to attendance or payroll", score: 2 },
      { label: "Policy-driven leave with live balances and approvals", score: 3 },
    ],
    "Leave is hard to approve fairly because balances and policies are not in one place.",
    "Leave Management",
  ),
  text("att-t1", "Attendance & Leave", "Where do attendance or leave disputes usually start?"),

  mcq(
    "pay-q1",
    "Payroll, Compliance & HR Data",
    "How is payroll prepared each cycle, and how are statutory filings tracked?",
    [
      { label: "Manual calculations and reactive filings when something is due", score: 0 },
      { label: "Spreadsheets, accountant files, and calendar reminders", score: 1 },
      { label: "Payroll software with some returns handled by a consultant or tool", score: 2 },
      { label: "Integrated pay runs and tracked filings with records ready for review", score: 3 },
    ],
    "Payroll and compliance still depend on manual inputs, which raises error and evidence risk.",
    "Payroll",
  ),
  mcq(
    "dat-q2",
    "Payroll, Compliance & HR Data",
    "Where does employee data live, and how do leaders get headcount or cost views?",
    [
      { label: "Scattered files; leaders wait on a manual extract", score: 0 },
      { label: "Master spreadsheets and monthly slides from sheets", score: 1 },
      { label: "An HR tool for some fields; reports are not self-serve", score: 2 },
      { label: "Central profiles with dashboards for workforce insights", score: 3 },
    ],
    "There is no reliable source of truth for people data, so payroll and leadership reports wait on extracts.",
    "HR Analytics",
  ),
  text(
    "pay-t1",
    "Payroll, Compliance & HR Data",
    "Which payroll, compliance, or people report is hardest to produce on time?",
  ),
];

export const ASSESSMENT_STEPS = ASSESSMENT_CATEGORIES.map((category) => ({
  category,
  questions: ASSESSMENT_QUESTIONS.filter((q) => q.category === category),
}));

export const INDICATIVE_ASSUMPTIONS = [
  "All figures are indicative and based only on self-reported answers.",
  "Workforce size uses the mid-point of the selected company-size band (2000+ treated as 2500).",
  "Hours-lost estimate = workforce mid-point × (1 − category score / 100) × 0.35 hours per person per month, summed across priority-gap categories.",
  "Compliance risk is High if Payroll, Compliance & HR Data is below 40; Medium if below 60; otherwise Low.",
  "This is not a legal, tax, or statutory audit.",
] as const;

export type AssessmentDetails = {
  name: string;
  email: string;
  company: string;
  companySize: string;
  industry: string;
  hrHeadcount: string;
  hrmsToday: string;
};

export const emptyDetails = (): AssessmentDetails => ({
  name: "",
  email: "",
  company: "",
  companySize: "",
  industry: "",
  hrHeadcount: "",
  hrmsToday: "",
});

export function moduleCopy(title: string): { title: string; description: string } {
  const match = hrTechModules.find((m) => m.title === title);
  return match ?? { title, description: "" };
}
