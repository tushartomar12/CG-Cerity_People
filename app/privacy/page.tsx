import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <div className="relative overflow-hidden">
      <div className="container relative max-w-3xl py-12 pb-20">
        <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Placeholder privacy policy content. Replace with your legal text covering data
          collection, cookies, retention, and contact form submissions.
        </p>
      </div>
      </div>
    </>
  );
}
