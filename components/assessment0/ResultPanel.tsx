"use client";

import Link from "next/link";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BAND_COLORS, moduleCopy } from "@/lib/assessment-data";
import type { Assessment0Details } from "@/lib/assessment0-data";
import type { Assessment0Result } from "@/lib/assessment0-scoring";
import type { MaturityBand } from "@/lib/assessment-data";

type Props = {
  details: Assessment0Details;
  result: Assessment0Result;
  userEmailSent: boolean;
  onRetake: () => void;
};

function shortLabel(name: string) {
  const map: Record<string, string> = {
    "Recruitment & Hiring": "Hiring",
    Onboarding: "Onboarding",
    "Attendance & Leave": "Attendance",
    "Payroll & Compliance": "Payroll",
    "Performance Management": "Performance",
    "Engagement & Retention": "Engagement",
    "HR Data & Reporting": "HR data",
  };
  return map[name] ?? name;
}

export function ResultPanel({ details, result, userEmailSent, onRetake }: Props) {
  const gaugeColor = BAND_COLORS[result.overallBand];
  const angle = (result.overall / 100) * 180;
  const barData = result.categories.map((c) => ({
    name: shortLabel(c.category),
    full: c.category,
    score: c.percent,
    band: c.band,
  }));
  const headache = result.quotedText[0]?.answer;

  return (
    <div
      id="a0-results"
      className="mx-auto max-w-3xl rounded-2xl border border-amber-200/50 bg-white/50 p-6 shadow-xl shadow-navy/5 backdrop-blur-xl sm:p-10"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Your indicative result</p>
      <h2 className="mt-1 font-serif text-3xl text-navy">Quick HR check</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/70 bg-white/60 p-4 min-h-[220px]">
          <p className="text-sm font-semibold text-navy">Overall score</p>
          <div className="relative mx-auto mt-2 h-[180px] w-[280px]">
            <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
              <path
                d="M20 140 A120 120 0 0 1 260 140"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M20 140 A120 120 0 0 1 260 140"
                fill="none"
                stroke={gaugeColor}
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={`${(angle / 180) * 377} 377`}
              />
            </svg>
            <div className="absolute inset-x-0 bottom-2 text-center">
              <p className="font-serif text-4xl text-navy">{result.overall}</p>
              <p className="text-sm font-medium" style={{ color: gaugeColor }}>
                {result.overallBand}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/60 p-4 min-h-[220px] lg:col-span-1">
          <p className="text-sm font-semibold text-navy">Category scores</p>
          <div className="h-[220px] min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ bottom: 32, left: 0, right: 8 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={50} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => [`${value}`, "Score"]}
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload as { full?: string } | undefined;
                    return row?.full ?? "";
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 10 }}>
                  {barData.map((row) => (
                    <Cell key={row.full} fill={BAND_COLORS[row.band as MaturityBand]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h3 className="mt-8 font-serif text-2xl text-navy">Top gaps</h3>
      <ul className="mt-3 space-y-3">
        {result.gaps.map((g) => {
          const mod = moduleCopy(g.solvedBy[0] ?? "");
          return (
            <li key={g.category} className="rounded-xl border border-white/70 bg-white/70 p-4">
              <p className="text-sm font-semibold text-navy">
                {g.category} · {g.percent} · {g.band}
              </p>
              <p className="mt-1 text-sm text-slate-600">{g.insights[0]}</p>
              {mod.title ? (
                <p className="mt-2 text-sm text-navy">
                  Addressed by <strong>{mod.title}</strong>
                  {mod.description ? ` — ${mod.description}` : ""}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      {headache ? (
        <p className="mt-6 rounded-xl border border-white/70 bg-white/70 p-4 text-sm text-navy">
          Your biggest headache today: <em>{headache}</em>
        </p>
      ) : null}

      <p className="mt-4 text-xs text-slate-500">Indicative, based on a quick self-assessment.</p>
      {userEmailSent ? (
        <p className="mt-2 text-sm text-slate-600">We’ve also emailed your result to {details.email}.</p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/assessment"
          className="rounded-full bg-[#1677E8] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Take the full assessment
        </Link>
        <Link
          href="/contact"
          className="rounded-full border-2 border-accent bg-white/90 px-6 py-2.5 text-sm font-semibold text-navy"
        >
          Book a consultation
        </Link>
        <button
          type="button"
          onClick={onRetake}
          className="rounded-full px-6 py-2.5 text-sm font-semibold text-navy underline-offset-4 hover:underline"
        >
          Retake
        </button>
      </div>
    </div>
  );
}
