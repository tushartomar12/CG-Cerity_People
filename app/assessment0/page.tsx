import { BrandBackground } from "@/components/BrandBackground";
import { Assessment0Experience } from "@/components/assessment0/Assessment0Experience";
import { HomePageClass } from "@/components/HomePageClass";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const base = buildMetadata({
  title: "HR Risk Check",
  description: "Free HR risk check — see your risk by area in under a minute. Direct link only.",
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
      <section className="relative py-16 sm:py-20">
        <BrandBackground variant="hero" />
        <div className="container relative z-10">
          <Assessment0Experience />
        </div>
      </section>
    </>
  );
}
