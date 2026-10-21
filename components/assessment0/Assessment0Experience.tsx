"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyAssessment0Details, type Assessment0Details } from "@/lib/assessment0-data";
import { scoreAssessment0 } from "@/lib/assessment0-scoring";
import { assessment0PayloadSchema, zodFieldErrors } from "@/lib/validation";
import { Assessment0Landing } from "./Assessment0Landing";
import { Assessment0LeadCapture } from "./Assessment0LeadCapture";
import { Assessment0ResultReport } from "./Assessment0ResultReport";
import { Assessment0Shell } from "./Assessment0Shell";
import { Assessment0Wizard } from "./Assessment0Wizard";

type Phase = "landing" | "wizard" | "results";

export function Assessment0Experience() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [details, setDetails] = useState<Assessment0Details>(emptyAssessment0Details);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [userEmailSent, setUserEmailSent] = useState(false);

  const result = phase === "results" ? scoreAssessment0(answers) : null;
  const headache = result?.quotedText[0]?.answer;

  useEffect(() => {
    if (phase !== "results") return;
    const id = window.setTimeout(() => {
      document.getElementById("a0-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => window.clearTimeout(id);
  }, [phase]);

  const resetAll = useCallback(() => {
    setPhase("landing");
    setDetails(emptyAssessment0Details());
    setAnswers({});
    setConsent(false);
    setWebsite("");
    setErrors({});
    setSubmitting(false);
    setLeadSubmitted(false);
    setUserEmailSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = assessment0PayloadSchema.safeParse({
      details: {
        ...details,
        hrHeadcount: details.hrHeadcount || "",
        hrmsToday: details.hrmsToday || "",
      },
      answers,
      consent,
      website,
      submittedAt: new Date().toISOString(),
    });
    if (!parsed.success) {
      const fields = zodFieldErrors(parsed.error);
      if (!consent) fields.consent = "Consent is required.";
      setErrors(fields);
      requestAnimationFrame(() => {
        document.getElementById("a0-name")?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }
    if (!consent) {
      setErrors({ consent: "Consent is required." });
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/assessment0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 429) {
        setErrors({ form: "Too many requests. Please try again in a few minutes." });
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { fields?: Record<string, string> };
        if (body.fields) setErrors(body.fields);
        else setErrors({ form: "We could not send your details. Please try again." });
        return;
      }
      const json = (await res.json()) as { userEmailSent?: boolean };
      setUserEmailSent(Boolean(json.userEmailSent));
      setLeadSubmitted(true);
    } catch {
      setErrors({ form: "We could not send your details. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Assessment0Shell>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="a0-website">Website</label>
        <input
          id="a0-website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {phase === "landing" ? (
        <Assessment0Landing
          onStart={() => {
            setPhase("wizard");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : null}

      {phase === "wizard" ? (
        <Assessment0Wizard
          details={details}
          answers={answers}
          onDetailsChange={(patch) => setDetails((d) => ({ ...d, ...patch }))}
          onAnswer={(id, value) => setAnswers((a) => ({ ...a, [id]: value }))}
          onComplete={() => setPhase("results")}
          onExit={resetAll}
        />
      ) : null}

      {phase === "results" && result ? (
        <div id="a0-results">
          <Assessment0ResultReport
            result={result}
            headache={headache}
            onRetake={resetAll}
          />
          <Assessment0LeadCapture
            details={details}
            errors={errors}
            consent={consent}
            submitting={submitting}
            submitted={leadSubmitted}
            userEmailSent={userEmailSent}
            onChange={(patch) => {
              setDetails((d) => ({ ...d, ...patch }));
              setErrors((e) => {
                const next = { ...e };
                for (const key of Object.keys(patch)) {
                  delete next[`details.${key}`];
                  delete next[key];
                }
                return next;
              });
            }}
            onConsentChange={(v) => {
              setConsent(v);
              setErrors((e) => ({ ...e, consent: "" }));
            }}
            onSubmit={onLeadSubmit}
          />
        </div>
      ) : null}
    </Assessment0Shell>
  );
}
