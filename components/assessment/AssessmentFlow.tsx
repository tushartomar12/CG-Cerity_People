"use client";

import { useState } from "react";
import {
  ASSESSMENT_STEPS,
  emptyDetails,
  type AssessmentDetails,
} from "@/lib/assessment-data";
import { scoreAssessment, type AssessmentAnswers, type AssessmentResult } from "@/lib/assessment-scoring";
import { submitAssessment } from "@/lib/submit-assessment";
import { assessmentDetailsSchema, zodFieldErrors } from "@/lib/validation";
import { DetailsStep } from "./DetailsStep";
import { Intro } from "./Intro";
import { QuestionStep } from "./QuestionStep";
import { Results } from "./Results";

type Phase = "intro" | "details" | "questions" | "analyzing" | "results";

const TOTAL_STEPS = ASSESSMENT_STEPS.length + 1;

export function AssessmentFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [details, setDetails] = useState<AssessmentDetails>(emptyDetails);
  const [detailErrors, setDetailErrors] = useState<Partial<Record<keyof AssessmentDetails, string>>>({});
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [qErrors, setQErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [website, setWebsite] = useState("");
  const [sendFailed, setSendFailed] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [userEmailSent, setUserEmailSent] = useState(false);

  const onDetailChange = (key: keyof AssessmentDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setDetailErrors((e) => ({ ...e, [key]: undefined }));
  };

  const sendLead = async (scored: AssessmentResult) => {
    return submitAssessment({
      details,
      answers,
      scores: scored,
      consent,
      website,
      submittedAt: new Date().toISOString(),
    });
  };

  const finish = async () => {
    const scored = scoreAssessment(answers, details.companySize);
    setResult(scored);
    setPhase("analyzing");
    try {
      const sent = await sendLead(scored);
      setSendFailed(false);
      setUserEmailSent(sent.userEmailSent);
    } catch {
      setSendFailed(true);
      setUserEmailSent(false);
    }
    setPhase("results");
  };

  const retrySend = async () => {
    if (!result) return;
    setRetrying(true);
    try {
      const sent = await sendLead(result);
      setSendFailed(false);
      setUserEmailSent(sent.userEmailSent);
    } catch {
      setSendFailed(true);
    } finally {
      setRetrying(false);
    }
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
        consent={consent}
        consentError={consentError}
        onConsentChange={(value) => {
          setConsent(value);
          setConsentError("");
        }}
        website={website}
        onWebsiteChange={setWebsite}
        onNext={() => {
          const parsed = assessmentDetailsSchema.safeParse(details);
          if (!parsed.success) {
            const fields = zodFieldErrors(parsed.error);
            const next: Partial<Record<keyof AssessmentDetails, string>> = {};
            for (const [k, v] of Object.entries(fields)) {
              next[k as keyof AssessmentDetails] = v;
            }
            setDetailErrors(next);
            return;
          }
          if (!consent) {
            setConsentError("Consent is required.");
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
        sendFailed={sendFailed}
        retrying={retrying}
        userEmailSent={userEmailSent}
        onRetrySend={() => void retrySend()}
        onRetake={() => {
          setPhase("intro");
          setStepIndex(0);
          setResult(null);
          setAnswers({});
          setDetails(emptyDetails());
          setDetailErrors({});
          setQErrors({});
          setConsent(false);
          setConsentError("");
          setWebsite("");
          setSendFailed(false);
          setUserEmailSent(false);
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