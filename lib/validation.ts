import { z } from "zod";
import { HRMS_TODAY_OPTIONS } from "./assessment-data";
import { ASSESSMENT0_MCQS, ASSESSMENT0_TEXT, HEADACHE_MAX } from "./assessment0-data";
import { companySizesForm, contactServices, industries } from "./data";

export const CONSENT_LABEL = "I agree to be contacted about this enquiry.";

const sizeEnum = z.enum(companySizesForm);
const serviceEnum = z.enum(contactServices);
const industryEnum = z.enum(industries.map((i) => i.title) as [string, ...string[]]);
const hrmsEnum = z.enum(HRMS_TODAY_OPTIONS);

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().min(1, "Phone number is required.").max(40),
  company: z.string().trim().min(1, "Company name is required.").max(160),
  companySize: z.string().min(1, "Select company size.").pipe(sizeEnum),
  country: z.string().trim().min(1, "Country is required.").max(80),
  service: z.string().min(1, "Select a service.").pipe(serviceEnum),
  message: z.string().trim().min(1, "Please share your requirements.").max(4000),
  consent: z.boolean().refine((v) => v === true, "Consent is required."),
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const assessmentDetailsSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Enter a valid work email.").max(254),
  company: z.string().trim().min(1, "Company is required.").max(160),
  companySize: z.string().min(1, "Select company size.").pipe(sizeEnum),
  industry: z.string().min(1, "Select industry.").pipe(industryEnum),
  hrHeadcount: z
    .string()
    .trim()
    .regex(/^\d+$/, "Enter a whole number."),
  hrmsToday: z.string().min(1, "Select how you run HR today.").pipe(hrmsEnum),
});

export const assessmentPayloadSchema = z.object({
  details: assessmentDetailsSchema,
  answers: z.record(z.string(), z.string()),
  consent: z.boolean().refine((v) => v === true, "Consent is required."),
  website: z.string().max(200).optional().default(""),
  submittedAt: z.string().optional(),
});

export type AssessmentPayloadInput = z.infer<typeof assessmentPayloadSchema>;

export const assessment0DetailsSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid work email.").max(254),
  phone: z.string().trim().min(1, "Enter your WhatsApp number.").max(40),
  companySize: z.string().min(1, "Select company size.").pipe(sizeEnum),
  hrHeadcount: z
    .string()
    .trim()
    .regex(/^\d*$/, "Enter a whole number.")
    .optional()
    .default(""),
  hrmsToday: z.string().optional().default(""),
});

export const assessment0PayloadSchema = z
  .object({
    details: assessment0DetailsSchema,
    answers: z.record(z.string(), z.string()),
    consent: z.boolean().optional().default(false),
    website: z.string().max(200).optional().default(""),
    submittedAt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    for (const q of ASSESSMENT0_MCQS) {
      const val = data.answers[q.id];
      if (!q.options.some((o) => o.label === val)) {
        ctx.addIssue({
          code: "custom",
          path: ["answers", q.id],
          message: "Please choose an option.",
        });
      }
    }
    const headache = (data.answers[ASSESSMENT0_TEXT.id] ?? "").trim();
    if (headache.length > HEADACHE_MAX) {
      ctx.addIssue({
        code: "custom",
        path: ["answers", ASSESSMENT0_TEXT.id],
        message: `Keep this under ${HEADACHE_MAX} characters.`,
      });
    }
    if (!data.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "Consent is required.",
      });
    }
  });

export type Assessment0PayloadInput = z.infer<typeof assessment0PayloadSchema>;

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
