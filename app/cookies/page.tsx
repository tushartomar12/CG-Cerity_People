import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: `Cookie policy for ${siteConfig.name}.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
      <div className="container max-w-3xl py-12 pb-20">
        <h1 className="text-3xl font-bold text-navy">Cookie Policy</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Placeholder cookie policy. Document analytics, functional, and marketing cookies
          when you enable tracking integrations.
        </p>
      </div>
    </>
  );
}
