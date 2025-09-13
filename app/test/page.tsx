// app/(projects)/advanced-data-eng/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FeatureCollection } from "geojson";
// Install deps in your Next.js app:
// npm i maplibre-gl @types/maplibre-gl
import maplibregl, { Map, Popup } from "maplibre-gl";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ""; // e.g. "/cv"
const DATA_URL = `${BASE}/data/trips.geojson`;

/**
 * Expected GeoJSON schema (Point features):
 * {
 *   "type":"FeatureCollection",
 *   "features":[{
 *     "type":"Feature",
 *     "properties":{
 *        "id": 12345,                 // trip id
 *        "ts": 1735689600,            // unix seconds (for filter by date)
 *        "smoking": 0,                 // 0/1
 *        "seats": 2,
 *        "price": 75000,
 *        "city": "Jakarta",
 *        "route": "JKT → BDG"        // label
 *     },
 *     "geometry":{"type":"Point","coordinates":[106.8456,-6.2088]}
 *   }]
 * }
 */

export default function AdvancedDataEngineeringProjectPage() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<Popup | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [dateFrom, setDateFrom] = useState<string | "">("");
  const [dateTo, setDateTo] = useState<string | "">("");
  const [smokingOpt, setSmokingOpt] = useState<"any" | "yes" | "no">("any");

  // Build MapLibre filter expression from UI state
  const layerFilter = useMemo(() => {
    const fromEpoch = dateFrom ? Math.floor(new Date(dateFrom).getTime() / 1000) : 0;
    const toEpoch = dateTo ? Math.floor(new Date(dateTo).getTime() / 1000) : 4102444800; // year 2100

    // smoking filter
    let smokingExpr: any = [">=", ["get", "smoking"], 0];
    if (smokingOpt === "yes") smokingExpr = ["==", ["get", "smoking"], 1];
    if (smokingOpt === "no") smokingExpr = ["==", ["get", "smoking"], 0];

    const dateExpr: any = [
      "all",
      [">=", ["get", "ts"], fromEpoch],
      ["<=", ["get", "ts"], toEpoch],
    ];

    return ["all", smokingExpr, dateExpr] as any;
  }, [dateFrom, dateTo, smokingOpt]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          // Simple free raster OSM tiles; OK for low-volume demo
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution:
              '© OpenStreetMap contributors | Demo basemap (consider using your own tiles for production)'
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      } as any,
      center: [106.8456, -6.2088], // Jakarta
      zoom: 5,
      pitch: 0,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }));

    map.on("load", () => {
      // Source: your prebuilt GeoJSON (place at public/data/trips.geojson)
      map.addSource("trips", {
        type: "geojson",
        data: DATA_URL,
        generateId: true,
      });

      // Heatmap for low zoom
      map.addLayer({
        id: "trip-heat",
        type: "heatmap",
        source: "trips",
        maxzoom: 12,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["coalesce", ["get", "weight"], 1],
            0,
            0,
            5,
            1,
          ],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 0.6, 12, 1.2],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0,0,0,0)",
            0.2,
            "#84d3", // teal-ish
            0.4,
            "#1EE0",
            0.6,
            "#0BB",
            0.8,
            "#087",
            1,
            "#035"
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 8, 12, 24],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0.7, 12, 0],
        },
        filter: ["all"],
      });

      // Points for high zoom
      map.addLayer({
        id: "trip-points",
        type: "circle",
        source: "trips",
        minzoom: 10,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 3, 16, 9],
          "circle-color": [
            "case",
            ["==", ["get", "smoking"], 1],
            "#12b886", // green if smoking allowed
            "#4dabf7", // blue otherwise
          ],
          "circle-stroke-color": "#0f172a",
          "circle-stroke-width": 0.6,
          "circle-opacity": 0.85,
        },
        filter: ["all"],
      });

      // Popup on click
      map.on("click", "trip-points", (e) => {
        const f = e.features?.[0];
        if (!f) return;
        const p = f.properties as any;
        const html = `
          <div style="font: 12px/1.3 system-ui, sans-serif;">
            <div style="font-weight:600;margin-bottom:4px;">Trip</div>
            <div><b>Route:</b> ${p?.route ?? "-"}</div>
            <div><b>City:</b> ${p?.city ?? "-"}</div>
            <div><b>Price:</b> Rp ${Number(p?.price ?? 0).toLocaleString("id-ID")}</div>
            <div><b>Seats:</b> ${p?.seats ?? "-"}</div>
            <div><b>Smoking:</b> ${p?.smoking == 1 ? "Yes" : "No"}</div>
            <div><b>Departs:</b> ${p?.ts ? new Date(p.ts * 1000).toLocaleString("id-ID") : "-"}</div>
          </div>`;
        const [lon, lat] = (f.geometry as any).coordinates as [number, number];
        popupRef.current?.remove();
        popupRef.current = new maplibregl.Popup({ closeButton: true })
          .setLngLat([lon, lat])
          .setHTML(html)
          .addTo(map);
      });

      setLoaded(true);
    });

    mapRef.current = map;
    return () => {
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Apply filters whenever UI changes
  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const map = mapRef.current;
    map.setFilter("trip-heat", layerFilter as any);
    map.setFilter("trip-points", layerFilter as any);
  }, [loaded, layerFilter]);

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Advanced Data Engineering — Trip Heatmap</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Lakehouse on a laptop → ELT, dbt tests, and an interactive map. This demo reads a
          prebuilt GeoJSON (<code>/data/trips.geojson</code>) so it runs entirely static on GH Pages.
        </p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">From date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-xl border px-3 py-2 bg-[color:var(--card)]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">To date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-xl border px-3 py-2 bg-[color:var(--card)]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">Smoking</label>
          <select
            value={smokingOpt}
            onChange={(e) => setSmokingOpt(e.target.value as any)}
            className="rounded-xl border px-3 py-2 bg-[color:var(--card)]"
          >
            <option value="any">Any</option>
            <option value="yes">Allowed</option>
            <option value="no">Not allowed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setDateFrom("");
              setDateTo("");
              setSmokingOpt("any");
            }}
            className="px-3 py-2 rounded-xl border bg-[color:var(--card)] hover:bg-[color:var(--card)]/80"
          >
            Reset
          </button>
          <a
            href={`${BASE}/dbt-docs/index.html`}
            className="px-3 py-2 rounded-xl border bg-emerald-600 text-white hover:bg-emerald-500"
          >
            dbt Docs
          </a>
        </div>
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className="w-full h-[68vh] rounded-2xl overflow-hidden border"
      />

      <section className="grid gap-2 text-sm text-zinc-500">
        <p>
          <b>Tips:</b> zoom in to see individual trips (colored by smoking policy). Click a point
          to inspect route, price, seats, and departure time.
        </p>
        <details>
          <summary className="cursor-pointer">How it works (short)</summary>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Pipeline generates <code>trips.geojson</code> from your warehouse (Neon/Postgres).</li>
            <li>dbt tests run in CI; summaries are published to <code>/dbt-docs/</code>.</li>
            <li>Page hosts statically (GH Pages/Netlify). No server needed.</li>
          </ul>
        </details>
      </section>
    </div>
  );
}

/* =============================================================
   Python helper — generate demo GeoJSON from CSV/DB
   Save as pipeline/ingest/export_geojson.py and run via `make seed-geojson`
   Requires: pandas, psycopg2-binary (if reading Neon), or just faker for synthetic.
============================================================= */

// --- Example (pseudocode in TS file for reference):
// from datetime import datetime, timedelta
// import json, random, os
// import pandas as pd
// from faker import Faker
// fake = Faker()
// 
// CITIES = [
//   ("Jakarta", -6.2088, 106.8456),
//   ("Bandung", -6.9175, 107.6191),
//   ("Surabaya", -7.2575, 112.7521),
//   ("Yogyakarta", -7.7972, 110.3705),
//   ("Semarang", -6.9667, 110.4167),
// ]
// 
// def jitter(lat, lon):
//   return lat + random.uniform(-0.15, 0.15), lon + random.uniform(-0.15, 0.15)
// 
// def build_geojson(n=10000):
//   base = datetime.utcnow() - timedelta(days=60)
//   feats = []
//   for i in range(n):
//     city, lat, lon = random.choice(CITIES)
//     jlat, jlon = jitter(lat, lon)
//     ts = int((base + timedelta(minutes=random.randint(0, 60*24*60))).timestamp())
//     smoking = random.choice([0, 1])
//     seats = random.choice([1,2,3])
//     price = random.choice([35000, 50000, 75000, 100000, 150000])
//     dest = random.choice([c for c in CITIES if c[0] != city])[0]
//     feats.append({
//       "type":"Feature",
//       "properties": {"id": i+1, "ts": ts, "smoking": smoking, "seats": seats, "price": price, "city": city, "route": f"{city} → {dest}", "weight": 1},
//       "geometry": {"type":"Point","coordinates":[jlon, jlat]}
//     })
//   return {"type":"FeatureCollection","features":feats}
// 
// if __name__ == "__main__":
//   out = build_geojson(20000)
//   out_dir = os.path.join("frontend", "public", "data")
//   os.makedirs(out_dir, exist_ok=True)
//   with open(os.path.join(out_dir, "trips.geojson"), "w") as f:
//     json.dump(out, f)

/* =============================================================
   Neon (Postgres) — simple aggregation without PostGIS (optional API)
============================================================= */

// Example SQL for a bbox + day filter using coarse lat/lon bins (works without PostGIS):
// CREATE MATERIALIZED VIEW IF NOT EXISTS trip_bins AS
// SELECT
//   date_trunc('day', departure_time) AS day,
//   round(pickup_lat::numeric, 2)     AS lat_bin,
//   round(pickup_lon::numeric, 2)     AS lon_bin,
//   count(*)                           AS trips,
//   avg(price)                         AS avg_price,
//   sum(seats_available)               AS seats
// FROM rides
// WHERE departure_time >= now() - interval '90 days'
// GROUP BY 1,2,3;
// 
// -- Example API query (FastAPI/Next API Route):
// -- SELECT * FROM trip_bins
// -- WHERE day = $1 AND lat_bin BETWEEN $lat_min AND $lat_max AND lon_bin BETWEEN $lon_min AND $lon_max;

/* =============================================================
   Makefile (snippets)
============================================================= */

// seed-geojson:
// 	python3 pipeline/ingest/export_geojson.py
// dbt:
// 	dbt run && dbt test && dbt docs generate
// serve-docs:
// 	python3 -m http.server -d target 8082
