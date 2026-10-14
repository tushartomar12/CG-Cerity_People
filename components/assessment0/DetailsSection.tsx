import { companySizesForm } from "@/lib/data";
import { HRMS_TODAY_OPTIONS } from "@/lib/assessment-data";
import type { Assessment0Details } from "@/lib/assessment0-data";
import { CONSENT_LABEL } from "@/lib/validation";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-navy shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

type Props = {
  values: Assessment0Details;
  errors: Partial<Record<keyof Assessment0Details, string>>;
  onChange: (key: keyof Assessment0Details, value: string) => void;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
};

export function DetailsSection({ values, errors, onChange, consent, onConsentChange }: Props) {
  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl text-navy">About you</h2>
      <p className="mt-1 text-sm text-slate-600">A few details so we can email your result.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Work email" id="a0-email" error={errors.email} required>
            <input
              id="a0-email"
              type="email"
              className={fieldClass}
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              autoComplete="email"
            />
          </Field>
          <p className="mt-1.5 text-xs text-slate-500">Just the PDF. No pitch, no pressure.</p>
        </div>
        <Field label="Company size" id="a0-size" error={errors.companySize} required>
          <select
            id="a0-size"
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
        <Field label="Number of people in HR" id="a0-hr" error={errors.hrHeadcount} required>
          <input
            id="a0-hr"
            type="number"
            min={0}
            className={fieldClass}
            value={values.hrHeadcount}
            onChange={(e) => onChange("hrHeadcount", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Current HR system" id="a0-hrms" error={errors.hrmsToday} required>
            <select
              id="a0-hrms"
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
      <label className="mt-6 flex items-start gap-2 text-sm text-navy">
        <input
          id="a0-consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
        />
        <span>{CONSENT_LABEL}</span>
      </label>
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
