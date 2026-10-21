"use client";

import { cn } from "@/lib/utils";
import type { Assessment0Mcq } from "@/lib/assessment0-data";
import { HEADACHE_MAX } from "@/lib/assessment0-data";

const LETTERS = ["A", "B", "C", "D", "E"] as const;

type McqProps = {
  mode: "mcq";
  question: Assessment0Mcq;
  value: string;
  onSelect: (label: string) => void;
};

type TextProps = {
  mode: "text";
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
};

type SizeProps = {
  mode: "size";
  prompt: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
};

type Props = McqProps | TextProps | SizeProps;

export function Assessment0QuestionStep(props: Props) {
  if (props.mode === "size") {
    return (
      <div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          Size
        </span>
        <h2 className="mt-4 font-serif text-2xl leading-snug text-navy sm:text-3xl">{props.prompt}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {props.options.map((opt, i) => {
            const selected = props.value === opt;
            const letter = LETTERS[i] ?? String(i + 1);
            return (
              <button
                key={opt}
                type="button"
                aria-label={`${letter}. ${opt} employees`}
                onClick={() => props.onSelect(opt)}
                className={cn(
                  "flex min-h-[4.5rem] items-start gap-3 rounded-xl border bg-white p-4 text-left text-sm text-navy transition",
                  selected ? "border-brand ring-2 ring-brand/20" : "border-slate-200 hover:border-brand/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    selected ? "bg-brand text-white" : "bg-slate-100 text-navy",
                  )}
                >
                  {letter}
                </span>
                <span>{opt} employees</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (props.mode === "text") {
    return (
      <div>
        <p className="font-serif text-2xl text-navy sm:text-3xl">{props.prompt}</p>
        <p className="mt-2 text-sm text-slate-600">Optional — we will echo this in your result.</p>
        <textarea
          rows={4}
          maxLength={HEADACHE_MAX}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="e.g. Payroll queries every month from the sales team"
        />
        <p className="mt-2 text-right text-xs text-slate-500">
          {props.value.trim().length}/{HEADACHE_MAX}
        </p>
        <button
          type="button"
          onClick={props.onContinue}
          className="mt-6 rounded-full bg-[#1677E8] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1266c7]"
        >
          See my results
        </button>
      </div>
    );
  }

  const { question, value, onSelect } = props;
  const categoryLabel = question.category.split("&")[0].trim();

  return (
    <div>
      <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
        {categoryLabel}
      </span>
      <h2 className="mt-4 font-serif text-2xl leading-snug text-navy sm:text-3xl">{question.prompt}</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt, i) => {
          const selected = value === opt.label;
          const letter = LETTERS[i];
          return (
            <button
              key={opt.label}
              type="button"
              aria-label={`${letter}. ${opt.label}`}
              onClick={() => onSelect(opt.label)}
              className={cn(
                "flex min-h-[5rem] items-start gap-3 rounded-xl border bg-white p-4 text-left text-sm leading-snug text-navy transition",
                selected ? "border-brand ring-2 ring-brand/20" : "border-slate-200 hover:border-brand/40",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  selected ? "bg-brand text-white" : "bg-slate-100 text-navy",
                )}
              >
                {letter}
              </span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex gap-2 rounded-xl border border-brand/15 bg-brand/5 p-4 text-sm text-slate-700">
        <span className="font-semibold text-brand">Why we ask:</span>
        <span>{question.gapInsight}</span>
      </div>
    </div>
  );
}

export function selectMcqByLetter(question: Assessment0Mcq, letter: string): string | null {
  const idx = LETTERS.indexOf(letter.toUpperCase() as (typeof LETTERS)[number]);
  if (idx < 0 || idx >= question.options.length) return null;
  return question.options[idx].label;
}
