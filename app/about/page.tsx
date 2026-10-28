import { CheckCircle2 } from "lucide-react";
import { BrandBackground } from "@/components/BrandBackground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { HomePageClass } from "@/components/HomePageClass";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import {
  aboutHowWeHelp,
  aboutHowWeSucceed,
  aboutPrinciples,
  aboutTrustItems,
  aboutWhatWeAreBuilding,
  aboutWhyChooseUs,
} from "@/lib/data";
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
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="More Than HR Support. A Better Way to Work."
            />
            <p className="mt-6 text-slate-600 leading-relaxed">
              Cerity People is built around a simple idea: HR should make business easier, not
              more complicated.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              As businesses grow, managing people becomes more demanding. Hiring, onboarding,
              payroll, employee records, compliance and performance all need time, coordination
              and consistency. When these run separately, important work gets harder to manage.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We bring these functions together through technology-enabled processes and
              hands-on expertise. Whether a business is hiring its first employees or
              strengthening established HR operations, Cerity People helps create the
              structure, clarity and support it needs to move forward.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Cerity People began with a common problem: as businesses grow, HR work gets split
              across separate people, tools and spreadsheets, and the cost shows up in delays,
              errors and compliance risk. We set out to bring hiring, onboarding, payroll,
              compliance and performance into one connected approach, combining technology with
              experienced HR professionals, so businesses of any size can manage their people
              with confidence.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Cerity People is backed by Cerity Global, a California-headquartered global
              expansion partner with 20+ years of experience in HR, payroll, tax and
              compliance, and a presence in 170+ countries.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-[rgba(8,32,56,0.08)] bg-soft-white p-6">
              <h2 className="text-lg font-semibold text-navy">Our Mission</h2>
              <p className="mt-2 text-slate-600">
                To make HR simpler, smarter, and more strategic through technology and
                expertise.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">Our Vision</h2>
              <p className="mt-2 text-slate-600">
                To build workplaces where technology empowers people, and businesses perform at
                their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="hero" />
        <div className="container relative">
          <SectionHeading
            eyebrow="What We Are Building"
            title="Technology Is the Tool. Better HR Is the Goal."
            description="We believe the future of HR is not about adding more tools. It is about making the whole experience work better. Effective HR needs the right combination of technology, expertise and accountability."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {aboutWhatWeAreBuilding.map((item, i) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="consulting" />
        <div className="container relative">
          <SectionHeading
            title="How Cerity People Helps Businesses Move Forward"
            description="From Everyday HR Tasks to Better Business Outcomes. We help businesses manage the essential parts of the employee journey with greater structure and confidence."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutHowWeHelp.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4">
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

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="people" />
        <div className="container relative space-y-16">
          <div>
            <SectionHeading title="Why Organizations Choose Us" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {aboutWhyChooseUs.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              title="How We Earn Your Trust"
              description="Trust Is Built in the Details."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {aboutTrustItems.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading title="The principles that guide us" />
            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-soft-white text-navy">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Principle</th>
                    <th className="px-5 py-3 font-semibold">What it looks like in practice</th>
                  </tr>
                </thead>
                <tbody>
                  {aboutPrinciples.map((item) => (
                    <tr key={item.title} className="border-t border-slate-100">
                      <td className="px-5 py-3 font-semibold text-navy">{item.title}</td>
                      <td className="px-5 py-3 text-slate-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <SectionHeading
              title="How we succeed"
              description="We succeed when you do."
            />
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutHowWeSucceed.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-bold tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="people" />
        <div className="container relative">
          <SectionHeading
            title="Meet the People Behind Cerity People"
            description="Expertise That Understands People and Business. Cerity People brings together HR knowledge, operational understanding, and a commitment to making people management work better for businesses."
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
                  Rohit brings over 15 years of experience leading HR transformation programs
                  for global enterprises. His focus is on building practical, scalable
                  approaches that connect people operations with business objectives.
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
                <p className="text-sm font-medium text-accent">HR Leader</p>
                <p className="mt-2 text-sm text-slate-600">
                  Indu brings experience across HR technology and workforce strategy, helping
                  shape structured, thoughtful approaches to HR operations and employee
                  management.
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
                <p className="text-sm font-medium text-accent">HR Leader</p>
                <p className="mt-2 text-sm text-slate-600">
                  Pallavi brings practical HR and people operations expertise, with a focus on
                  establishing effective processes that help businesses manage their employees
                  with greater clarity and consistency.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="about" />
        <div className="container relative mx-auto max-w-3xl text-center">
          <SectionHeading
            title="Our Commitment"
            description="Better HR Is Built Every Day."
          />
          <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
            <p>
              We know that effective HR is not defined by a single system, process, or
              interaction. It is built through consistent work, dependable support, thoughtful
              decisions, and a willingness to improve.
            </p>
            <p>
              At Cerity People, we are committed to making HR more connected, practical, and
              people-focused. As technology evolves and business needs change, we will continue
              working toward a simpler and more effective experience for the people who keep
              businesses moving.
            </p>
            <p>
              Because when HR works better, people can do their best work — and businesses are
              better positioned to grow.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Let’s Make HR Work Better for Your Business."
        description="Discover a more connected way to hire, manage, and support your people with Cerity People."
        buttonLabel="Book a Consultation"
        buttonHref="/contact"
      />
    </>
  );
}
