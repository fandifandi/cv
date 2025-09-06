// app/(site)/projects/(detail)/analytics-pkj/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";
import VideoBasic from "@/components/VideoBasic";

export const dynamic = "force-static";

export async function generateMetadata() {
  const p = getProjectBySlug("analytics-pkj");
  if (!p) return {};
  return {
    title: p.seo?.title ?? p.title,
    description: p.seo?.description ?? p.excerpt,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      images: p.cover ? [{ url: p.cover, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default function Page() {
  const p = getProjectBySlug("analytics-pkj");
  if (!p) notFound();

  // Short & general steps for the Process timeline
  const STEPS = [
    "Frame questions & audiences",
    "Model geography & demographics",
    "ETL & anonymize sensitive fields",
    "Pre-aggregate tiles & cache",
    "Build web app with filters",
    "Publish & document",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd({ title: p.title, slug: p.slug, year: p.year })
          ),
        }}
      />
      <ProjectLayout
        project={p}
        quick={{
          client: "PMO Prakerja — Coordinating Ministry for the Economy",
          roles: ["Data Engineering", "Data Visualization"],
          website: "https://statistik.prakerja.go.id",
          stackExtra: ["GIS", "TypeScript", "Airflow", "Docker", "GeoJSON", "AnalyticDB"],
          steps: STEPS,
        }}
      >
        <h2>Overview</h2>
        <p>
          A public, map-first data visualization for Indonesia’s <em>Kartu Prakerja</em> program
          (2020–2024). The site makes beneficiary statistics accessible to non-technical audiences—
          governors, mayors, policy staff, journalists, and researchers—so they can answer
          questions about participation, demographics, training choices, and incentives in their
          regions without requesting custom reports.
        </p>

        <h2>Who it serves</h2>
        <ul>
          <li>Policy makers and staff (Governor/Mayor offices) who need quick, reliable briefings.</li>
          <li>Journalists & researchers who require credible, citable figures with clear context.</li>
          <li>Internal ops & comms teams for consistent numbers across press releases and decks.</li>
        </ul>

        <h2>Design principles</h2>
        <ul>
          <li><strong>Public by default:</strong> no login, shareable permalinks.</li>
          <li><strong>Mobile-first:</strong> works smoothly on modest devices and connections.</li>
          <li><strong>Self-serve:</strong> filters for province/city, period, demographics, and training areas.</li>
          <li><strong>Exportable:</strong> one-click downloads for charts/maps and CSV where appropriate.</li>
          <li><strong>Single source of truth:</strong> definitions and footnotes visible next to the data.</li>
        </ul>

        <h2>Data pipeline</h2>
        <ul>
          <li>Ingest curated program tables from the warehouse (scheduled via Airflow).</li>
          <li>Aggregate to privacy-safe levels (province/city) and anonymize sensitive fields.</li>
          <li>Validate against control totals; tag each release with schema & coverage metadata.</li>
          <li>Pre-compute vector tiles/JSON summaries and cache for fast, low-cost delivery.</li>
          <li>Serve to a lightweight web app with client-side filters and URL state.</li>
        </ul>

        <h2>Key features</h2>
        <ul>
          <li>Interactive map with time window controls and geographic drill-downs.</li>
          <li>Demographic slices (age, gender, education) and training categories.</li>
          <li>Clean footnotes, definitions, and update timestamps for transparency.</li>
          <li>Download: PNG/SVG for visuals and CSV for tabular summaries.</li>
          <li>Permalinks for sharing exactly what you’re viewing.</li>
        </ul>

        <h2>Outcomes</h2>
        <ul>
          <li>Reduced ad-hoc data requests; external stakeholders self-serve most needs.</li>
          <li>Faster, more consistent numbers used across ministries and local governments.</li>
          <li>Clearer public communication—media can cite the same figures as the program.</li>
        </ul>

        <h2>Video</h2>
        <VideoBasic
          webm={p.detail?.video?.webm ?? ""}
          poster={p.detail?.video?.poster ?? ""}
          autoPlay={true}
        />
      </ProjectLayout>
    </>
  );
}
