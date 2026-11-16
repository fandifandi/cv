// lib/projects.ts
import { url } from "inspector";
import { z } from "zod";

const MetricSchema = z.object({ label: z.string(), value: z.string() });
const videoSchema = z.object({
  mp4: z.string(),
  webm: z.string().optional(),
  poster: z.string().optional(),
})
const GalleryItemSchema = z.union([
  z.string(),
  z.object({
    src: z.string(),                 // path /public/... atau URL penuh
    alt: z.string().optional(),
    w: z.number().optional(),        // lebar asli (opsional)
    h: z.number().optional(),        // tinggi asli (opsional)
    fit: z.enum(["cover", "contain"]).optional(), // default "cover"
  }),
]);

const DetailSchema = z.object({
  client: z.string().optional(),
  roles: z.array(z.string()).optional(),
  stackExtra: z.array(z.string()).optional(), // tambahan selain tags
  linksDemo: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
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
  // gallery: z.array(z.string()).optional(), // path /public/...
  gallery: z.array(GalleryItemSchema).optional(),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
  video: videoSchema.optional(),
  steps: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  nextSteps: z.array(z.string()).optional(),
  // website: z.string().url().optional(),
});



export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  
  excerpt: z.string(),
  tags: z.array(z.string()),
  // website: z.string().url().optional(),
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
  title: "WooCommerce Site",
  slug: "ls99",
  // website: "www.larassaras99.com",
  excerpt: "Website storefront built end-to-end: brand system, product catalog, payments/shipping, and GA4 e-commerce analytics.",
  tags: ["Branding", "E-commerce", "WooCommerce", "WordPress"],
  year: 2025,
  cover: "/cv/assets/ls99/ls-home.webp",
  featured: true,
  detail: {
    // client: "LS99",
    // roles: ["Web Developer", "Brand Designer", "Analytics"],
    // stackExtra: ["WordPress", "GA4", "GTM", "Cloudflare"],
    responsibilities: [
      "Brand system: logo, palette, typography, and packaging guidelines",
      "WooCommerce setup: catalog structure, attributes/variations, and SEO basics",
      "Payments & shipping: gateway integration, taxes, and shipping rules",
      "Theme customization (child theme) and performance tuning (cache, images, CDN)",
      "GA4 e-commerce via GTM (view_item → purchase) + consent & UTM hygiene",
      "Operational dashboards for sales and SKU performance"
    ],
    // ❌ metrics: [ ... ]  <-- HAPUS saja kalau belum ada angka
    // metrics: [
    //   { label: "Go-Live", value: "Nov 2024" },
    //   // { label: "Catalog", value: "50+ SKUs" }
    // ],
    sections: {
      problem:
        "Brand belum konsisten dan store belum punya tracking yang andal, sehingga funnel sulit dipercaya dan prioritas perbaikan tidak jelas.",
      goals: [
        "G1 — Luncurkan WooCommerce storefront yang cepat dengan taxonomy produk yang rapi",
        "G2 — Aktifkan GA4 e-commerce end-to-end (view → purchase) yang konsisten",
        "G3 — Sediakan dashboard mingguan untuk review penjualan & promo"
      ],
      approach: [
        "Bangun brand system reusable dan terapkan ke lightweight child theme WooCommerce.",
        "Strukturkan katalog (atribut/variasi), konfigurasi pembayaran & shipping, plus SEO dasar (title, schema, slugs).",
        "Implement GA4 e-commerce via GTM dengan event & parameter konsisten; tambah consent mode dan normalisasi UTM.",
        "Optimasi performa: caching, kompresi gambar, dan CDN (Cloudflare) untuk LCP yang lebih baik terutama di mobile."
      ],
      results: [
        "Store live dengan tracking funnel yang bisa diandalkan (view_item → add_to_cart → begin_checkout → purchase).",
        "Tim bisa review performa SKU & promo mingguan dari dashboard tanpa ad-hoc exports.",
        "PDP lebih jelas (shipping/trust markers/sticky CTA) sehingga drop-off berkurang di step kritikal."
      ],
      learnings: [
        "Taxonomy & atribut yang konsisten memudahkan navigasi dan analisis.",
        "Perbaikan kecil di PDP (copy, info pengiriman, trust) punya dampak kumulatif ke add-to-cart & checkout.",
        "Materialisasi laporan mingguan mengurangi fire drill dan mempercepat pengambilan keputusan."
      ]
    }
    ,gallery: ["/assets/ls99/ls-shop.webp"
     
      ,"/cv/assets/ls99/ls1.webp"
       , "/cv/assets/ls99/ls-blog.webp"

    ]
  }
},
  {
    title: "Statistik Prakerja",
    slug: "analytics-pkj",
    excerpt: "The Prakerja Statistics website provides data on the program's implementation from 2020 to 2024, covering participant demographics, training options, and incentive distribution, showcasing its impact on workforce development in Indonesia.",
    tags: ["Data Visualization","Python","Airflow","AnalyticDB","GeoJSON"],
    year: 2024,
    cover: "/cv/assets/statistik-pkj/statistik-pkj-hero.png",
    featured: false,
    detail: {
      client: "Internal Ops",
      roles: [],
      stackExtra: ["Kepler.gl", "BigQuery"],
      responsibilities: [
        "Frame stakeholder questions and define metrics & data dictionary",
        "Design geo and demographic models with privacy-safe anonymization",
        "Orchestrate ETL in Airflow for incremental loads and backfills",
        "Optimize warehouse tables with partitioning, clustering, and summaries",
        "Generate vector tiles/GeoJSON and implement edge caching",
        "Build a map-first UI with filters, drill-downs, and permalinks",
        "Enable one-click exports (PNG/SVG/CSV) with clear footnotes and metadata",
        "Establish release process, changelogs, and coverage documentation",
      ],
      // metrics: [
      //   { label: "TAT insight", value: "−4 hari" },
      //   { label: "Query cost", value: "−28%" },
      // ],
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
      gallery: [
        "/cv/assets/statistik-pkj/statistik-province.webp"
        ,"/cv/assets/statistik-pkj/statistik-regency.webp"
        ,"/cv/assets/statistik-pkj/statistik-home.webp"
      ],
      video: {
        mp4: "",
        webm: "/cv/assets/statistik-pkj/statistik-prakerja.webm",
        poster: "/cv/assets/statistik-pkj/statistik-prakerja-poster-video.webp",
      },
    },
  },  
  {
    title: "Sejalan, Setujuan",
    slug: "rmc-app",
    excerpt: "Find People Going Your Way. A transport alternative that pairs demand with available seats in real time. Search is tuned for route overlap and time windows to surface the best companions first.",
    tags: ["FastAPI", "PostgreSQL","Firebase", "Google Cloud Run", "GeoJSON", "Leaflet Map", "NeonDB"],
    year: 2024,
    cover: "/cv/assets/sejalan/Sejalan1.webp",
    featured: false,
    detail: {
      // client: "Internal Ops",
      roles: [],
      stackExtra: ["Kepler.gl", "BigQuery"],
      gallery: ["/assets/sejalan/sejalan1.webp"
         ,"/cv/assets/sejalan/sejalan8.webp"
        , "/cv/assets/sejalan/sejalan2.webp"
         ,"/cv/assets/sejalan/sejalan7.webp"
        , "/cv/assets/sejalan/sejalan3.webp"
        , "/cv/assets/sejalan/sejalan5.webp"
       
      ]
    },
  },
  {
    title: "Dashboard Perlinsos",
    slug: "dashboard-perlinsos",
    excerpt: "A map-first national analytics platform for Indonesia's social-assistance registration — tracking coverage against population, agent activity, and BPNT/PKH eligibility from 38 provinces down to individual villages, with a privacy-safe public view.",
    tags: ["Data Visualization", "Dashboard", "GeoJSON", "Public Sector"],
    year: 2026,
    cover: "/cv/assets/dashboard-perlinsos/perlinsos-cover.webp",
    featured: true,
    detail: {
      // TODO(draft): konfirmasi client, roles & stack sebenarnya
      client: "KPDTP",
      roles: [],
      stackExtra: [],
      responsibilities: [
        "Defined registration, coverage, and eligibility metrics with stakeholders",
        "Designed a five-level, map-first drill-down from national to village",
        "Built coverage-vs-population rankings against a 50% projection target",
        "Visualized registrations by channel and agents by role across every region",
        "Surfaced BPNT & PKH eligibility outcomes per region, with CSV export",
        "Shipped a public landing with admin-controlled, privacy-safe publishing",
      ],
      gallery: [
        "/cv/assets/dashboard-perlinsos/perlinsos-nasional.webp",
        "/cv/assets/dashboard-perlinsos/perlinsos-provinsi.webp",
        "/cv/assets/dashboard-perlinsos/perlinsos-kotakab.webp",
        "/cv/assets/dashboard-perlinsos/perlinsos-public.webp",
        "/cv/assets/dashboard-perlinsos/perlinsos-preview-settings.webp",
      ],
      video: {
        mp4: "",
        webm: "/cv/assets/dashboard-perlinsos/perlinsos-public.webm",
        poster: "/cv/assets/dashboard-perlinsos/perlinsos-public-poster.webp",
      },
    },
  }

];

// normalize and export helpers
export const allProjects: Project[] = data.map((p) => ProjectSchema.parse(p));
export const featuredProjects = allProjects.filter((p) => p.featured);
export const slugs = allProjects.map((p) => p.slug);
export const getProjectBySlug = (slug: string) => allProjects.find((p) => p.slug === slug);
