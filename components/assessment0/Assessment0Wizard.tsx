"use client";

import { useCallback, useEffect, useState } from "react";
import { companySizesForm } from "@/lib/data";
import {
  ASSESSMENT0_MCQS,
  ASSESSMENT0_TEXT,
  type Assessment0Details,
} from "@/lib/assessment0-data";
import { WIZARD_TOPIC_TRAIL, WIZARD_TOTAL_STEPS } from "@/lib/assessment0-display";
import { Assessment0QuestionStep, selectMcqByLetter } from "./Assessment0QuestionStep";

type Props = {
  details: Assessment0Details;
  answers: Record<string, string>;
  onDetailsChange: (patch: Partial<Assessment0Details>) => void;
  onAnswer: (id: string, value: string) => void;
  onComplete: () => void;
  onExit: () => void;
};

export function Assessment0Wizard({
  details,
  answers,
  onDetailsChange,
  onAnswer,
  onComplete,
  onExit,
}: Props) {
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(25);

  const mcqIndex = step - 1;
  const currentMcq = step >= 1 && step <= 7 ? ASSESSMENT0_MCQS[mcqIndex] : null;
  const isTextStep = step === 8;
  const isSizeStep = step === 0;

  useEffect(() => {
    const t = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [step]);

  const goTo = useCallback(
    (next: number) => {
      if (next >= WIZARD_TOTAL_STEPS) {
        onComplete();
        return;
      }
      if (next < 0) {
        onExit();
        return;
      }
      setStep(next);
      setSecondsLeft(25);
    },
    [onComplete, onExit],
  );

  const advance = useCallback(() => {
    goTo(step + 1);
  }, [goTo, step]);

  const handleMcqSelect = useCallback(
    (label: string) => {
      if (!currentMcq) return;
      onAnswer(currentMcq.id, label);
    },
    [currentMcq, onAnswer],
  );

  const handleSizeSelect = useCallback(
    (size: string) => {
      onDetailsChange({ companySize: size });
    },
    [onDetailsChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toUpperCase();
      if (!["A", "B", "C", "D", "E"].includes(key)) return;
      const idx = ["A", "B", "C", "D", "E"].indexOf(key);
      if (isSizeStep) {
        const opt = companySizesForm[idx];
        if (opt) handleSizeSelect(opt);
        return;
      }
      if (currentMcq) {
        const label = selectMcqByLetter(currentMcq, key);
        if (label) handleMcqSelect(label);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSizeStep, currentMcq, handleMcqSelect, handleSizeSelect]);

  const canContinue =
    (isSizeStep && Boolean(details.companySize)) ||
    (currentMcq ? Boolean(answers[currentMcq.id]) : false);

  return (
    <div className="relative z-10 mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          Question {step + 1} of {WIZARD_TOTAL_STEPS}
        </p>
        <p className="text-sm text-slate-500">
          {secondsLeft > 0 ? `About ${secondsLeft} seconds left` : "Take your time"}
        </p>
      </div>
      <div className="mb-8 flex gap-1" aria-hidden>
        {Array.from({ length: WIZARD_TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-navy" : "bg-slate-200"}`}
          />
        ))}
      </div>
      <p className="mb-6 text-right text-xs text-slate-500">
        {WIZARD_TOPIC_TRAIL.map((label, i) => (
          <span key={`${label}-${i}`}>
            <span className={i === step ? "font-bold text-brand" : ""}>{label}</span>
            {i < WIZARD_TOPIC_TRAIL.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>

      <div className="rounded-2xl border border-white/70 bg-white/60 p-6 shadow-lg shadow-navy/5 backdrop-blur-sm sm:p-10">
        {isSizeStep ? (
          <Assessment0QuestionStep
            mode="size"
            prompt="How many people work at your organisation?"
            options={[...companySizesForm]}
            value={details.companySize}
            onSelect={handleSizeSelect}
          />
        ) : null}
        {currentMcq ? (
          <Assessment0QuestionStep
            mode="mcq"
            question={currentMcq}
            value={answers[currentMcq.id] ?? ""}
            onSelect={handleMcqSelect}
          />
        ) : null}
        {isTextStep ? (
          <Assessment0QuestionStep
            mode="text"
            prompt={ASSESSMENT0_TEXT.prompt}
            value={answers[ASSESSMENT0_TEXT.id] ?? ""}
            onChange={(v) => onAnswer(ASSESSMENT0_TEXT.id, v)}
            onContinue={onComplete}
          />
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(step - 1)}
          className="text-sm font-medium text-navy hover:underline"
        >
          ← Back
        </button>
        {!isTextStep ? (
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-slate-500 sm:block">Select an option, then Continue</p>
            <button
              type="button"
              onClick={advance}
              disabled={!canContinue}
              className="rounded-full bg-[#1677E8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1266c7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
