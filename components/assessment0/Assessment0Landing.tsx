"use client";

import { Assessment0SampleCard } from "./Assessment0SampleCard";

type Props = {
  onStart: () => void;
};

export function Assessment0Landing({ onStart }: Props) {
  return (
    <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          Free HR Risk Check · under a minute
        </p>
        <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-navy text-balance sm:text-5xl">
          Find your HR risks before they find you.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
          Nine quick taps across payroll, compliance, hiring, onboarding, performance and employee
          relations. See your risk level for each area instantly.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1677E8] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[rgba(22,119,232,0.2)] transition hover:bg-[#1266c7]"
        >
          Start the check
          <span aria-hidden>→</span>
        </button>
        <p className="mt-3 text-sm text-slate-500">
          No sign-up to see your results. Built for teams of 20–250.
        </p>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8">
          <div>
            <dt className="font-serif text-2xl text-navy">9</dt>
            <dd className="text-xs text-slate-600">one-tap questions</dd>
          </div>
          <div>
            <dt className="font-serif text-2xl text-navy">6</dt>
            <dd className="text-xs text-slate-600">risk areas scored</dd>
          </div>
          <div>
            <dt className="font-serif text-2xl text-navy">20+</dt>
            <dd className="text-xs text-slate-600">yrs Cerity Global experience</dd>
          </div>
        </dl>
      </div>
      <Assessment0SampleCard />
    </div>
  );
}
