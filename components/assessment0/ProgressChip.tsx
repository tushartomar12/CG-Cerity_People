type Props = {
  answered: number;
  total: number;
};

export function ProgressChip({ answered, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((answered / total) * 100);
  return (
    <div
      className="sticky top-20 z-10 rounded-t-2xl border-b border-amber-200/50 bg-white/90 px-6 py-3 backdrop-blur-md sm:px-10"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <p className="shrink-0 text-sm font-medium text-navy">
          {answered} of {total} answered
        </p>
        <div className="h-1.5 min-w-0 flex-1 rounded-full bg-slate-200" aria-hidden>
          <div
            className="h-full rounded-full bg-[#1677E8] transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="sr-only">{pct} percent complete</span>
      </div>
    </div>
  );
}
