import type { AssessmentQuestion } from "@/lib/assessment-data";
import { ProgressBar } from "./ProgressBar";

type Props = {
  category: string;
  questions: AssessmentQuestion[];
  answers: Record<string, string>;
  errors: Record<string, string>;
  step: number;
  totalSteps: number;
  onAnswer: (id: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
};

export function QuestionStep({
  category,
  questions,
  answers,
  errors,
  step,
  totalSteps,
  onAnswer,
  onBack,
  onNext,
  nextLabel = "Continue",
}: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/50 bg-white/50 p-6 shadow-xl shadow-navy/5 backdrop-blur-xl sm:p-10">
      <ProgressBar current={step} total={totalSteps} />
      <h2 className="font-serif text-3xl text-navy">{category}</h2>
      <div className="mt-6 space-y-8">
        {questions.map((q, idx) => (
          <div key={q.id}>
            <p className="text-sm font-medium text-navy">
              {idx + 1}. {q.prompt}
              {q.type === "mcq" ? <span className="text-red-500"> *</span> : null}
            </p>
            {q.type === "mcq" ? (
              <fieldset className="mt-3 space-y-2" aria-required>
                <legend className="sr-only">{q.prompt}</legend>
                {q.options.map((opt) => {
                  const id = `${q.id}-${opt.score}`;
                  return (
                    <label
                      key={opt.label}
                      htmlFor={id}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/70 bg-white/70 px-3 py-2.5 text-sm text-navy hover:border-primary/40"
                    >
                      <input
                        id={id}
                        type="radio"
                        name={q.id}
                        value={opt.label}
                        checked={answers[q.id] === opt.label}
                        onChange={() => onAnswer(q.id, opt.label)}
                        className="mt-0.5"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </fieldset>
            ) : (
              <textarea
                id={q.id}
                rows={3}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                value={answers[q.id] ?? ""}
                onChange={(e) => onAnswer(q.id, e.target.value)}
                placeholder="Optional — quoted in your report"
              />
            )}
            {errors[q.id] ? (
              <p className="mt-1 text-xs text-red-600" role="alert">
                {errors[q.id]}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border-2 border-accent bg-white/90 px-6 py-2.5 text-sm font-semibold text-navy"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-[#1677E8] px-6 py-2.5 text-sm font-semibold text-white"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}