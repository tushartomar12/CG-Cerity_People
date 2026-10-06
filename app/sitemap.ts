import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/about",
  "/hr-tech",
  "/consulting",
  "/solutions",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
