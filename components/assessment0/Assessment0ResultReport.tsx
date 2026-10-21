"use client";

import Link from "next/link";
import {
  RISK_LEVEL_COLORS,
  buildAssessment0DisplayReport,
  type DisplayRiskArea,
  type RiskLevel,
} from "@/lib/assessment0-display";
import type { Assessment0Result } from "@/lib/assessment0-scoring";

type Props = {
  result: Assessment0Result;
  headache?: string;
  onRetake: () => void;
};

function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className="rounded-md px-2.5 py-0.5 text-xs font-bold text-white"
      style={{ backgroundColor: RISK_LEVEL_COLORS[level] }}
    >
      {level}
    </span>
  );
}

function AreaCard({ area }: { area: DisplayRiskArea }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold text-navy">{area.label}</h4>
        <RiskBadge level={area.risk} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.body}</p>
      <p className="mt-3 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Based on:</span> {area.basedOn}
      </p>
    </div>
  );
}

export function Assessment0ResultReport({ result, headache, onRetake }: Props) {
  const display = buildAssessment0DisplayReport(result);
  const ring = 2 * Math.PI * 42;
  const dash = (display.overall / 100) * ring;
  const headlineColor =
    display.attentionCount >= 2 ? "#F59E0B" : display.overall >= 80 ? "#059669" : "#F59E0B";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Your HR Risk Index</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy"
          >
            Retake
          </button>
          <Link
            href="/assessment"
            className="rounded-full bg-[#1677E8] px-4 py-2 text-sm font-semibold text-white"
          >
            Full audit report
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#082038] p-6 text-white sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="relative mx-auto h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={headlineColor}
                strokeWidth="10"
                strokeDasharray={`${dash} ${ring}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-3xl">{Math.round(display.overall)}</span>
              <span className="text-[10px] uppercase text-white/70">out of 100</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">Your HR risk index</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl" style={{ color: headlineColor }}>
              {display.overallHeadline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{display.summaryParagraph}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-2xl text-navy">Risk by area</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {display.areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </div>

      {headache ? (
        <p className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-navy">
          Your biggest headache: <em>{headache}</em>
        </p>
      ) : null}

      <p className="text-xs text-slate-500">Indicative, based on a quick self-assessment.</p>
    </div>
  );
}
