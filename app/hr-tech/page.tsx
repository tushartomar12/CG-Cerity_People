import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { JsonLd } from "@/components/JsonLd";
import { ModuleCard } from "@/components/ModuleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { hrmsModulesDetailed } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HR Technology & HRMS",
  description:
    "Complete HR technology for the modern workplace. Digitize the employee lifecycle with recruitment, payroll, attendance, performance, and HR analytics.",
  path: "/hr-tech",
  keywords: [
    "HRMS Software",
    "HR Management System",
    "Employee Management Software",
    "Recruitment Software",
    "Payroll Management",
  ],
});

export default function HrTechPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "HR Technology", path: "/hr-tech" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "HR Technology" }]} />
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Complete HR Technology for the Modern Workplace
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Digitize your entire employee lifecycle with a centralized HR platform built for
              accuracy, compliance, and employee experience.
            </p>
          </div>
          <div className="mt-12">
            <DashboardPreview variant="full" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24"> 
        <div className="container">
          <SectionHeading
            eyebrow="HRMS Modules" 
            title="Everything you need in one HR management system"
            description="Modular capabilities you can deploy together or in phases — configured to your policies and workflows."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hrmsModulesDetailed.map((mod) => (
              <ModuleCard key={mod.title} title={mod.title} description={mod.description} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/contact">Request an HRMS Demo</ButtonLink>
          </div>
        </div>
      </section>

      <CTASection
        title="See the platform in action"
        description="Schedule a tailored demo focused on your HR priorities."
        buttonLabel="Request an HRMS Demo"
      />
    </>
  );
}
