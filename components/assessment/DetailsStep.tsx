import { companySizesForm, industries } from "@/lib/data";
import {
  HRMS_TODAY_OPTIONS,
  type AssessmentDetails,
} from "@/lib/assessment-data";
import { ProgressBar } from "./ProgressBar";

type Props = {
  values: AssessmentDetails;
  errors: Partial<Record<keyof AssessmentDetails, string>>;
  onChange: (key: keyof AssessmentDetails, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  totalSteps: number;
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-navy shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

export function DetailsStep({
  values,
  errors,
  onChange,
  onBack,
  onNext,
  totalSteps,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/50 bg-white/50 p-6 shadow-xl shadow-navy/5 backdrop-blur-xl sm:p-10">
      <ProgressBar current={1} total={totalSteps} />
      <h2 className="font-serif text-3xl text-navy">Company details</h2>
      <p className="mt-2 text-sm text-slate-600">
        We use this only to tailor indicative estimates. Work email and company are required.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" id="asmt-name" error={errors.name}>
          <input
            id="asmt-name"
            className={fieldClass}
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Work email" id="asmt-email" error={errors.email} required>
          <input
            id="asmt-email"
            type="email"
            className={fieldClass}
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label="Company" id="asmt-company" error={errors.company} required>
          <input
            id="asmt-company"
            className={fieldClass}
            value={values.company}
            onChange={(e) => onChange("company", e.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Company size" id="asmt-size" error={errors.companySize}>
          <select
            id="asmt-size"
            className={fieldClass}
            value={values.companySize}
            onChange={(e) => onChange("companySize", e.target.value)}
          >
            <option value="">Select size</option>
            {companySizesForm.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
        </Field>
        <Field label="Industry" id="asmt-industry" error={errors.industry}>
          <select
            id="asmt-industry"
            className={fieldClass}
            value={values.industry}
            onChange={(e) => onChange("industry", e.target.value)}
          >
            <option value="">Select industry</option>
            {industries.map((i) => (
              <option key={i.title} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="HR headcount" id="asmt-hr" error={errors.hrHeadcount}>
          <input
            id="asmt-hr"
            type="number"
            min={0}
            className={fieldClass}
            value={values.hrHeadcount}
            onChange={(e) => onChange("hrHeadcount", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="HRMS today" id="asmt-hrms" error={errors.hrmsToday}>
            <select
              id="asmt-hrms"
              className={fieldClass}
              value={values.hrmsToday}
              onChange={(e) => onChange("hrmsToday", e.target.value)}
            >
              <option value="">Select</option>
              {HRMS_TODAY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border-2 border-accent bg-white/90 px-6 py-2.5 text-sm font-semibold text-navy"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-[#1677E8] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </div>
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