import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageSeo): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/cerity-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
