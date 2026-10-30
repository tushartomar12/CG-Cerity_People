import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/about",
  "/hr-tech",
  "/consulting",
  "/solutions",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
