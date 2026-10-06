"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { companySizesForm, contactServices } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  country: string;
  service: string;
  message: string;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  companySize: "",
  country: "",
  service: "",
  message: "",
};

function validate(values: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) errors.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  if (!values.company.trim()) errors.company = "Company name is required.";
  if (!values.companySize) errors.companySize = "Select company size.";
  if (!values.country.trim()) errors.country = "Country is required.";
  if (!values.service) errors.service = "Select a service.";
  if (!values.message.trim()) errors.message = "Please share your requirements.";
  return errors;
}

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof FormState, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    // Hook for API / CRM integration
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-navy">Request received</h3>
        <p className="mt-2 text-slate-600">
          Thank you, {values.fullName.split(" ")[0]}. Our team will contact you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" id="fullName" error={errors.fullName} required>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            className={fieldClass}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </Field>
        <Field label="Work Email" id="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
        <Field label="Phone Number" id="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label="Company Name" id="company" error={errors.company} required>
          <input
            id="company"
            name="organization"
            autoComplete="organization"
            className={fieldClass}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </Field>
        <Field label="Company Size" id="companySize" error={errors.companySize} required>
          <select
            id="companySize"
            name="companySize"
            className={fieldClass}
            value={values.companySize}
            onChange={(e) => update("companySize", e.target.value)}
          >
            <option value="">Select size</option>
            {companySizesForm.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
        </Field>
        <Field label="Country" id="country" error={errors.country} required>
          <input
            id="country"
            name="country"
            autoComplete="country-name"
            className={fieldClass}
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Service Required" id="service" error={errors.service} required>
            <select
              id="service"
              name="service"
              className={fieldClass}
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
            >
              <option value="">Select a service</option>
              {contactServices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Message" id="message" error={errors.message} required>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={cn(fieldClass, "resize-y min-h-[120px]")}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </Field>
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
      >
        {submitting ? "Submitting…" : "Request Consultation"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
