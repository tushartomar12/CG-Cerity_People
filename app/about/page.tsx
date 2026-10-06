import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { approachSteps, teamMembers, whyChooseUs } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn how we combine HR technology, automation, consulting, and compliance expertise to build efficient, scalable HR operations.",
  path: "/about",
  keywords: ["HR Consulting Services", "HR Digital Transformation", "HRMS Software"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <HeroSection
        title="Technology Meets HR Expertise"
        description="We combine HR technology, automation, consulting, and compliance expertise to help organizations build efficient and scalable HR operations — for startups, SMBs, and enterprises."
        size="compact"
      />

      <section className="py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading align="left" title="Who We Are" />
            <p className="mt-6 text-slate-600 leading-relaxed">
              {`Cerity People is an HR technology and consulting partner for organizations that want
              people operations to be a growth enabler — not a back-office burden. Our team
              implements modern HRMS platforms and advises leadership on strategy, payroll,
              compliance, and workforce design.`}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you are digitizing HR for the first time or optimizing a mature function,
              we bring practical playbooks, configurable software, and hands-on support.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-navy">Our Mission</h2>
              <p className="mt-2 text-slate-600">
                Make HR simpler, smarter and more strategic through technology and expertise.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">Our Vision</h2>
              <p className="mt-2 text-slate-600">
                Build workplaces where technology enables people and businesses to perform at
                their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Our Approach" description="A proven delivery model from discovery to continuous improvement." />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-accent">{step.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Why Organizations Choose Us" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-lg border border-slate-100 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="font-semibold text-navy">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="Leadership & Team" description="Experienced practitioners across HR technology and consulting." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300" aria-hidden />
                <div className="p-5">
                  <h3 className="font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Transform Your HR Operations"
        description="Partner with our team to design, implement, and optimize your HR function."
        buttonLabel="Book a Consultation"
      />
    </>
  );
}
