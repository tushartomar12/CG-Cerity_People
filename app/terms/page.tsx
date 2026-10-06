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
      <div className="container max-w-3xl py-12 pb-20">
        <h1 className="text-3xl font-bold text-navy">Terms & Conditions</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Placeholder terms content. Replace with your commercial terms, service agreements,
          and limitation of liability language.
        </p>
      </div>
    </>
  );
}
