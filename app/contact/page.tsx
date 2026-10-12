import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BrandBackground } from "@/components/BrandBackground";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { HeroSection } from "@/components/HeroSection";
import { HomePageClass } from "@/components/HomePageClass";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Book a Consultation",
  description:
    "Tell us about your HR requirements. Our experts will help you identify the right HRMS, payroll, or consulting solution.",
  path: "/contact",
  keywords: ["HR Consulting Services", "HRMS Software", "HR Digital Transformation"],
});

export default function ContactPage() {
  return (
    <>
      <HomePageClass name="contact-page" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="relative overflow-hidden">
        <BrandBackground variant="contactPage" />
      <Breadcrumb
        inverted
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <HeroSection
        inverted
        title="Let's Talk About Your HR Challenges"
        description="Tell us about your HR requirements and our experts will help you identify the right technology or consulting solution."
        size="compact"
      />

      <section className="relative overflow-hidden pb-20">
        <div className="container relative grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="min-h-[24rem] rounded-2xl bg-white/10" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-2 lg:space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-primary/25 blur-2xl"
                aria-hidden
              />
              <h2 className="relative text-lg font-semibold text-white">Get in touch</h2>
              <ul className="relative mt-6 space-y-5 text-sm text-white/75">
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-gold-light">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-gold-light"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <span>{siteConfig.contact.businessHours}</span>
                </li>
              </ul>
            </div>
            <div
              className="mt-6 flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500"
              role="img"
              aria-label="Map placeholder — embed Google Maps or Mapbox here"
            >
              Map placeholder
            </div>
          </aside>
        </div>
      </section>
      </div>
    </>
  );
}
