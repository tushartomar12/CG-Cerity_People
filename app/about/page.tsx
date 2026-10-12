import { CheckCircle2 } from "lucide-react";
import { BrandBackground } from "@/components/BrandBackground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroSection } from "@/components/HeroSection";
import { HomePageClass } from "@/components/HomePageClass";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { whyChooseUs } from "@/lib/data";
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
      <HomePageClass name="about-page" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="relative -mt-16 overflow-hidden lg:-mt-[4.5rem]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src="/brand-background.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative pt-16 lg:pt-[4.5rem]">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <HeroSection
            title="Technology Meets HR Expertise"
            description="We combine HR technology, automation, consulting, and compliance expertise to help organizations build efficient and scalable HR operations — for startups, SMBs, and enterprises."
            size="compact"
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="about" />
        <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-start">
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
            <div className="rounded-xl border border-[rgba(8,32,56,0.08)] bg-soft-white p-6">
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

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="people" />
        <div className="container relative">
          <SectionHeading
            title="Leadership & Team"
            description="Experienced practitioners across HR technology and consulting."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src="/rohit.webp"
                  alt="Rohit Lohia"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy">Rohit Lohia</h3>
                <p className="text-sm font-medium text-accent">Chief Executive Officer</p>
                <p className="mt-2 text-sm text-slate-600">
                  15+ years leading HR transformation programs for global enterprises.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src="/indu.webp"
                  alt="Indu Wadhwa"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy">Indu Wadhwa</h3>
                <p className="text-sm font-medium text-accent">HR & Consulting Leader</p>
                <p className="mt-2 text-sm text-slate-600">
                  Experienced practitioner across HR technology, consulting, and workforce strategy.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div
                className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300"
                aria-hidden
              />
              <div className="p-5">
                <h3 className="font-semibold text-navy">Pallavi</h3>
                <p className="text-sm font-medium text-accent">HR & Consulting Leader</p>
                <p className="mt-2 text-sm text-slate-600">
                  Experienced practitioner across HR technology, consulting, and workforce strategy.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="consulting" />
        <div className="container relative">
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

    </>
  );
}
