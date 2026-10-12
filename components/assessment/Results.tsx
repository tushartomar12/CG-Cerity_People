"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ButtonLink } from "@/components/ButtonLink";
import { BAND_COLORS, moduleCopy, type AssessmentDetails } from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { siteConfig } from "@/lib/site-config";
import { AssessmentCharts } from "./AssessmentCharts";
import { ReportDocument } from "./ReportDocument";

type Props = {
  details: AssessmentDetails;
  result: AssessmentResult;
  onRetake: () => void;
};

export function Results({ details, result, onRetake }: Props) {
  const [downloading, setDownloading] = useState(false);
  const bookHref = `/contact?email=${encodeURIComponent(details.email)}&company=${encodeURIComponent(details.company)}`;

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const logoSrc = `${window.location.origin}/cerity-logo.png`;
      const blob = await pdf(
        <ReportDocument details={details} result={result} logoSrc={logoSrc} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cerity-people-hr-assessment.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-2xl border border-amber-200/50 bg-white/50 p-6 shadow-xl shadow-navy/5 backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Indicative results</p>
        <h2 className="mt-2 font-serif text-4xl text-navy">Your HR maturity score</h2>
        <p className="mt-4 font-serif text-5xl text-navy">
          {result.overall}
          <span className="ml-3 text-2xl" style={{ color: BAND_COLORS[result.overallBand] }}>
            {result.overallBand}
          </span>
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Indicative hours/month across priority gaps:{" "}
          <strong>{result.indicativeHoursPerMonth}</strong>. Indicative compliance risk:{" "}
          <strong>{result.complianceLevel}</strong>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="rounded-full bg-[#1677E8] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </button>
          <ButtonLink href={bookHref} className="min-w-[180px]">
            Book an appointment
          </ButtonLink>
          <button
            type="button"
            onClick={onRetake}
            className="rounded-full border-2 border-accent bg-white/90 px-6 py-3 text-sm font-semibold text-navy"
          >
            Retake
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {siteConfig.contact.email} · {siteConfig.contact.phone}
        </p>
      </div>

      <AssessmentCharts result={result} />

      <div className="rounded-2xl border border-amber-200/50 bg-white/50 p-6 backdrop-blur-xl sm:p-8">
        <h3 className="font-serif text-2xl text-navy">Priority gaps</h3>
        <ul className="mt-4 space-y-4">
          {result.gaps.map((g) => (
            <li key={g.category} className="rounded-xl border border-white/70 bg-white/70 p-4">
              <p className="font-semibold text-navy">
                {g.category} · {g.percent}% · {g.band}
              </p>
              <p className="mt-1 text-sm text-slate-600">{g.insights[0]}</p>
              <p className="mt-2 text-xs text-slate-500">
                Indicative hours/month: {g.indicativeHoursPerMonth}. Addressed with:{" "}
                {g.solvedBy.map((t) => moduleCopy(t).title).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}