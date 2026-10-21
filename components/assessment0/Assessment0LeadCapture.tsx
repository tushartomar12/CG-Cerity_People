"use client";

import Link from "next/link";
import type { Assessment0Details } from "@/lib/assessment0-data";
import { CONSENT_LABEL } from "@/lib/validation";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

const CONSULT_SLOTS = [
  { label: "Tue 15:00", href: "/contact" },
  { label: "Wed 16:30", href: "/contact" },
  { label: "Thu 11:00", href: "/contact" },
];

type Props = {
  details: Assessment0Details;
  errors: Record<string, string>;
  consent: boolean;
  submitting: boolean;
  submitted: boolean;
  userEmailSent: boolean;
  onChange: (patch: Partial<Assessment0Details>) => void;
  onConsentChange: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function Assessment0LeadCapture({
  details,
  errors,
  consent,
  submitting,
  submitted,
  userEmailSent,
  onChange,
  onConsentChange,
  onSubmit,
}: Props) {
  return (
    <div className="mt-10 grid gap-8 border-t border-slate-200/80 pt-10 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Step 1 — Free</p>
        <h3 className="mt-1 font-serif text-xl text-navy">Get your full report</h3>
        <p className="mt-1 text-sm text-slate-600">
          Share your details and we will email a copy of your results. No spam.
        </p>
        {submitted && userEmailSent ? (
          <p className="mt-4 text-sm text-emerald-700" role="status">
            Thanks — we have emailed your results to {details.email}.
          </p>
        ) : null}
        {submitted && !userEmailSent ? (
          <p className="mt-4 text-sm text-slate-600" role="status">
            Thanks — your results are saved. We could not send email right now; our team may still follow up.
          </p>
        ) : null}
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="a0-name" className="text-sm font-medium text-navy">Your name</label>
            <input
              id="a0-name"
              className={fieldClass}
              value={details.name}
              onChange={(e) => onChange({ name: e.target.value })}
              autoComplete="name"
              disabled={submitting || submitted}
            />
            {errors["details.name"] || errors.name ? (
              <p className="mt-1 text-xs text-red-600">{errors["details.name"] || errors.name}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="a0-lead-email" className="text-sm font-medium text-navy">Work email</label>
            <input
              id="a0-lead-email"
              type="email"
              className={fieldClass}
              value={details.email}
              onChange={(e) => onChange({ email: e.target.value })}
              autoComplete="email"
              disabled={submitting || submitted}
            />
            {errors["details.email"] || errors.email ? (
              <p className="mt-1 text-xs text-red-600">{errors["details.email"] || errors.email}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="a0-phone" className="text-sm font-medium text-navy">WhatsApp number</label>
            <input
              id="a0-phone"
              type="tel"
              className={fieldClass}
              value={details.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              autoComplete="tel"
              disabled={submitting || submitted}
            />
            {errors["details.phone"] || errors.phone ? (
              <p className="mt-1 text-xs text-red-600">{errors["details.phone"] || errors.phone}</p>
            ) : null}
          </div>
          <label htmlFor="a0-consent" className="flex items-start gap-2 text-sm text-navy">
            <input
              id="a0-consent"
              type="checkbox"
              className="mt-0.5"
              checked={consent}
              onChange={(e) => onConsentChange(e.target.checked)}
              disabled={submitting || submitted}
            />
            <span>{CONSENT_LABEL}</span>
          </label>
          {errors.consent ? <p className="text-xs text-red-600">{errors.consent}</p> : null}
          {errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}
          <button
            type="submit"
            disabled={submitting || submitted}
            className="w-full rounded-full bg-[#1677E8] py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Sending…" : submitted ? "Submitted" : "Send my report"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Step 2 — 20 minutes</p>
        <h3 className="mt-1 font-serif text-xl text-navy">Talk to an expert</h3>
        <p className="mt-1 text-sm text-slate-600">Pick a time that works for you.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONSULT_SLOTS.map((slot) => (
            <Link
              key={slot.label}
              href={slot.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy hover:border-brand"
            >
              {slot.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold text-navy">What to expect:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          <li>HR compliance gaps and how to close them</li>
          <li>Scalable systems for your team size</li>
          <li>Practical next steps — no obligation</li>
        </ul>
        <Link href="/contact" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
          Or book via contact form →
        </Link>
      </div>
    </div>
  );
}
