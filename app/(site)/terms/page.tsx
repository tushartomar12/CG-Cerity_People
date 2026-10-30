import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
      <div className="relative overflow-hidden">
        <div className="container relative max-w-3xl py-12 pb-20">
          <h1 className="text-3xl font-bold text-navy">Terms & Conditions</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            These terms are being prepared. If you have questions about using this website or
            our services, email{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-navy underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
