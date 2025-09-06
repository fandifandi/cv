import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";


export const dynamic = "force-static";
const SLUG = "rmc-app";

export async function generateMetadata() {
  const p = getProjectBySlug(SLUG);
  const cover = p?.cover ? [{ url: p.cover, width: 1200, height: 630 }] : undefined;

  const title = "Sejalan (Setujuan) — Carpooling Analytics & Ops Platform";
  const description =
    "Find People Going Your Way. A transport alternative that pairs demand with available seats in real time. Search is tuned for route overlap and time windows to surface the best companions first.";

  return {
    title,
    description,
    alternates: { canonical: `/projects/${SLUG}` },
    openGraph: { title, description, images: cover },
    twitter: { card: "summary_large_image", title, description, images: cover },
  };
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
          client: "Personal Project",
          roles: ["WebApp Development", "Data Engineering","Full-Stack Development"],
          website: "https://routemate.pages.dev/",

          stackExtra: ["PostgreSQL","Firebase", "Google Cloud Run", "GeoJSON", "Leaflet Map", "NeonDB"], // Kepler.gl/Deck.gl

          responsibilities: [
            "Defined trip & matching metrics (search→match→board→arrive) and guardrails.",
            "Modeled rider/driver events, cancellations, and ETA deltas for weekly ops reviews.",
            "Built demand/supply heatmaps and route density tiles for real-time ops.",
            "Implemented cost controls in BigQuery (partitioning, clustering, pruning, templated limits).",
            "Enabled self-serve dashboards for ops, CX, and city managers.",
          ],
          steps: [
            "Align success metrics",
            "Instrument trip & matching",
            "Model facts & cohorts (dbt)",
            "Publish maps & dashboards",
            "Review & optimize ops",
          ],
          // metrics: [] // leave empty if you don’t want to show public numbers
        }}
      >
        <h2>Overview</h2>
        <p>
          Sejalan is a same-direction carpooling app. Riders post routes or search
          trips; drivers publish seats on planned routes. The work here built the analytics backbone for trip matching,
          safety & ETA telemetry, and day-to-day operational visibility.
        </p>

        <h2>Who uses it</h2>
        <ul>
          <li><strong>Riders</strong> — find affordable shared rides on routes they already take.</li>
          <li><strong>Drivers</strong> — fill empty seats, plan pickups, and keep good on-time stats.</li>
          <li><strong>Ops & City Managers</strong> — monitor demand hot spots, supply gaps, cancellations, and SLAs.</li>
          <li><strong>Support</strong> — investigate trips with consistent event timelines and reasons.</li>
        </ul>

        <h2>Core flows</h2>
        <ul>
          <li><strong>Search & Match:</strong> rider search → candidate drivers → seat request → driver accept/decline.</li>
          <li><strong>Trip Lifecycle:</strong> meet-up ETA, board, en-route pings, arrive; optional mid-trip pickup.</li>
          <li><strong>Trust & Safety:</strong> identity verification flags, rating thresholds, and cancellation reasons.</li>
        </ul>

        <h2>Data model & metrics</h2>
        <ul>
          <li><strong>Facts:</strong> <em>trip_fact</em>, <em>match_fact</em>, <em>cancellation_fact</em>, <em>ping_fact</em> with stable IDs/timestamps/geohash.</li>
          <li><strong>Core metrics:</strong> search→match rate, match→board, p50/p95 wait time, on-time arrival, cancellation by reason/segment, seat utilization.</li>
          <li><strong>Cohorts:</strong> first-trip conversion, week-over-week rider/driver retention, route-level repeats.</li>
        </ul>

        <h2>Architecture</h2>
        <ol>
          <li><strong>Event design:</strong> normalized trip/match/ping schemas; consistent status transitions and reasons.</li>
          <li><strong>Modeling (dbt):</strong> incremental tables for facts & rollups; tests to keep contracts stable.</li>
          <li><strong>Maps:</strong> pre-aggregated tiles (heat/density) for demand & common routes; smooth on low-end devices.</li>
          <li><strong>Dashboards:</strong> fulfillment, wait times, cancellations, and route performance; filters by city/route/time.</li>
          <li><strong>Cost controls:</strong> partition/cluster strategies, scheduled pruning, and query templates with bounded scans.</li>
        </ol>

        <h2>Ops loops unlocked</h2>
        <ul>
          <li><strong>Dispatch:</strong> monitor hot spots, rebalance drivers, and adjust pick-up windows.</li>
          <li><strong>Supply planning:</strong> route-level seat utilization & repeat demand to recruit where it matters.</li>
          <li><strong>Quality:</strong> consistent cancellation taxonomy reveals actionable fixes (timing, meet-up location, pricing).</li>
        </ul>

        <h2>What shipped</h2>
        <ul>
          <li>Production dbt models for trips/matches/cancellations with documented tests.</li>
          <li>City & route dashboards plus real-time demand tiles for ops.</li>
          <li>Playbooks for weekly reviews and query cost guardrails.</li>
        </ul>

        <h2>Learnings</h2>
        <ul>
          <li>Trip/match events must be boringly consistent—everything else gets easier after that.</li>
          <li>Pre-aggregated geo tiles beat raw queries for cost and UX at scale.</li>
          <li>Dashboards that answer “where and when to act” reduce support back-and-forth.</li>
        </ul>

        <h2>Next</h2>
        <ul>
          <li>Pricing & meet-up window experiments with holdouts.</li>
          <li>Driver quality scoring blended from cancellations, on-time, and rider feedback.</li>
          <li>Supply nudges (messaging) based on predicted demand gaps by hour/zone.</li>
        </ul>
      </ProjectLayout>
    </>
  );
}
