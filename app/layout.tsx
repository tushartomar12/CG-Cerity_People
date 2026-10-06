import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogoTransitionProvider } from "@/components/LogoTransitionContext";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased text-slate-800">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LogoTransitionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LogoTransitionProvider>
      </body>
    </html>
  );
}
