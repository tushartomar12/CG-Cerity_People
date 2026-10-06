import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { IndustryCard } from "@/components/IndustryCard";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { companySizes, industries, solutionsByNeed } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

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

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading align="left" title="By business need" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {solutionsByNeed.map((need) => (
              <li
                key={need}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-navy shadow-sm"
              >
                {need}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="By company size" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {companySizes.map((size) => (
              <article
                key={size.title}
                className="rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-navy">{size.title}</h3>
                <p className="mt-3 text-slate-600">{size.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <SectionHeading title="Industries we serve" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {industries.map((ind) => (
              <IndustryCard key={ind.title} title={ind.title} description={ind.description} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/contact">Find the Right Solution</ButtonLink>
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
