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

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
        <MeshBackground />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-800">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                HR Technology & Consulting
              </span>
              <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
                Transform HR with Technology, Automation & Expertise
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Power your workforce with modern HR technology and expert consulting
                solutions designed to simplify HR operations, improve compliance, and
                help your business grow.
              </p>
              <ul className="mt-6 space-y-2.5">
                {heroPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/hr-tech">Explore HR Solutions</ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Book a Consultation
                </ButtonLink>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Trusted by HR, finance, and leadership teams at{" "}
                <span className="font-semibold text-navy">500+ organizations</span>
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-200 relative lg:pl-4">
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand/10 via-transparent to-accent/10 blur-2xl"
                aria-hidden
              />
              <DashboardPreview className="relative lg:rotate-[0.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar logos={trustLogos} />

      {/* Challenges — split layout */}
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 lg:pt-4">
              <SectionHeading
                align="left"
                eyebrow="The problem"
                title="HR Shouldn't Be Complicated"
                description="Growing companies hit the same walls — manual work, scattered data, and compliance risk. We replace chaos with one platform and expert guidance."
              />
              <ButtonLink href="/contact" variant="outline" className="mt-8 hidden lg:inline-flex">
                Talk to an expert
              </ButtonLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {hrChallenges.map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={challengeIcons[item.icon]}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HR Tech */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="HRMS Platform"
            title="One Platform for Your Entire Employee Lifecycle"
            description="From hire to retire — manage recruitment, onboarding, time, pay, performance, and analytics in one HR management system."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {hrTechModules.map((mod, i) => (
              <ModuleTile
                key={mod.title}
                index={i}
                title={mod.title}
                description={mod.description}
              />
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink href="/hr-tech">Explore HR Technology</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Request a demo →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* How we work — compact strip */}
      <section className="border-y border-slate-200/80 bg-white py-12 sm:py-14">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
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

      {/* Stats — dark band */}
      <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage: `radial-gradient(circle at 10% 100%, rgb(29 78 216) 0%, transparent 50%)`,
          }}
        />
        <div className="container relative">
          <SectionHeading
            title="Outcomes That Scale With You"
            description="Metrics from client programs — update anytime in lib/data.ts."
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      <div id="faq">
        <FAQSection faqs={homeFaqs} />
      </div>

      <CTASection
        title="Ready to Build a Smarter HR Function?"
        description="Talk to our HR technology and consulting experts — we'll help you choose the right path in one conversation."
      />
    </>
  );
}
