// ===============================
// FILE: app/sitemap.ts
// ===============================
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://your-domain.com/", priority: 1 },
    { url: "https://your-domain.com/projects", priority: 0.9 },
    { url: "https://your-domain.com/about", priority: 0.8 },
    { url: "https://your-domain.com/contact", priority: 0.8 },
  ];
}