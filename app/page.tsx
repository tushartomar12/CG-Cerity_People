import { BenefitCard } from "@/components/BenefitCard";
import { ButtonLink } from "@/components/ButtonLink";
import { BrandBackground } from "@/components/BrandBackground";
import { CTASection } from "@/components/CTASection";
import { EmployeeLifecycle } from "@/components/EmployeeLifecycle";
import { HomePageClass } from "@/components/HomePageClass";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  approachSteps,
  homeExpertServices,
  homeWhyCerityPeople,
  testimonials,
} from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

/** Set true to show Customer stories on the home page. */
const SHOW_HOME_TESTIMONIALS = false;

export const metadata = buildMetadata({
  title: "Hire, Onboard, Pay & Manage Your People",
  description:
    "Cerity People brings HR technology and expert HR support together, so your team spends less time on administration and more time on growth. From the first job description to the final settlement, we keep your people processes accurate, compliant and organized.",
  path: "/",
  keywords: [
    "HR Technology",
    "HRMS Software",
    "HR Consulting Services",
    "Payroll Management",
    "HR Automation",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomePageClass />

      <section className="relative -mt-16 flex overflow-hidden pb-20 pt-[calc(4rem+2.5rem)] sm:pb-24 sm:pt-[calc(4rem+3.5rem)] lg:-mt-[4.5rem] lg:min-h-[100svh] lg:items-center lg:pb-16 lg:pt-[4.5rem]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src="/brand-background.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="container relative w-full">
          <div className="mx-auto max-w-[1100px] text-center">
            <h1 className="mx-auto text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
              <span className="block text-navy">Hire, Onboard, Pay &amp; Manage Your People,</span>
              <span className="block text-accent">All in One Place</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[18px] lg:leading-[1.65]">
              Cerity People brings HR technology and expert HR support together, so your team
              spends less time on administration and more time on growth. From the first job
              description to the final settlement, we keep your people processes accurate,
              compliant and organized.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" className="min-w-[200px] px-8 py-3.5">
                Book a Consultation
              </ButtonLink>
              <ButtonLink
                href="#employee-journey"
                variant="outline"
                className="min-w-[200px] px-8 py-3.5"
              >
                See How It Works
              </ButtonLink>
            </div>

            <p className="mt-8 text-sm text-slate-600">
              A trusted HR partner for businesses of every size and across industries.
            </p>
          </div>
        </div>
      </section>

      <section
        id="employee-journey"
        className="relative overflow-hidden section-padding scroll-mt-24"
      >
        <BrandBackground variant="hero" />
        <div className="container relative">
          <EmployeeLifecycle />
        </div>
      </section>

      <section className="relative overflow-hidden section-padding">
        <BrandBackground variant="consulting" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Expert Services"
            title="HR Expertise That Moves Your Business Forward"
            description="Practical HR Support for Your Day-to-Day Needs."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeExpertServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                href="/consulting"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/consulting" variant="outline">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-padding">
        <BrandBackground variant="people" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Why Cerity People"
            title="HR Support Designed Around Your Business"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {homeWhyCerityPeople.map((item, i) => (
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

      <section className="relative overflow-hidden section-padding">
        <BrandBackground variant="about" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Our Approach"
            title="Four Simple Steps to a Smarter HR Function"
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold tracking-[0.16em] text-accent">{step.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {SHOW_HOME_TESTIMONIALS ? (
        <section className="relative overflow-hidden section-padding border-t border-slate-100">
          <BrandBackground variant="testimonials" />
          <div className="container relative">
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
      ) : null}

      <CTASection
        title="Ready to Simplify How You Manage People?"
        description="Get the right HR support to keep your people processes organized and your day-to-day operations running smoothly."
        buttonLabel="Book a Consultation"
        buttonHref="/contact"
      />
    </>
  );
}
