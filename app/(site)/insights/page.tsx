import { Breadcrumb } from "@/components/Breadcrumb";
import { ButtonLink } from "@/components/ButtonLink";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HR Insights & Resources",
  description:
    "Guides and articles from Cerity People will be published here. In the meantime, talk with our team about your HR needs.",
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
        description="This section is being prepared. For practical help with HR technology, payroll, or consulting, get in touch with our team."
        size="compact"
      >
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </HeroSection>
    </>
  );
}
