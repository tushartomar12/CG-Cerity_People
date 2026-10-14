import { cn } from "@/lib/utils";
import type { Assessment0Question } from "@/lib/assessment0-data";
import { HEADACHE_MAX } from "@/lib/assessment0-data";

type Props = {
  index: number;
  total: number;
  question: Assessment0Question;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function QuestionCard({ index, total, question, value, error, onChange }: Props) {
  const id = `a0-${question.id}`;
  return (
    <div id={id} className="scroll-mt-28">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {index} of {total} · {question.category}
      </p>
      <p className="mt-1 text-sm font-medium text-navy">
        {question.prompt}
        {question.type === "mcq" ? <span className="text-red-500"> *</span> : null}
      </p>
      {question.type === "mcq" ? (
        <fieldset className="mt-3 space-y-2">
          <legend className="sr-only">{question.prompt}</legend>
          {question.options.map((opt) => {
            const optId = `${question.id}-${opt.score}`;
            const selected = value === opt.label;
            return (
              <label
                key={opt.label}
                htmlFor={optId}
                className={cn(
                  "flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border bg-white/70 px-3 py-3 text-sm text-navy",
                  selected ? "border-brand ring-2 ring-brand/20" : "border-white/70 hover:border-primary/40",
                )}
              >
                <input
                  id={optId}
                  type="radio"
                  name={question.id}
                  value={opt.label}
                  checked={selected}
                  onChange={() => onChange(opt.label)}
                  className="mt-0.5"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </fieldset>
      ) : (
        <div className="mt-3">
          <textarea
            id={question.id}
            rows={3}
            maxLength={HEADACHE_MAX}
            className="w-full rounded-lg border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Optional — we will echo this in your result"
          />
          <p className="mt-1 text-right text-xs text-slate-500">
            {value.trim().length}/{HEADACHE_MAX}
          </p>
        </div>
      )}
      {error ? (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
