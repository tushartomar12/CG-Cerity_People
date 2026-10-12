type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm text-navy">
        <span className="font-medium">
          Step {current} of {total}
        </span>
        <span className="text-slate-500">{pct}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-white/60 ring-1 ring-white/70"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Step ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full bg-[#1677E8] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}