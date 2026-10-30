import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { LogoTransitionProvider } from "@/components/LogoTransitionContext";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | HR Technology & Consulting`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased text-navy-deep">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LogoTransitionProvider>{children}</LogoTransitionProvider>
      </body>
    </html>
  );
}
