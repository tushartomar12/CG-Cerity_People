import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { HeroSection } from "@/components/HeroSection";
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <HeroSection
        title="Let's Talk About Your HR Challenges"
        description="Tell us about your HR requirements and our experts will help you identify the right technology or consulting solution."
        size="compact"
      />

      <section className="pb-20">
        <div className="container grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <aside className="lg:col-span-2 lg:space-y-6">
            <div className="rounded-2xl bg-navy p-6 text-white shadow-lg shadow-navy/20">
              <h2 className="text-lg font-semibold">Why book a consultation?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• HRMS fit assessment for your size & industry</li>
                <li>• Payroll & compliance gap review</li>
                <li>• Clear next steps — no hard sell</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy">Get in touch</h2>
              <ul className="mt-6 space-y-5 text-sm text-slate-600">
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-navy">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-navy"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-accent" aria-hidden />
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
    </>
  );
}
