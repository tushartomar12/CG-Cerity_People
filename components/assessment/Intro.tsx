type Props = {
  onStart: () => void;
};

export function Intro({ onStart }: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/50 bg-white/50 p-8 shadow-xl shadow-navy/5 backdrop-blur-xl sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Confidential briefing</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-navy sm:text-5xl">
        How mature is your HR operation?
      </h1>
      <p className="mt-5 text-base leading-relaxed text-slate-600">
        Answer 12 short questions across hiring, payroll, and people data. You will get an
        indicative score, priority gaps, and a branded PDF you can share with your leadership team.
      </p>
      <p className="mt-4 text-sm text-slate-500">About 3–4 minutes. No public listing. Results stay with you.</p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex rounded-full bg-[#1677E8] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-[rgba(22,119,232,0.18)] transition hover:bg-[#1266c7]"
      >
        Start assessment
      </button>
    </div>
  );
}