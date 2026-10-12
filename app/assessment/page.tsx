import { BrandBackground } from "@/components/BrandBackground";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { HomePageClass } from "@/components/HomePageClass";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const base = buildMetadata({
  title: "HR Assessment",
  description:
    "A confidential HR maturity assessment with indicative scores, gap analysis, and a downloadable briefing.",
  path: "/assessment",
});

export const metadata: Metadata = {
  ...base,
  robots: { index: false, follow: false },
};

export default function AssessmentPage() {
  return (
    <>
      <HomePageClass name="home-page" />
      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="hero" />
        <div className="container relative">
          <AssessmentFlow />
        </div>
      </section>
    </>
  );
}