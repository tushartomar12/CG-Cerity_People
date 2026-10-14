"use client";

import { useMemo, useState } from "react";
import {
  ASSESSMENT0_MCQS,
  ASSESSMENT0_QUESTIONS,
  ASSESSMENT0_TEXT,
  emptyAssessment0Details,
  type Assessment0Details,
} from "@/lib/assessment0-data";
import { scoreAssessment0, type Assessment0Result } from "@/lib/assessment0-scoring";
import { assessment0PayloadSchema, zodFieldErrors } from "@/lib/validation";
import { DetailsSection } from "./DetailsSection";
import { Hero } from "./Hero";
import { ProgressChip } from "./ProgressChip";
import { QuestionCard } from "./QuestionCard";
import { ResultPanel } from "./ResultPanel";

type FieldErrors = Record<string, string>;

function focusFirstError(fields: FieldErrors) {
  const order = [
    ...ASSESSMENT0_QUESTIONS.map((q) => `answers.${q.id}`),
    "details.email",
    "details.companySize",
    "details.hrHeadcount",
    "details.hrmsToday",
  ];
  const first = order.find((key) => fields[key]);
  if (!first) return;
  if (first.startsWith("answers.")) {
    const id = first.slice("answers.".length);
    document.getElementById(`a0-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    const radio = document.querySelector<HTMLInputElement>(`#a0-${id} input, #a0-${id} textarea`);
    radio?.focus();
    return;
  }
  const detailKey = first.replace("details.", "");
  const el = document.getElementById(`a0-${mapDetailId(detailKey)}`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  el?.focus();
}

function mapDetailId(key: string): string {
  const map: Record<string, string> = {
    email: "email",
    companySize: "size",
    hrHeadcount: "hr",
    hrmsToday: "hrms",
  };
  return map[key] ?? key;
}

export function Assessment0Form() {
  const [details, setDetails] = useState<Assessment0Details>(emptyAssessment0Details);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Assessment0Result | null>(null);
  const [userEmailSent, setUserEmailSent] = useState(false);

  const answered = useMemo(() => {
    const mcqDone = ASSESSMENT0_MCQS.filter((q) => Boolean(answers[q.id])).length;
    const textDone = (answers[ASSESSMENT0_TEXT.id] ?? "").trim() ? 1 : 0;
    return mcqDone + textDone;
  }, [answers]);

  const detailErrors: Partial<Record<keyof Assessment0Details, string>> = {};
  for (const key of Object.keys(details) as (keyof Assessment0Details)[]) {
    const msg = errors[`details.${key}`] || errors[key];
    if (msg) detailErrors[key] = msg;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = assessment0PayloadSchema.safeParse({
      details,
      answers,
      consent,
      website,
      submittedAt: new Date().toISOString(),
    });
    if (!parsed.success) {
      const fields = zodFieldErrors(parsed.error);
      setErrors(fields);
      requestAnimationFrame(() => focusFirstError(fields));
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
        if (body.fields) {
          setErrors(body.fields);
          requestAnimationFrame(() => focusFirstError(body.fields ?? {}));
          return;
        }
        setErrors({ form: "We couldn’t send your details. Please try again." });
        return;
      }
      const json = (await res.json()) as { userEmailSent?: boolean };
      const scored = scoreAssessment0(parsed.data.answers);
      setUserEmailSent(Boolean(json.userEmailSent));
      setResult(scored);
      requestAnimationFrame(() => {
        document.getElementById("a0-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setErrors({ form: "We couldn’t send your details. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const retake = () => {
    setDetails(emptyAssessment0Details());
    setAnswers({});
    setConsent(false);
    setWebsite("");
    setErrors({});
    setResult(null);
    setUserEmailSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return <ResultPanel details={details} result={result} userEmailSent={userEmailSent} onRetake={retake} />;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl" noValidate>
      <Hero />
      <div className="relative mt-10 rounded-2xl border border-amber-200/50 bg-white/50 shadow-xl shadow-navy/5 backdrop-blur-xl">
        <ProgressChip answered={answered} total={ASSESSMENT0_QUESTIONS.length} />
        <div className="p-6 sm:p-10">
          <h2 className="font-serif text-2xl text-navy">Quick HR check</h2>
          <p className="mt-1 text-sm text-slate-600">Seven scored questions plus one optional one-liner.</p>
          <div className="mt-6 space-y-8">
            {ASSESSMENT0_QUESTIONS.map((q, i) => (
              <QuestionCard
                key={q.id}
                index={i + 1}
                total={ASSESSMENT0_QUESTIONS.length}
                question={q}
                value={answers[q.id] ?? ""}
                error={errors[`answers.${q.id}`]}
                onChange={(value) => {
                  setAnswers((a) => ({ ...a, [q.id]: value }));
                  setErrors((e) => ({ ...e, [`answers.${q.id}`]: "" }));
                }}
              />
            ))}
          </div>
          <DetailsSection
            values={details}
            errors={detailErrors}
            onChange={(key, value) => {
              setDetails((d) => ({ ...d, [key]: value }));
              setErrors((e) => ({ ...e, [`details.${key}`]: "", [key]: "" }));
            }}
            consent={consent}
            onConsentChange={setConsent}
          />
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="a0-website">Website</label>
            <input
              id="a0-website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {errors.form ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {errors.form}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-8 rounded-full bg-[#1677E8] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Calculating…" : "See my HR score"}
          </button>
        </div>
      </div>
    </form>
  );
}
