import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { consultingServicesDetailed } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HR Consulting Services",
  description:
    "HR consulting for strategy, process optimization, payroll, compliance, workforce planning, and digital transformation.",
  path: "/consulting",
  keywords: [
    "HR Consulting Services",
    "HR Compliance Consulting",
    "Payroll Management",
    "Workforce Management",
  ],
});

export default function ConsultingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Consulting", path: "/consulting" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Consulting" }]} />
      <HeroSection
        title="HR Consulting That Helps Your Business Grow"
        description="Build efficient HR processes, improve workforce management and create scalable people strategies — with advisors who understand operational reality."
        size="compact"
      />

      <section className="py-16 sm:py-24">
        <div className="container">
          <SectionHeading
            title="Simplified HR Solutions"
            description="Engagements tailored for HR leaders, founders, finance teams, and growing organizations."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServicesDetailed.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a discovery conversation"
        description="Share your HR challenges and we'll recommend the right consulting path."
        buttonLabel="Book a Consultation"
      />
    </>
  );
}
