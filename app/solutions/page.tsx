import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { IndustryCard } from "@/components/IndustryCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { companySizes, industries, solutionsByNeed } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "HR Solutions by Industry & Size",
  description:
    "HR automation, payroll, recruitment, compliance, and workforce management solutions for startups, SMBs, and enterprises across industries.",
  path: "/solutions",
  keywords: [
    "HR Automation",
    "Workforce Management",
    "HR Digital Transformation",
    "Employee Management Software",
  ],
});

export default function SolutionsPage() {

   const comparison = [
    {
      feature: "Job description creation",
      basic:false,
      executive:true,
      professional:true,
    },
    {
      feature: "Interview scheduling & coordination",
      basic: false,
      executive: true,
      professional: true,
    },
    {
      feature: "Candidate assessment & testing",
      basic: false,
      executive: true,
      professional: true,
    },
    {
      feature: "Offer Letter generation",
      basic: false,
      executive: true,
      professional: true, 
    },
    {
      feature: "Offer negotiation & release",
      basic: false,
      executive: true,
      professional: true,
    },
    {
      feature: "Onboarding & Joining formalities",
      basic: true,
       executive: true,
      professional: true,
    },  
    {
      feature: "Group insurance enrolment",
      basic: true,
      executive: true,
      professional: true,
    },
    {
      feature: "Attendance & Time Management",
      basic: true,
      executive:true,
      professional: true,
    },
     {
      feature: "Leave & Holiday Management",
      basic: true,
      executive:true,
      professional: true,
    },
    {
      feature: "HR operations, documentation & records",
      basic: true,
      executive: true,
      professional: true,
    },
    {
      feature:"Employee Relations &Disciplinary Matters",
      basic:false,
      executive:false,
      professional:true,
    },

    {
      feature:"Compensation & CTC Management",
      basic:true,
      executive:true, 
      professional:true,
    },

    {
      feature:"Variable Pay & Benefits Management",
      basic:true,
      executive:true,
      professional:true,
    },

    {
      feature:"Employee Separation & Exit Management",
      basic:false,
      executive:true,
      professional:true,
    },

    {
      feature:"Full & Final Settlement & Gratuity",
      basic:true,
      executive:true,
      professional:true,
    },

    {
      feature:"Expense Reimbursement Management",
      basic:false,
      executive:true,
      professioanl:true,
    },

    {
       feature:"Labour Law & Employee Welfare Compliance",
      basic:true,
      executive:true,
      professional:true,
    },

    {
      feature:"Posh Training",
      basic:false,
      executive:false,
      professional:true,
    },

    {
          feature:"Posh committee",
          basic:false,
          executive:false,
          professional:true,

    },

    {
      feature:"Posh implementation",
      basic:false,
      executive:false,
      professional:true,
    },

    {
      feature:"Compliance Governance / Returns",
      basic:false,
      executive:true,
      professional:true,

    },

    {
      feature:"Performance Management",
      basic:false,
      executive:false,
      professional:true,
    },

  ];

   const plans = [
    {
      name: "Basic",
      eyebrow: "FOR GROWING TEAMS",
      description:
        "The essential people operations support your business needs to stay organized.",
      features: [
        "Onboarding",
        "Group insurance enrolment",
        "Attendance & Time Management",
        "Leave & Holiday Management",
        "HR operations, documentation & records",
      ],
      featured: false,
    },
    {
      name: "Executive",
      eyebrow: "MOST POPULAR",
      description:
        "A connected people operations solution built to support your workforce as you grow.",
      features: [
        "Job description creation",
        "Interview scheduling & coordination",
        "Candidate assessment & testing",
        "Offer Letter generation",
        "Offer negotiation & release",
      ],
      featured: true,
    },
    {
      name: "Professional",
      eyebrow: "FOR COMPLEX NEEDS",
      description:
        "Flexible people operations support designed around your workforce and business requirements.",
      features: [
        "Employee Relations & Disciplinary Matters",
        "Posh Training",
        "Posh committee",
        "POSH & Workplace Compliance",
        "Performance Management",
      ],
      featured: false,
    },
  ];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
      <HeroSection
        title="Solutions Designed Around Your Business"
        description="Whether you need to automate payroll, hire faster, or transform HR end-to-end, we align technology and consulting to your context."
        size="compact"
      />

{/* =========================================================
    PRICING
========================================================= */}
<section
  id="pricing"
  className="relative overflow-hidden bg-[#F7F9FC] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-28"
>
  {/* =========================================================
      BACKGROUND
  ========================================================= */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Soft navy glow */}
    <div
      className="absolute -left-48 -top-40 h-[600px] w-[600px] rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(214,225,238,0.58) 0%, rgba(237,243,248,0.40) 45%, rgba(247,249,252,0) 72%)",
      }}
    />

    {/* Soft teal glow */}
    <div
      className="absolute -bottom-48 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(207,235,232,0.48) 0%, rgba(232,244,242,0.28) 48%, rgba(247,249,252,0) 72%)",
      }}
    />

    {/* Fine vertical detail */}
    <div className="absolute left-[6%] top-0 hidden h-full w-px bg-[#E4EAF0] lg:block" />

    <div className="absolute right-[6%] top-0 hidden h-full w-px bg-[#E4EAF0] lg:block" />

    {/* Decorative circles */}
    <div className="absolute left-[9%] top-[24%] hidden h-3 w-3 rounded-full bg-[#79BDB7] lg:block" />

    <div className="absolute right-[10%] bottom-[25%] hidden h-3 w-3 rounded-full bg-[#5D9F9A] lg:block" />
  </div>


  {/* =========================================================
      MAIN CONTENT
  ========================================================= */}
  <div className="relative mx-auto max-w-[1280px]">

    {/* =======================================================
        HEADER
    ======================================================= */}
    <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">

      <div>
        <h2 className="text-5xl font-bold leading-[1.06] tracking-tight text-[#102B46] sm:text-6xl lg:text-6xl">
          Pricing that fits
          <span className="block text-[#0F9F98]">
            your business.
          </span>
        </h2>
      </div>

      <div className="max-w-[410px] lg:pb-3">
        <p className="text-[16px] leading-7 text-[#607286] sm:text-lg sm:leading-8">
          Choose the level of people operations support that makes sense
          for your workforce. Every business is different, so our approach
          can flex around your needs.
        </p>
      </div>
    </div>


    {/* =======================================================
        PRICING AREA
    ======================================================= */}
    <div className="mt-14 md:mt-20">

      {/* Small switch-style heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
        </div>

      </div>


      {/* =====================================================
          PLAN GRID
      ===================================================== */}
      <div className="grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.05fr_0.9fr]">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col overflow-hidden rounded-[28px] ${
              plan.featured
                ? "bg-gradient-to-br from-[#102B46] via-[#123C59] to-[#0E7774] text-white shadow-[0_25px_70px_rgba(16,43,70,0.20)] lg:-translate-y-5"
                : "border border-[#DDE5EC] bg-white text-[#102B46] shadow-[0_8px_30px_rgba(16,43,70,0.05)]"
            }`}
          >

            {/* =================================================
                FEATURED TOP STRIP
            ================================================= */}
            {plan.featured && (
              <div className="flex items-center justify-center bg-[#0B8F89] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Recommended for growing teams
              </div>
            )}


            <div className="flex flex-1 flex-col p-7 sm:p-8 lg:p-9">

              {/* =================================================
                  EYEBROW
              ================================================= */}
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  plan.featured
                    ? "text-[#BDE5E1]"
                    : "text-[#168C87]"
                }`}
              >
                {plan.eyebrow}
              </p>


              {/* =================================================
                  NAME
              ================================================= */}
              <h3
                className={`mt-4 text-3xl font-bold tracking-[-0.04em] ${
                  plan.featured
                    ? "text-white"
                    : "text-[#102B46]"
                }`}
              >
                {plan.name}
              </h3>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}
              <p
                className={`mt-4 min-h-[84px] leading-6 ${
                  plan.featured
                    ? "text-[#D8ECEB]"
                    : "text-[#68798A]"
                }`}
              >
                {plan.description}
              </p>


              {/* =================================================
                  FEATURES
              ================================================= */}
              <div className="mt-7 flex-1">

                <p
                  className={`mb-4 text-[15px] font-bold uppercase tracking-[0.18em] ${
                    plan.featured
                      ? "text-[#BDE5E1]"
                      : "text-[#708496]"
                  }`}
                >
                  Includes
                </p>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3"
                    >

                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[17px] font-bold ${
                          plan.featured
                            ? "bg-[#19A69F] text-white"
                            : "bg-[#E3F2F0] text-[#0F918B]"
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={`leading-5 ${
                          plan.featured
                            ? "text-[#E1F0EF]"
                            : "text-[#5F6F80]"
                        }`}
                      >
                        {feature}
                      </span>

                    </li>
                  ))}
                </ul>
              </div>


              {/* =================================================
                  CTA
              ================================================= */}
              <Link
                href="/contact"
                className={`group mt-9 flex items-center justify-center gap-3 rounded-full px-5 py-3.5 text-sm font-bold transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#0EA49D] text-white hover:bg-[#0B918B]"
                    : "border border-[#B7D8D5] bg-white text-[#0F8F89] hover:bg-[#EFF9F8]"
                }`}
              >
                Talk to an Expert

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* =========================================================
    PLAN COMPARISON
========================================================= */}

<section
  id="plan-comparison"
  className="relative overflow-hidden bg-[#F7F9FC] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-28"
>
  {/* =========================================================
      BACKGROUND
  ========================================================= */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Top-right soft blue glow */}
    <div
      className="absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(203,224,242,0.58) 0%, rgba(230,241,249,0.36) 45%, rgba(247,249,252,0) 72%)",
      }}
    />

    {/* Bottom-left soft teal glow */}
    <div
      className="absolute -bottom-56 -left-48 h-[600px] w-[600px] rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(205,234,231,0.52) 0%, rgba(232,244,242,0.30) 48%, rgba(247,249,252,0) 72%)",
      }}
    />

    {/* Editorial vertical lines */}
    <div className="absolute left-[5%] top-0 hidden h-full w-px bg-[#DCE7EF] lg:block" />

    <div className="absolute right-[5%] top-0 hidden h-full w-px bg-[#DCE7EF] lg:block" />

    {/* Decorative circles */}
    <div className="absolute right-[9%] top-[25%] hidden h-3 w-3 rounded-full bg-[#159C96] lg:block" />

    <div className="absolute left-[8%] bottom-[20%] hidden h-2.5 w-2.5 rounded-full bg-[#9ACBC7] lg:block" />

  </div>


  {/* =========================================================
      MAIN
  ========================================================= */}
  <div className="relative mx-auto max-w-[1320px]">

    {/* =======================================================
        TOP LABEL
    ======================================================= */}
    <div className="mb-10 flex items-center gap-4 lg:mb-14">

      <span className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#159C96]">
        — PLAN COMPARISON
      </span>

    </div>


    {/* =======================================================
        HERO HEADER
    ======================================================= */}
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.6fr] lg:items-end lg:gap-24">

      {/* LEFT */}
      <div>

        <h2 className="text-5xl font-bold leading-[1.06] tracking-tight text-[#102B46] sm:text-6xl lg:text-6xl">
          See the difference.
          <span className="block text-[#159C96]">
            Choose your level.
          </span>
        </h2>

      </div>


      {/* RIGHT */}
      <div className="max-w-[420px] lg:pb-3">

        <div className="mb-6 h-px w-14 bg-[#9ACBC7]" />

        <p className="text-[16px] leading-7 text-[#5F7184] sm:text-lg sm:leading-8">
          Every business needs a different level of support. Compare the
          approach at a glance and see where each plan takes you.
        </p>

      </div>

    </div>


    {/* =======================================================
        INTRO STRIP
    ======================================================= */}
    <div className="mt-16 border-y border-[#DCE5EC] py-6 md:mt-20 lg:mt-24">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#159C96]">
            ONE CLEAR VIEW
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#102B46] sm:text-3xl">
            Compare what each level brings.
          </h3>

        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7B8998]">
          CERITYPEOPLE
        </span>

      </div>
    </div>


    {/* =======================================================
        PLAN RAIL
    ======================================================= */}
    <div className="relative mt-10">

      {/* Desktop rail */}
      <div className="absolute left-0 right-0 top-[53px] hidden h-px bg-[#D5E1E8] lg:block" />

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">

        {/* ===================================================
            BASIC
        =================================================== */}
        <div className="relative">

          <div className="relative z-10 flex items-center gap-4 bg-[#F7F9FC] pr-4">

            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#B8D8D5] bg-[#EAF6F5] text-xs font-bold text-[#159C96]">
              01
            </span>

            <div>

              <p className="text-[15px] font-bold uppercase tracking-[0.2em] text-[#159C96]">
                Basic
              </p>

              <p className="mt-1 text-[#7B8998]">
                Growing teams
              </p>

            </div>

          </div>

          <div className="mt-6 border-l border-[#D5E1E8] pl-5 lg:ml-[21px] lg:mt-8">

            <p className="max-w-[280px] leading-6 text-[#68798A]">
              Core people operations support to keep your business
              organized and moving.
            </p>

          </div>

        </div>


        {/* ===================================================
            EXECUTIVE
        =================================================== */}
        <div className="relative">

          <div className="relative z-10 flex items-center gap-4 bg-[#F7F9FC] px-0 lg:px-4">

            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#159C96] text-xs font-bold text-white shadow-[0_8px_20px_rgba(21,156,150,0.20)]">
              02
            </span>

            <div>

              <div className="flex items-center gap-2">

                <p className="text-[15px] font-bold uppercase tracking-[0.2em] text-[#159C96]">
                  Executive
                </p>

                <span className="rounded-full bg-[#DDF1EF] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#159C96]">
                  Popular
                </span>

              </div>

              <p className="mt-1 text-[#7B8998]">
                Growing workforce
              </p>

            </div>

          </div>

          <div className="mt-6 border-l-2 border-[#159C96] pl-5 lg:ml-[21px] lg:mt-8 lg:pl-7">

            <p className="max-w-[300px] leading-6 text-[#5F7184]">
              Connected people operations support for businesses ready
              for a more complete approach.
            </p>

          </div>

        </div>


        {/* ===================================================
            PROFESSIONAL
        =================================================== */}
        <div className="relative">

          <div className="relative z-10 flex items-center gap-4 bg-[#F7F9FC] pl-0 lg:pl-4">

            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#B8D8D5] bg-[#EAF6F5] text-xs font-bold text-[#159C96]">
              03
            </span>

            <div>

              <p className="text-[15px] font-bold uppercase tracking-[0.2em] text-[#159C96]">
                Professional
              </p>

              <p className="mt-1 text-[#7B8998]">
                Complex needs
              </p>

            </div>

          </div>

          <div className="mt-6 border-l border-[#D5E1E8] pl-5 lg:ml-[21px] lg:mt-8 lg:pl-7">

            <p className="max-w-[300px] leading-6 text-[#68798A]">
              Flexible people operations designed around complex or
              multi-country workforce requirements.
            </p>

          </div>

        </div>

      </div>

    </div>


    {/* =======================================================
        FEATURE COMPARISON RAIL
    ======================================================= */}
    <div className="mt-12 w-full">

      {/* =====================================================
          DESKTOP COLUMN LABELS
      ===================================================== */}
      <div className="mb-4 hidden grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr] items-center px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B8998] sm:grid lg:px-7">

        <span>
          Capabilities
        </span>

        <span className="text-center">
          Basic
        </span>

        <span className="text-center text-[#159C96]">
          Executive
        </span>

        <span className="text-center">
          Professional
        </span>

      </div>


      {/* =====================================================
          COMPARISON CONTAINER
      ===================================================== */}
      <div className="w-full overflow-hidden rounded-[24px] border border-[#DCE5EC] bg-white">

        {comparison.map((item, index) => (

          <div
            key={item.feature}
            className={`w-full ${
              index !== comparison.length - 1
                ? "border-b border-[#E5EBF0]"
                : ""
            }`}
          >

            {/* =================================================
                DESKTOP ROW
            ================================================= */}
            <div className="hidden min-w-0 grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr] items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-[#F7FAFC] sm:grid lg:px-7">

              {/* FEATURE */}
              <div className="flex min-w-0 items-center gap-3">

                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#9ACBC7]" />

                <span className="min-w-0 break-words text-sm font-semibold leading-6 text-[#3F5368] sm:text-[16px]">
                  {item.feature}
                </span>

              </div>


              {/* BASIC */}
              <div className="flex justify-center">

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    item.basic
                      ? "bg-[#159C96] text-white shadow-[0_5px_14px_rgba(21,156,150,0.18)]"
                      : "bg-[#F0F4F7] text-[#AEB9C3]"
                  }`}
                >
                  {item.basic ? "✓" : "—"}
                </span>

              </div>


              {/* EXECUTIVE */}
              <div className="flex justify-center">

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    item.executive
                      ? "bg-[#159C96] text-white shadow-[0_5px_14px_rgba(21,156,150,0.18)]"
                      : "bg-[#F0F4F7] text-[#AEB9C3]"
                  }`}
                >
                  {item.executive ? "✓" : "—"}
                </span>

              </div>


              {/* PROFESSIONAL */}
              <div className="flex justify-center">

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    item.professional
                      ? "bg-[#159C96] text-white shadow-[0_5px_14px_rgba(21,156,150,0.18)]"
                      : "bg-[#F0F4F7] text-[#AEB9C3]"
                  }`}
                >
                  {item.professional ? "✓" : "—"}
                </span>

              </div>

            </div>


            {/* =================================================
                MOBILE ROW
            ================================================= */}
            <div className="block w-full px-5 py-5 sm:hidden">

              {/* FEATURE NAME */}
              <div className="flex min-w-0 items-start gap-3">

                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9ACBC7]" />

                <span className="min-w-0 break-words text-[14px] font-semibold leading-6 text-[#263B50]">
                  {item.feature}
                </span>

              </div>


              {/* MOBILE PLAN STATUS */}
              <div className="mt-5 grid grid-cols-3 gap-2">

                {/* BASIC */}
                <div className="rounded-xl bg-[#F3F7FA] px-2 py-3 text-center">

                  <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#7B8998]">
                    Basic
                  </p>

                  <span
                    className={`mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${
                      item.basic
                        ? "bg-[#159C96] text-white shadow-[0_4px_12px_rgba(21,156,150,0.18)]"
                        : "bg-white text-[#AEB9C3]"
                    }`}
                  >
                    {item.basic ? "✓" : "—"}
                  </span>

                </div>


                {/* EXECUTIVE */}
                <div className="rounded-xl bg-[#EAF6F5] px-2 py-3 text-center">

                  <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#159C96]">
                    Executive
                  </p>

                  <span
                    className={`mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${
                      item.executive
                        ? "bg-[#159C96] text-white shadow-[0_4px_12px_rgba(21,156,150,0.18)]"
                        : "bg-white text-[#AEB9C3]"
                    }`}
                  >
                    {item.executive ? "✓" : "—"}
                  </span>

                </div>


                {/* PROFESSIONAL */}
                <div className="rounded-xl bg-[#F3F7FA] px-2 py-3 text-center">

                  <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#7B8998]">
                    Professional
                  </p>

                  <span
                    className={`mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${
                      item.professional
                        ? "bg-[#159C96] text-white shadow-[0_4px_12px_rgba(21,156,150,0.18)]"
                        : "bg-white text-[#AEB9C3]"
                    }`}
                  >
                    {item.professional ? "✓" : "—"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>


    {/* =======================================================
        PROGRESSION MESSAGE
    ======================================================= */}
    <div className="mt-8 grid gap-0 overflow-hidden rounded-[26px] border border-[#DCE5EC] sm:grid-cols-3">

      {/* Step 1 */}
      <div className="bg-[#EDF4F8] p-6 sm:p-7">

        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6E8A9D]">
          01 — START
        </span>

        <h4 className="mt-3 text-lg font-bold tracking-[-0.025em] text-[#263B50]">
          Keep things organized.
        </h4>

        <p className="mt-2 leading-5 text-[#68798A]">
          Core support for everyday people operations.
        </p>

      </div>


      {/* Step 2 */}
      <div className="relative bg-[#E4F2F1] p-6 sm:p-7">

        <div className="absolute left-0 top-0 hidden h-full w-px bg-[#C7DFDD] sm:block" />

        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#159C96]">
          02 — CONNECT
        </span>

        <h4 className="mt-3 text-lg font-bold tracking-[-0.025em] text-[#263B50]">
          Bring everything together.
        </h4>

        <p className="mt-2 leading-5 text-[#68798A]">
          A connected approach for a growing workforce.
        </p>

      </div>


      {/* Step 3 */}
      <div className="relative bg-[#D7E9E8] p-6 sm:p-7">

        <div className="absolute left-0 top-0 hidden h-full w-px bg-[#B9D4D2] sm:block" />

        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#138781]">
          03 — SCALE
        </span>

        <h4 className="mt-3 text-lg font-bold tracking-[-0.025em] text-[#263B50]">
          Support what's next.
        </h4>

        <p className="mt-2 leading-5 text-[#68798A]">
          Flexible support for complex workforce needs.
        </p>

      </div>

    </div>


    {/* =======================================================
        BOTTOM CTA
    ======================================================= */}
    <div className="mt-10 flex flex-col gap-6 border-t border-[#DCE5EC] pt-7 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#159C96]">
          Still deciding?
        </p>

        <p className="mt-2 text-[17px] text-[#68798A]">
          We can help you choose the right level of support.
        </p>

      </div>

      <Link
        href="/contact"
        className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#159C96] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0D8983] hover:shadow-[0_10px_30px_rgba(21,156,150,0.20)]"
      >
        Talk to an Expert

        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

    </div>

  </div>
</section>

      

      <CTASection
        title="Not sure where to start?"
        description="Our consultants will map your needs to the right modules and services."
        buttonLabel="Find the Right Solution"
      />
    </>
  );
}
