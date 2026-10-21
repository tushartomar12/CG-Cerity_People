import {
  RISK_LEVEL_COLORS,
  SAMPLE_DISPLAY_REPORT,
  type DisplayRiskArea,
  type RiskLevel,
} from "@/lib/assessment0-display";

function RiskTag({ level }: { level: RiskLevel }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[11px] font-semibold text-white"
      style={{ backgroundColor: RISK_LEVEL_COLORS[level] }}
    >
      {level}
    </span>
  );
}

function MiniArea({ area }: { area: DisplayRiskArea }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2">
      <span className="text-xs font-medium text-navy">{area.label}</span>
      <RiskTag level={area.risk} />
    </div>
  );
}

export function Assessment0SampleCard() {
  const report = SAMPLE_DISPLAY_REPORT;
  const ring = 2 * Math.PI * 42;
  const dash = (report.overall / 100) * ring;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-navy/10 sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sample result</p>
      <p className="mt-1 text-sm font-semibold text-navy">Acme Tech · 85 people</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#D97706"
              strokeWidth="10"
              strokeDasharray={`${dash} ${ring}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-navy">
            {report.overall}
          </span>
        </div>
        <div>
          <p className="text-sm font-bold text-[#D97706]">Moderate risk</p>
          <p className="text-xs text-slate-600">{report.attentionCount} areas need attention now</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {report.areas.map((a) => (
          <MiniArea key={a.id} area={a} />
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-[#082038] px-3 py-2 text-center text-[11px] text-white/90">
        Your answers are only used to prepare your report. We never share them.
      </p>
    </div>
  );
}
