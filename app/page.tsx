import {
  BarChart3,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Database,
  Shield,
  Users,
} from "lucide-react";
import { BenefitCard } from "@/components/BenefitCard";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { MeshBackground } from "@/components/MeshBackground";
import { ModuleTile } from "@/components/ModuleTile";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { StatCard } from "@/components/StatCard";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TrustBar } from "@/components/TrustBar";
import {
  approachSteps,
  consultingServices,
  homeFaqs,
  hrChallenges,
  hrTechModules,
  stats,
  testimonials,
  trustLogos,
  whyChooseUs,
} from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, faqSchema } from "@/lib/seo";

import {

  UserPlus,
  ClipboardCheck,
  Clock3,
  CalendarDays,
  Wallet,
} from "lucide-react";


export const metadata = buildMetadata({
  title: "HR Technology & HR Consulting",
  description:
    "Transform HR with modern HRMS, payroll, recruitment, and expert consulting. Simplify operations, improve compliance, and scale your workforce.",
  path: "/",
  keywords: [
    "HR Technology",
    "HRMS Software",
    "HR Consulting Services",
    "Payroll Management",
    "HR Automation",
  ],
});

const challengeIcons = {
  clipboard: ClipboardList,
  calculator: Calculator,
  shield: Shield,
  database: Database,
  users: Users,
  chart: BarChart3,
} as const;

const heroPoints = [
  "Unified HRMS, payroll & recruitment",
  "Implementation led by HR consultants",
  "Built for compliance and scale",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

     {/* =========================================================
    HERO — CENTERED HR TECHNOLOGY
========================================================= */}
<section className="relative overflow-hidden pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
  <MeshBackground />

  <div className="container relative">
    <div className="mx-auto max-w-[1200px] text-center">

      {/* Label */}
      <div className="animate-fade-in-up">
        
         
      </div>

      {/* Heading */}
     <h1 className="mx-auto mt-6 max-w-[1050px] text-balance text-4xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl lg:leading-tight">
  Transform HR with Technology, Automation & Expertise
</h1>

      {/* Description */}
      <p className="mx-auto mt-7 max-w-[1050px] text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-[18px] lg:leading-[1.65]">
        Power your workforce with modern HR technology and expert consulting
        solutions designed to simplify HR operations, improve compliance, and
        help your business grow.
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/hr-tech">
          Explore HR Solutions
        </ButtonLink>

        <ButtonLink href="/contact" variant="outline">
          Book a Consultation
        </ButtonLink>
      </div>

      {/* Trust Text */}
      <p className="mt-7 text-sm text-slate-500">
        Trusted by HR, finance, and leadership teams at{" "}
        <span className="font-semibold text-navy">
          500+ organizations
        </span>
      </p>

    </div>
  </div>
</section>

      <TrustBar logos={trustLogos} />

      

      {/* =========================================================
    HR TECH — SIX FEATURE CARDS
========================================================= */}
<section className="section-padding bg-slate-50">
  <div className="container">

    <SectionHeading
      eyebrow="HRMS Platform"
      title="One Platform for Your Entire Employee Lifecycle"
      description="From hire to retire — manage recruitment, onboarding, time, pay, performance, and analytics in one HR management system."
    />

    {/* SIX HR MODULES */}
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

      {/* 01 — Employee Management */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            01
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Employee Management
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            Central profiles, org structure, and records.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>


      {/* 02 — Recruitment & ATS */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <UserPlus className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            02
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Recruitment & ATS
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            End-to-end hiring pipelines and candidate tracking.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>


      {/* 03 — Onboarding */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ClipboardCheck className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            03
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Onboarding
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            Automated tasks, documents, and day-one readiness.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>


      {/* 04 — Attendance */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            04
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Attendance
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            Track shifts, hours, and policy compliance.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>


      {/* 05 — Leave Management */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            05
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Leave Management
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            Policies, balances, approvals, and calendars.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>


      {/* 06 — Payroll */}
      <div className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold text-blue-100">
            06
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-semibold text-navy">
            Payroll
          </h3>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-600">
            Accurate pay runs, calculations, and compliance.
          </p>
        </div>

        <div className="absolute bottom-6 right-7 text-slate-300 transition-colors duration-300 group-hover:text-blue-500">
          →
        </div>
      </div>

    </div>

    {/* CTA */}
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <ButtonLink href="/hr-tech">
        Explore HR Technology
      </ButtonLink>

      <ButtonLink href="/contact" variant="ghost">
        Request a demo →
      </ButtonLink>
    </div>

  </div>
</section>

     

      {/* Consulting */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="Consulting"
            title="HR Expertise That Moves Your Business Forward"
            description="Strategy, payroll, compliance, and transformation — standalone or alongside our HRMS."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                href="/consulting"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/consulting" variant="secondary">
              Explore Consulting Services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <SectionHeading eyebrow={`Why ${siteConfig.name}`} title="Why Choose Us" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <BenefitCard
                key={item.title}
                index={i}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

       {/* How we work — compact strip */}
      <section className="border-y border-slate-200/80 bg-white py-12 sm:py-14">
        <div className="container">
          <p className="text-center text-lg font-semibold uppercase tracking-[0.2em] text-slate-500">
            How we partner with you
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step) => (
              <li key={step.title} className="relative text-center sm:text-left">
                <span className="text-2xl font-bold text-accent/90">{step.step}</span>
                <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding border-t border-slate-100">
        <div className="container">
          <SectionHeading
            eyebrow="Customer stories"
            title="Results leaders trust"
            description={`Teams use ${siteConfig.name} to run payroll with confidence, hire faster, and give HR a strategic seat at the table.`}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
        </div>
      </section>

      
      

      <CTASection
        title="Ready to Build a Smarter HR Function?"
        description="Talk to our HR technology and consulting experts — we'll help you choose the right path in one conversation."
      />
    </>
  );
}
