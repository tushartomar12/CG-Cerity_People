"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { BAND_COLORS, type MaturityBand } from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-scoring";

function shortLabel(name: string) {
  const map: Record<string, string> = {
    "Recruitment & Hiring": "Hiring",
    Onboarding: "Onboarding",
    "Attendance & Leave": "Attendance",
    "Payroll, Compliance & HR Data": "Payroll & data",
  };
  return map[name] ?? name;
}

export function AssessmentCharts({ result }: { result: AssessmentResult }) {
  const barData = result.categories.map((c) => ({
    name: shortLabel(c.category),
    full: c.category,
    score: c.percent,
    band: c.band,
  }));
  const radarData = result.categories.map((c) => ({
    subject: shortLabel(c.category),
    score: c.percent,
  }));
  const gaugeColor = BAND_COLORS[result.overallBand];
  const angle = (result.overall / 100) * 180;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/70 bg-white/60 p-4 min-h-[260px]">
        <p className="text-sm font-semibold text-navy">Overall maturity</p>
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
      <div className="rounded-2xl border border-white/70 bg-white/60 p-4 min-h-[260px]">
        <p className="text-sm font-semibold text-navy">Category radar</p>
        <div className="h-[220px] min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="#1677E8" fill="#1677E8" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl border border-white/70 bg-white/60 p-4 min-h-[280px] lg:col-span-2">
        <p className="text-sm font-semibold text-navy">Scores by category</p>
        <div className="h-[260px] min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ bottom: 24, left: 8, right: 8 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${value}`, "Score"]}
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as { full?: string } | undefined;
                  return row?.full ?? "";
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {barData.map((row) => (
                  <Cell key={row.full} fill={BAND_COLORS[row.band as MaturityBand]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}