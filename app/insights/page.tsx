import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroSection } from "@/components/HeroSection";
import { InsightsExplorer } from "@/components/InsightsExplorer";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HR Insights & Resources",
  description:
    "Guides and articles on HR technology, payroll, compliance, recruitment, and workforce management.",
  path: "/insights",
  keywords: ["HR Technology", "HRMS Software", "HR Compliance Consulting", "HR Automation"],
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
      <HeroSection
        title="HR Insights, Guides & Resources"
        description="Practical content for HR leaders and founders — structured for easy CMS or API integration later."
        size="compact"
      />
      <section className="pb-20 pt-4">
        <div className="container">
          <InsightsExplorer posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
