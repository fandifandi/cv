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
    title: "Coming Soon - Data App",
    slug: "static-project",
    excerpt: "The Prakerja Statistics website provides data on the program's implementation from 2020 to 2024, covering participant demographics, training options, and incentive distribution, showcasing its impact on workforce development in Indonesia.",
    tags: ["Data Visualization","Python","Airflow","AnalyticDB","GeoJSON"],
    year: 2024,
    cover: "https://raw.githubusercontent.com/Kartu-Prakerja/laporan-penerima/main/img/img-cover-statistik-prakerja.png",
    featured: false,
    detail: {
      client: "Internal Ops",
      roles: [],
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
      gallery: [
        "https://uce3baf08fa0e76d731c72febd9f.previews.dropboxusercontent.com/p/thumb/ACykmBjCiXp4aGM28nzv5BWf0S0GYbGkVxpcJwOzhDeSApLYYDNtF7RmosOj8n0eEgcmcjEsUn12E3HG0rW9dtYsBw8FMc1TDULdTF_5WP-o5lI_fEx6Dk96NR9cYt6xbho3CRZGxYV8vO16m_sAVCT6P6R-dM4S5jICm60nn6C9I1X8iZoTzWWDlBAH7arEcRNa3C_2oae4faVwLJTdIcQW9xicpvIkSSHUV5lp0pIXoYdv6j-KedmDZ9skc_V7AiMR5XSVlP3m5GCT0hNSuaP2a1aRWcteqRMw62YcyJlD_PJaHErenj3UBSKDHqic6t2Sx7DmUGzYa0w1y3H6-kTXxSJ3W468ZNv3u0VjaMW3BRipLxZiFbzmKRT6QzSwkZg/p.png?is_prewarmed=true"
        ,"https://uc108c623bc05d368f5213e60f18.previews.dropboxusercontent.com/p/thumb/ACyG3WJKwGIdtojwHdsQB7kw9ceRSCNRtgFXm7PHt3eQ-3xhsIVM7YqXwzCwknMuudKHnU__RGnS0D74W6qZkPDw4J3NgLXsczsDpR0ngbBzvz7ENhhKakw-7s7h0f4PYsFPOUAjBlGnmeRftMf36ObNC-8rngR73eD-wP1cy8SULoUO2T2sCS0vMtoZCs3hLEy7ENvPDeXf7oF9iuLjCI0j4eybkHSBG9DCNe-RlFUiVy6zSEKfZ5SYxU4UzY-HlwryjMSihmqTsGlYAKPmWltDsUE027HViWCXdYH_aDbO4l3L9s--ocZm5JOwvMitc0BIMfowiBLOCCjP1gFNtL2d9Sh5y_J1NUSdDAp5cTvZSoaizEoGD6G7NgwK6SCMGww/p.png?is_prewarmed=true"
        ,"https://uc398f3f626cef62ae7fac22255a.previews.dropboxusercontent.com/p/thumb/ACyzGTMj2df_8fhm-SZkbmR3QSaG79WAhsSzMBrFyaDlh24osdbHf_xy2cVBww1uQgnXRP162HQEqpTawLsE4ruuRwcDvv_rMZPddtiMhb5fzQH6J7k5g3cKHSqvmSHkprUF5NXvlsq09ZfhNqAR3CNgmdK0cmoazx7pBPFCcdwPClKRh-IAnGaJQGm8VToWDcY0UF3Bs1ejRljyw-YaLYLd5rQP5FDWzuf9loag9kZfLQHpwltkEjvwXi4_G2iRdPHQT4WWDDtKJrW87dwsl-cg0z5-gxTSFGsnvYQ4rBi2HkuxAqAVJBAb8M58MRUTwioUwMQWnzeffHGgsMd7RpDGTVyOQmncNT9bwnOrRpBrTohdq7XnMw0Z_U16lRAmGCM/p.png?is_prewarmed=true"
      ],
      video: {
        mp4: "",
        webm: "https://dikaseva.com/asset/works/statistik-prakerja/statistik-prakerja.webm",
        poster: "https://dikaseva.com/asset/works/statistik-prakerja/thumb-statistik-prakerja-xs.webp",
      },
    },
  }

];

// normalize and export helpers
export const allProjects: Project[] = data.map((p) => ProjectSchema.parse(p));
export const featuredProjects = allProjects.filter((p) => p.featured);
export const slugs = allProjects.map((p) => p.slug);
export const getProjectBySlug = (slug: string) => allProjects.find((p) => p.slug === slug);
