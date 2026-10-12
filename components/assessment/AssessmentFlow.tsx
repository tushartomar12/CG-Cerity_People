"use client";

import { useState } from "react";
import {
  ASSESSMENT_STEPS,
  emptyDetails,
  type AssessmentDetails,
} from "@/lib/assessment-data";
import { scoreAssessment, type AssessmentAnswers, type AssessmentResult } from "@/lib/assessment-scoring";
import { submitAssessment } from "@/lib/submit-assessment";
import { DetailsStep } from "./DetailsStep";
import { Intro } from "./Intro";
import { QuestionStep } from "./QuestionStep";
import { Results } from "./Results";

type Phase = "intro" | "details" | "questions" | "analyzing" | "results";

const TOTAL_STEPS = ASSESSMENT_STEPS.length + 1;

function validateDetails(values: AssessmentDetails): Partial<Record<keyof AssessmentDetails, string>> {
  const errors: Partial<Record<keyof AssessmentDetails, string>> = {};
  if (!values.email.trim()) errors.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid work email.";
  if (!values.company.trim()) errors.company = "Company is required.";
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.companySize) errors.companySize = "Select company size.";
  if (!values.industry) errors.industry = "Select industry.";
  if (!values.hrHeadcount.trim()) errors.hrHeadcount = "Enter HR headcount.";
  else if (!/^\d+$/.test(values.hrHeadcount) || Number(values.hrHeadcount) < 0)
    errors.hrHeadcount = "Enter a whole number.";
  if (!values.hrmsToday) errors.hrmsToday = "Select how you run HR today.";
  return errors;
}

export function AssessmentFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [details, setDetails] = useState<AssessmentDetails>(emptyDetails);
  const [detailErrors, setDetailErrors] = useState<Partial<Record<keyof AssessmentDetails, string>>>({});
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [qErrors, setQErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const onDetailChange = (key: keyof AssessmentDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setDetailErrors((e) => ({ ...e, [key]: undefined }));
  };

  const finish = async () => {
    const scored = scoreAssessment(answers, details.companySize);
    setResult(scored);
    setPhase("analyzing");
    await submitAssessment({
      details,
      answers,
      scores: scored,
      submittedAt: new Date().toISOString(),
    });
    setPhase("results");
  };

  if (phase === "intro") {
    return <Intro onStart={() => setPhase("details")} />;
  }

  if (phase === "details") {
    return (
      <DetailsStep
        values={details}
        errors={detailErrors}
        onChange={onDetailChange}
        totalSteps={TOTAL_STEPS}
        onBack={() => setPhase("intro")}
        onNext={() => {
          const next = validateDetails(details);
          if (Object.keys(next).length > 0) {
            setDetailErrors(next);
            return;
          }
          setPhase("questions");
          setStepIndex(0);
        }}
      />
    );
  }

  if (phase === "analyzing") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-amber-200/50 bg-white/50 p-10 text-center backdrop-blur-xl">
        <p className="font-serif text-2xl text-navy">Analysing your answers…</p>
        <p className="mt-2 text-sm text-slate-600">Building an indicative scorecard.</p>
      </div>
    );
  }

  if (phase === "results" && result) {
    return (
      <Results
        details={details}
        result={result}
        onRetake={() => {
          setPhase("intro");
          setStepIndex(0);
          setResult(null);
          setAnswers({});
          setDetails(emptyDetails());
          setDetailErrors({});
          setQErrors({});
        }}
      />
    );
  }

  const step = ASSESSMENT_STEPS[stepIndex];
  const isLast = stepIndex === ASSESSMENT_STEPS.length - 1;

  return (
    <QuestionStep
      category={step.category}
      questions={step.questions}
      answers={answers}
      errors={qErrors}
      step={stepIndex + 2}
      totalSteps={TOTAL_STEPS}
      nextLabel={isLast ? "See results" : "Continue"}
      onAnswer={(id, value) => {
        setAnswers((a) => ({ ...a, [id]: value }));
        setQErrors((e) => ({ ...e, [id]: "" }));
      }}
      onBack={() => {
        if (stepIndex === 0) setPhase("details");
        else setStepIndex((i) => i - 1);
      }}
      onNext={() => {
        const missing: Record<string, string> = {};
        for (const q of step.questions) {
          if (q.type === "mcq" && !answers[q.id]) missing[q.id] = "Please select an option.";
        }
        if (Object.keys(missing).length > 0) {
          setQErrors(missing);
          return;
        }
        if (isLast) void finish();
        else setStepIndex((i) => i + 1);
      }}
    />
  );
}