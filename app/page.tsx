import { BenefitCard } from "@/components/BenefitCard";
import { ButtonLink } from "@/components/ButtonLink";
import { BrandBackground } from "@/components/BrandBackground";
import { EmployeeLifecycle } from "@/components/EmployeeLifecycle";
import { HomePageClass } from "@/components/HomePageClass";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TrustBar } from "@/components/TrustBar";
import {
  consultingServices,
  homeFaqs,
  testimonials,
  trustLogos,
  whyChooseUs,
} from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, faqSchema } from "@/lib/seo";

/** Set true to show Customer stories on the home page. */
const SHOW_HOME_TESTIMONIALS = false;

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

export default function HomePage() {
  return (
    <>
      <HomePageClass />
      <JsonLd data={faqSchema(homeFaqs)} />

     {/* =========================================================
    HERO — CENTERED HR TECHNOLOGY
========================================================= */}
<section className="relative -mt-16 overflow-hidden pb-20 pt-[calc(4rem+2.5rem)] sm:pb-24 sm:pt-[calc(4rem+3.5rem)] lg:-mt-[4.5rem] lg:pb-28 lg:pt-[calc(4.5rem+4rem)]">
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    <img
      src="/brand-background.jpg"
      alt=""
      className="h-full w-full object-cover object-center"
    />
  </div>

  <div className="container relative">
    <div className="mx-auto max-w-[1100px] text-center">

      <h1 className="mx-auto text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
        <span className="block text-navy">Transform HR with Technology,</span>
        <span className="block text-accent">Automation &amp; Expertise</span>
      </h1>

      <p className="mx-auto mt-6 max-w-[720px] text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[18px] lg:leading-[1.65]">
        Power your workforce with modern HR technology and expert consulting
        solutions designed to simplify HR operations, improve compliance, and
        help your business grow.
      </p>

      <div className="mt-9 flex justify-center">
        <ButtonLink href="/solutions" className="min-w-[200px] px-8 py-3.5">
          Explore HR Solutions
        </ButtonLink>
      </div>

      <p className="mt-8 text-sm text-slate-600">
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
    HR TECH — EMPLOYEE LIFECYCLE
========================================================= */}
<section className="relative overflow-hidden section-padding">
  <BrandBackground variant="hero" />
  <div className="container relative">
    <EmployeeLifecycle />
  </div>
</section>

     

      {/* Consulting */}
      <section className="relative overflow-hidden section-padding">
        <BrandBackground variant="consulting" />
        <div className="container relative">
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
            <ButtonLink href="/consulting" variant="outline">
              Explore Consulting Services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden section-padding">
        <BrandBackground variant="people" />
        <div className="container relative">
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

      
      

    </>
  );
}
