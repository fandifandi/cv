// app/(site)/projects/(detail)/dashboard-perlinsos/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";
import VideoBasic from "@/components/VideoBasic";

export const dynamic = "force-static";

const SLUG = "dashboard-perlinsos";

export async function generateMetadata() {
  const p = getProjectBySlug(SLUG);
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

const STEPS = [
  "Define metrics & targets",
  "Model the region hierarchy",
  "Aggregate registrations & agents",
  "Build map-first drill-down",
  "Publish a privacy-safe public view",
];

// Snapshot figures — all visible on the public dashboard (16 Nov 2026)
const METRICS = [
  { value: "22.7M", label: "Households registered" },
  { value: "23.4%", label: "National coverage (of 96.9M households)" },
  { value: "1.36M", label: "Registration agents" },
  { value: "51.7%", label: "Agents actively registering" },
  { value: "34", label: "Agent roles tracked" },
  { value: "5", label: "Drill-down levels, national → village" },
];

const FEATURES = [
  {
    title: "Map-first drill-down",
    body: "A choropleth that goes national → province → regency/city → district → village, with hover cards and breadcrumbs that keep you oriented.",
  },
  {
    title: "Instant region search",
    body: "“Cari Wilayah” jumps to any province, regency/city, or district by name — no clicking through the map.",
  },
  {
    title: "Coverage vs. population",
    body: "Every region ranked by share of households registered, measured against a 50% projection line.",
  },
  {
    title: "Channel & agent mix",
    body: "Self-service vs. agent-assisted registrations, agents by role, and how many are actually active.",
  },
  {
    title: "Trends & welfare deciles",
    body: "Daily registrations stacked by channel with per-channel toggles, plus the welfare-decile (Desil) profile of registrants.",
  },
  {
    title: "Eligibility at every level",
    body: "BPNT & PKH outcomes summarised per region in a sortable, filterable table with CSV export — and a household-level lookup behind it.",
  },
];

function FeatureGrid() {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className="rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/10 p-5 transition-colors hover:border-emerald-400/60"
        >
          <div className="text-sm font-semibold">{f.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const p = getProjectBySlug(SLUG);
  if (!p) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd({ title: p.title, slug: p.slug, year: p.year })),
        }}
      />
      <ProjectLayout
        project={p}
        quick={{
          // TODO(draft): isi roles yang sebenarnya
          roles: ["Data Engineering", "Data Visualization"],
          steps: STEPS,
          metrics: METRICS,
          learnings: [
            "Privacy has to live in the data layer, not the UI — hidden sections should never reach the browser.",
            "A single region hierarchy shared by map, search, and tables keeps every view consistent at every level.",
            "Coverage against population tells a far more honest story than raw registration counts.",
          ],
        }}
      >
        <h2>Overview</h2>
        <p>
          <strong>Perlinsos Analytics</strong> turns millions of social-assistance (
          <em>bantuan sosial</em>) registrations into one live picture of national progress.
          Households register through Perlinsos Digital (<em>perlindungan sosial</em>, social
          protection) — on their own via <em>Perlinsos Mandiri</em>, or assisted by field agents via{" "}
          <em>Perlinsos Agen</em>: PKH facilitators, local government staff, village officials, and
          community volunteers. The dashboard shows where that effort lands, from the whole country
          down to a single village.
        </p>

        <h2>The challenge</h2>
        <p>
          Registration runs through two channels, dozens of agent roles, and five levels of
          government. Decision-makers needed to see coverage against population — not just raw
          counts — at any level, while the public deserved transparency without exposing sensitive
          eligibility data or personal records.
        </p>

        <h2>What it does</h2>
        <FeatureGrid />

        <h2>Privacy by design</h2>
        <ul>
          <li>
            <strong>Two audiences, one product:</strong> a read-only public landing with headline
            figures, and an authenticated internal dashboard for program teams.
          </li>
          <li>
            <strong>Admin-controlled publishing:</strong> admins choose per section what the public
            sees and preview it before it goes live.
          </li>
          <li>
            <strong>Sensitive data never leaves the server:</strong> when a section such as the
            eligibility breakdown is switched off, its figures are not sent to the public site at
            all — not merely hidden.
          </li>
          <li>
            <strong>Masked identifiers:</strong> household-level eligibility results show NIK and
            family-card numbers partially masked.
          </li>
        </ul>

        <h2>Who it serves</h2>
        <ul>
          <li>Program leadership tracking national coverage against the 50% projection target.</li>
          <li>Regional governments benchmarking their province or regency against peers.</li>
          <li>Program teams monitoring which channels and agent roles drive registrations.</li>
          <li>The public, through a transparent, read-only landing page.</li>
        </ul>

        {/* TODO(draft): tambah "Under the hood" (stack, pipeline, refresh) & Outcomes kalau datanya ada */}

        <h2>See it in action</h2>

        <h3>Public dashboard</h3>
        <VideoBasic
          webm={p.detail?.video?.webm ?? ""}
          poster={p.detail?.video?.poster ?? ""}
          autoPlay
          muted
          loop
        />

        <h3>Internal dashboard — drill-down</h3>
        <p>
          From the national map into provinces and regencies, then down to eligibility results.
          Personal data, eligibility figures, and admin settings are blurred in this recording.
        </p>
        <VideoBasic
          webm="/cv/assets/dashboard-perlinsos/perlinsos-loggedin.webm"
          poster="/cv/assets/dashboard-perlinsos/perlinsos-loggedin-poster.webp"
        />

        <h3>Region search</h3>
        <p>
          Search &ldquo;badung&rdquo; to open Badung, then &ldquo;kuta sela&rdquo; to land on Kuta
          Selatan and its village-level table — in a few keystrokes.
        </p>
        <VideoBasic
          webm="/cv/assets/dashboard-perlinsos/perlinsos-search.webm"
          poster="/cv/assets/dashboard-perlinsos/perlinsos-search-poster.webp"
        />
      </ProjectLayout>
    </>
  );
}
