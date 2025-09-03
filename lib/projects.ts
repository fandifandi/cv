// lib/projects.ts
import { z } from "zod";

const MetricSchema = z.object({ label: z.string(), value: z.string() });
const DetailSchema = z.object({
  client: z.string().optional(),
  roles: z.array(z.string()).optional(),
  stackExtra: z.array(z.string()).optional(), // tambahan selain tags
  responsibilities: z.array(z.string()).optional(),
  metrics: z.array(MetricSchema).optional(),
  sections: z
    .object({
      problem: z.string().optional(),
      goals: z.array(z.string()).optional(),
      approach: z.array(z.string()).optional(),
      results: z.array(z.string()).optional(),
      learnings: z.array(z.string()).optional(),
    })
    .optional(),
  gallery: z.array(z.string()).optional(), // path /public/...
  links: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  year: z.number(),
  cover: z.string().optional(), // /public/...
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  detail: DetailSchema.optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

const data: Project[] = [
  {
    title: "Sejalan — Ride Sharing (BlaBlaCar clone)",
    slug: "sejalan-rides",
    excerpt:
      "Geo search, FastAPI + PostgreSQL + React/Tailwind. Advanced filters, pagination, and booking logic.",
    tags: ["FastAPI", "PostgreSQL", "React", "GIS"],
    year: 2025,
    cover: "/covers/sejalan.png",
    repo: "https://github.com/your/sejalan",
    demo: "https://sejalan.your-domain.com",
    featured: true,
    detail: {
      client: "Internal prototype",
      roles: ["Full-stack", "Data Strategist"],
      stackExtra: ["Redis", "Docker", "Mapbox"],
      responsibilities: [
        "Design ERD & geospatial indexing (trips, users, routes)",
        "Implement search & booking API (FastAPI)",
        "Geo UI (tiles, clustering) & optimistic updates",
        "Experiment tracking & funnel analytics",
      ],
      metrics: [
        { label: "Match rate", value: "+12%" },
        { label: "P95 latency", value: "−38%" },
        { label: "Cost/query", value: "−22%" },
      ],
      sections: {
        problem:
          "Komuter jarak menengah sering mismatch jadwal & rute. Tujuan: memperbesar match rate & menurunkan biaya query geospasial.",
        goals: [
          "G1 — +10% match rate pada minggu ke-4",
          "G2 — P95 search < 400 ms pada cache warm",
          "G3 — Self-serve dashboard untuk ops",
        ],
        approach: [
          "PostGIS dengan GIST index + Haversine untuk radius & route proximity.",
          "Caching per geohash di Redis + background refresh (TTL).",
          "Event model (search, view, request, accept) untuk funnel analytics.",
        ],
        results: [
          "+12% match rate (baseline vs minggu 4).",
          "P95 360 ms pada cache warm; 620 ms cold.",
          "Ops dapat melihat heatmap supply/demand harian.",
        ],
        learnings: [
          "Geohash bucketing mempercepat near-real-time tiles.",
          "Normalisasi event penting untuk akurasi funnel.",
          "Prefetch yang agresif bisa over-cache area low demand.",
        ],
      },
      gallery: ["/covers/sejalan.png", "/covers/placeholder.png", "/covers/placeholder.png"],
      links: [{ label: "Product Brief (GDoc)", href: "https://example.com/brief" }],
    },
  },
  {
    title: "LS99 — Herbal Oil Brand",
    slug: "ls99",
    excerpt: "Brand system, packaging, and e-commerce setup with analytics.",
    tags: ["Branding", "E-commerce", "Analytics"],
    year: 2024,
    cover: "/covers/ls99.png",
    featured: true,
    detail: {
      client: "LS99",
      roles: ["Brand Designer", "Analytics"],
      stackExtra: ["Shopify", "GA4", "GTM"],
      responsibilities: [
        "Brand system (logo, color, packaging dieline)",
        "Shopify theme setup & conversion best practices",
        "GA4 enhanced ecommerce + server events",
        "Retention cohort dashboard",
      ],
      metrics: [
        { label: "CVR", value: "+8%" },
        { label: "AOV", value: "+11%" },
        { label: "RTRN 90d", value: "+6pt" },
      ],
      sections: {
        problem:
          "Brand belum konsisten; e-commerce tanpa tracking memadai. Target: perbaiki trust visual & ukur funnel end-to-end.",
        goals: [
          "G1 — +5% checkout conversion",
          "G2 — Implement enhanced ecommerce (view→purchase)",
          "G3 — Cohort retention 90 hari",
        ],
        approach: [
          "Design system dengan token warna/typography reusable.",
          "Checkout UX: trust badges, shipping clarity, dan sticky CTA.",
          "GA4 EE + GTM server-side untuk event yang lebih andal.",
        ],
        results: [
          "+8% CVR; CTR PDP → cart +13%.",
          "Retensi 90 hari naik 6pt setelah program bundle.",
          "Tim marketing punya dashboard cohort mingguan.",
        ],
        learnings: [
          "SSOT event naming memudahkan analisis lintas kampanye.",
          "Packaging yang konsisten menaikkan trust di PDP.",
          "Bundling lebih efektif daripada diskon generik.",
        ],
      },
      gallery: ["/covers/ls99.png", "/covers/placeholder.png"],
    },
  },
  {
    title: "Analytics Map Dashboard",
    slug: "analytics-map",
    excerpt: "Heatmaps of pickup/destination density, fleet counts, and trip insights.",
    tags: ["Next.js", "Maps", "Deck.gl"],
    year: 2025,
    cover: "/covers/map.png",
    featured: false,
    detail: {
      client: "Internal Ops",
      roles: ["Analytics Engineer"],
      stackExtra: ["Kepler.gl", "BigQuery"],
      responsibilities: [
        "Data model untuk event geospasial",
        "Layer heatmap/density + time window",
        "Guardrail biaya BQ (partisi & cluster)",
      ],
      metrics: [
        { label: "TAT insight", value: "−4 hari" },
        { label: "Query cost", value: "−28%" },
      ],
      sections: {
        problem:
          "Operasional butuh peta permintaan real-time ringan untuk alokasi armada.",
        goals: [
          "G1 — Update tiles tiap 15 menit",
          "G2 — < 1s interaksi panning/zoom",
        ],
        approach: [
          "Pre-aggregation hourly + cache tiles.",
          "Deck.gl layers untuk interaksi ringan.",
        ],
        results: [
          "Dispatch berhasil kurangi wait time p95 sebesar 9%.",
          "Dashboard dipakai 3 tim (ops, CX, growth).",
        ],
        learnings: [
          "Pre-agg lebih hemat daripada kueri mentah per interaksi.",
          "UX peta perlu throttling pointermove untuk low-end device.",
        ],
      },
      gallery: ["/covers/map.png"],
    },
  },
];

// normalize and export helpers
export const allProjects: Project[] = data.map((p) => ProjectSchema.parse(p));
export const featuredProjects = allProjects.filter((p) => p.featured);
export const slugs = allProjects.map((p) => p.slug);
export const getProjectBySlug = (slug: string) => allProjects.find((p) => p.slug === slug);
