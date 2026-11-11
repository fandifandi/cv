// app/sitemap.ts
import type { MetadataRoute } from "next";
import { slugs } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/projects/`, priority: 0.9 },
    ...slugs.map((slug) => ({ url: `${SITE_URL}/projects/${slug}/`, priority: 0.8 })),
  ];
}
