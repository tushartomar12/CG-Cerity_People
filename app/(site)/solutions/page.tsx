import { BrandBackground } from "@/components/BrandBackground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { HomePageClass } from "@/components/HomePageClass";
import { JsonLd } from "@/components/JsonLd";
import { PlanComparisonTable } from "@/components/PlanComparisonTable";
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
      professional:true,
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
      <HomePageClass name="solutions-page" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <div className="relative overflow-hidden">
        <BrandBackground variant="solutionsPage" />
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
  className="relative overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-28"
>
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Fine vertical detail */}
    <div className="absolute left-[6%] top-0 hidden h-full w-px bg-[rgba(8,32,56,0.08)] lg:block" />

    <div className="absolute right-[6%] top-0 hidden h-full w-px bg-[rgba(8,32,56,0.08)] lg:block" />
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
        <h2 className="text-5xl font-bold leading-[1.06] tracking-tight text-navy sm:text-6xl lg:text-6xl">
          Pricing that fits
          <span className="block text-gold">
            your business.
          </span>
        </h2>
      </div>

      <div className="max-w-[410px] lg:pb-3">
        <p className="text-[16px] leading-7 text-[rgba(8,32,56,0.70)] sm:text-lg sm:leading-8">
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
      {/* =====================================================
          PLAN GRID
      ===================================================== */}
      <div className="grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.05fr_0.9fr]">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col overflow-hidden rounded-[28px] ${
              plan.featured
                ? "bg-gradient-to-br from-navy via-navy-deep to-primary text-white shadow-[0_25px_70px_rgba(8,32,56,0.20)] lg:-translate-y-5"
                : "border border-[rgba(8,32,56,0.08)] bg-white text-navy shadow-[0_8px_30px_rgba(8,32,56,0.08)]"
            }`}
          >

            {/* =================================================
                FEATURED TOP STRIP
            ================================================= */}
            {plan.featured && (
              <div className="flex items-center justify-center bg-accent px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
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
                    ? "text-gold-light"
                    : "text-gold"
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
                    : "text-navy"
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
                    ? "text-gold-light"
                    : "text-[rgba(8,32,56,0.70)]"
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
                      ? "text-gold-light"
                      : "text-[rgba(8,32,56,0.70)]"
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
                            ? "bg-primary text-white"
                            : "bg-cream text-gold"
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={`leading-5 ${
                          plan.featured
                            ? "text-cream"
                            : "text-[rgba(8,32,56,0.70)]"
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
                    ? "bg-accent text-white hover:bg-gold-hover"
                    : "border-2 border-accent bg-white text-navy hover:bg-cream"
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
  className="relative overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-28"
>
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Editorial vertical lines */}
    <div className="absolute left-[5%] top-0 hidden h-full w-px bg-[rgba(8,32,56,0.08)] lg:block" />

    <div className="absolute right-[5%] top-0 hidden h-full w-px bg-[rgba(8,32,56,0.08)] lg:block" />
  </div>


  {/* =========================================================
      MAIN
  ========================================================= */}
  <div className="relative mx-auto max-w-[1320px]">

    {/* =======================================================
        TOP LABEL
    ======================================================= */}
    <div className="mb-10 flex items-center gap-4 lg:mb-14">

      <span className="text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
        — PLAN COMPARISON
      </span>

    </div>


    {/* =======================================================
        HERO HEADER
    ======================================================= */}
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.6fr] lg:items-end lg:gap-24">

      {/* LEFT */}
      <div>

        <h2 className="text-5xl font-bold leading-[1.06] tracking-tight text-navy sm:text-6xl lg:text-6xl">
          See the difference.
          <span className="block text-gold">
            Choose your level.
          </span>
        </h2>

      </div>


      {/* RIGHT */}
      <div className="max-w-[420px] lg:pb-3">

        <div className="mb-6 h-px w-14 bg-gold-light" />

        <p className="text-[16px] leading-7 text-[rgba(8,32,56,0.70)] sm:text-lg sm:leading-8">
          Every business needs a different level of support. Compare the
          approach at a glance and see where each plan takes you.
        </p>

      </div>

    </div>


    {/* =======================================================
        INTRO STRIP
    ======================================================= */}
    <div className="mt-16 border-y border-[rgba(8,32,56,0.08)] py-6 md:mt-20 lg:mt-24">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            ONE CLEAR VIEW
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-navy sm:text-3xl">
            Compare what each level brings.
          </h3>

        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgba(8,32,56,0.55)]">
          CERITYPEOPLE
        </span>

      </div>
    </div>


    <PlanComparisonTable rows={comparison} />


    {/* =======================================================
        BOTTOM CTA
    ======================================================= */}
    <div className="mt-10 flex flex-col gap-6 border-t border-[rgba(8,32,56,0.08)] pt-7 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          Still deciding?
        </p>

        <p className="mt-2 text-[17px] text-[rgba(8,32,56,0.70)]">
          We can help you choose the right level of support.
        </p>

      </div>

      <Link
        href="/contact"
        className="btn-gradient group inline-flex w-fit items-center gap-4 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[rgba(22,119,232,0.18)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.22)]"
      >
        Talk to an Expert

        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>

    </div>

  </div>
</section>
      </div>

      <CTASection
        title="Not sure where to start?"
        description="Our consultants will map your needs to the right modules and services."
        buttonLabel="Find the Right Solution"
      />
    </>
  );
}
