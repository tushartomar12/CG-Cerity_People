import { BrandBackground } from "@/components/BrandBackground";
import { Assessment0Form } from "@/components/assessment0/Assessment0Form";
import { HomePageClass } from "@/components/HomePageClass";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const base = buildMetadata({
  title: "Quick HR check",
  description: "A 60-second indicative HR health check. Direct link only.",
  path: "/assessment0",
});

export const metadata: Metadata = {
  ...base,
  robots: { index: false, follow: false },
};

export default function Assessment0Page() {
  return (
    <>
      <HomePageClass name="home-page" />
      <section className="relative overflow-hidden py-16 sm:py-20">
        <BrandBackground variant="hero" />
        <div className="container relative">
          <Assessment0Form />
        </div>
      </section>
    </>
  );
}
