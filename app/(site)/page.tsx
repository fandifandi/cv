// app/(site)/page.tsx
import ProjectsCarousel, { type ProjectItem } from "@/components/ProjectsCarousel";
import HomeProjectsGridSimple from "@/components/HomeProjectsGridSimple";
import ScrollHint from "@/components/ScrollHint";
import ContactSimple from "@/components/ContactSimple";
import ThemeIconToggle from "@/components/ThemeIconToggle";

import HomeProjectsStrip from "@/components/HomeProjectsStrip";
import { allProjects /* atau featuredProjects */ } from "@/lib/projects";

import TimelineSkills from "@/components/TimelineSkills";
import type { TimelineItem } from "@/components/TimelineInteractive";
import type { SkillDatum } from "@/components/SkillsBars";

import Link from "next/link";
import Section from "@/components/Section";
import ScrollSpy from "@/components/ScrollSpy";
import { personJsonLd } from "@/lib/seo";
import { LineMini, DonutMini, BarMini } from "@/components/MiniCharts";



export const dynamic = "force-static";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TL: TimelineItem[] = [
  { time: "2025 – Sekarang", title: "Senior Data Strategist", desc: "Standarisasi KPI & eksperimen lintas tim.", href: "/projects" },
  { time: "2021 – 2024",    title: "Analytics Engineer",     desc: "dbt + Airflow + BigQuery (cost-aware)." },
  { time: "2018 – 2021",    title: "Data Analyst",           desc: "Segmentasi pelanggan & dashboard operasional." },
];

// semua skill (default)
const ALL_SKILLS: SkillDatum[] = [
  { name: "Python", value: 90 },
  { name: "SQL", value: 92 },
  { name: "dbt", value: 85 },
  { name: "Airflow", value: 80 },
  { name: "BigQuery", value: 88 },
  { name: "Experimentation", value: 86 },
  { name: "Geospatial", value: 75 },
  { name: "Tableau", value: 78 },
  { name: "PowerBI", value: 70 },
];

// mapping subset per item timeline (index 0..)
const SKILLS_BY_INDEX: Record<number, SkillDatum[]> = {
  0: [
    { name: "Python", value: 88 },
    { name: "SQL", value: 90 },
    { name: "Experimentation", value: 92 },
    { name: "BigQuery", value: 86 },
  ],
  1: [
    { name: "dbt", value: 88 },
    { name: "Airflow", value: 82 },
    { name: "SQL", value: 92 },
    { name: "BigQuery", value: 88 },
  ],
  2: [
    { name: "Python", value: 85 },
    { name: "SQL", value: 88 },
    { name: "Tableau", value: 78 },
    { name: "PowerBI", value: 72 },
  ],
};



export default function HomePage() {
//   const ITEMS: ProjectItem[] = [
//   {
//     title: "Ride Demand Heatmap",
//     img: "https://images.unsplash.com/photo-1551281044-8b89e82f0a06?q=80&w=1200&auto=format&fit=crop",
//     chips: ["Geospatial", "Python", "PostGIS"],
//     desc: "Cluster hotspot → +12% match rate.",
//   },
//   {
//     title: "Checkout A/B Testing",
//     img: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop",
//     chips: ["BigQuery", "dbt", "GA4"],
//     desc: "+8% conversion.",
//   },
//   {
//     title: "Unified Metrics Layer",
//     img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
//     chips: ["Metrics", "Modeling", "Governance"],
//     desc: "SSOT KPI untuk 10+ tim.",
//   },
//   {
//     title: "Retention Cohorts",
//     img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
//     chips: ["Cohort", "Python", "SQL"],
//     desc: "Cohort curves → insight churn.",
//   },
// ];

// ... di dalam komponen HomePage, sebelum return:
const carouselItems: ProjectItem[] = [...allProjects]            // atau [...featuredProjects]
  .sort((a, b) => b.year - a.year)                               // terbaru dulu
  .map((p) => ({
    title: p.title,
    img: p.cover ?? "/covers/placeholder.png",
    chips: p.tags.slice(0, 3),                                   // batasi 3 badge biar rapih
    desc: p.excerpt,
    href: `/projects/${p.slug}`,                                 // klik → detail
  }));

  return (
    <>
      {/* SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Dot nav + scroll spy */}
      <div className="dotnav">
        <ScrollSpy items={SECTIONS} />
        {/* <ScrollHint hideAtId="contact" /> */}
      </div>

      <div className="fixed top-4 right-4 z-50">
      <ThemeIconToggle />
      </div>
      {/* SCROLLER container */}
      <main id="scroller" className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* ===== HERO ===== */}
        <section id="hero" className="snap-start min-h-screen flex items-center mesh pt-16">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl font-extrabold leading-[1.1]">
                  I turn raw <span className="text-emerald-400">data</span> into stories that drive{" "}
                  <span className="text-violet-400">impact</span>.
                </h1>
                <p className="mt-3 text-[color:var(--muted)] max-w-2xl">
                  5–8 tahun di analytics/experimentation. Membangun fondasi data, menjalankan A/B, dan menyajikan
                  insight yang bisa di-eksekusi.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#projects" className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-violet-500 font-semibold">
                    Explore Work
                  </a>
                  <a href="#contact" className="px-4 py-2 rounded-xl frost border border-[color:var(--border)]">
                    Contact
                  </a>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                <div className="text-2xl font-bold text-emerald-400">+8%</div>
                <div className="text-xs opacity-80">Checkout conversion</div>
              </div>
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                <div className="text-2xl font-bold text-emerald-400">-23%</div>
                <div className="text-xs opacity-80">Cost/query (BQ)</div>
              </div>
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                <div className="text-2xl font-bold text-emerald-400">5h → 1h</div>
                <div className="text-xs opacity-80">Insight turnaround</div>
              </div>
            </div>

              </div>

              {/* Dashboard cluster (placeholder tanpa Chart.js dulu) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[color:var(--muted)]">Traffic vs Conversion</div>
                    <div className="text-[10px] text-[color:var(--muted)]">Last 12 mo</div>
                  </div>
                  <LineMini
                    series={[
                      [12,14,13,16,18,21,20,23,22,24,26,28],  // Traffic
                      [1.2,1.3,1.1,1.5,1.7,1.9,1.8,2.0,2.1,2.2,2.4,2.6], // Conv
                    ]}
                    strokeClasses={["stroke-sky-400","stroke-emerald-400"]}
                  />
                </div>

  <div className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-4">
    <div className="text-sm text-[color:var(--muted)]">Channel Mix</div>
    <DonutMini values={[40,25,20,15]} />
  </div>

  <div className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-4">
    <div className="text-sm text-[color:var(--muted)]">Experiment Uplift</div>
    <BarMini values={[2,4.5,3.2,1.1]} />
  </div>
</div>

            </div>
          </div>

          <a href="#about" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-xs opacity-75">
            Scroll ↓
          </a>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="snap-start min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[320px,1fr] gap-8 items-start">
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop"
                className="rounded-2xl object-cover w-full h-[320px] border border-[color:var(--border)]"
                alt="Profile"
              />
              <article className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-6">
                <h2 className="text-3xl font-bold">Tentang Saya</h2>
                <p className="mt-3 opacity-90">
                  Analis yang fokus pada dampak. Pipeline (dbt/Airflow/SQL), definisi KPI, A/B testing, storytelling.
                </p>
                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">
                    Analytics Engineering
                  </div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">
                    Experimentation
                  </div>
                  <div className="rounded-xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-3">
                    BI & Storytelling
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">

                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                  <div className="text-2xl font-bold text-emerald-400">+8%</div>
                  <div className="text-xs opacity-80">Checkout conversion</div>
                </div>
                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                  <div className="text-2xl font-bold text-emerald-400">-23%</div>
                  <div className="text-xs opacity-80">Cost/query (BQ)</div>
                </div>
                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
                  <div className="text-2xl font-bold text-emerald-400">5h → 1h</div>
                  <div className="text-xs opacity-80">Insight turnaround</div>
                </div>
              </div>
              </article>
            </div>
          </div>
        </section>




        {/* // ===== GANTI section #timeline kamu dengan ini: */}
        <section id="timeline" className="snap-start min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <TimelineSkills items={TL} allSkills={ALL_SKILLS} skillsByIndex={SKILLS_BY_INDEX} />
          </div>
        </section>

        {/* // ... ganti section Projects kamu jadi: */}
        {/* <section id="projects" className="snap-start min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <ProjectsCarousel items={carouselItems} />
          </div>
        </section> */}

        <section id="projects" className="snap-start min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <HomeProjectsGridSimple projects={allProjects} />
          </div>
        </section>

        {/* ===== CONTACT (full width, no skills) ===== */}



        <section id="contact" className="snap-start min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <ContactSimple
              email="email@example.com"
              links={[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
                { label: "GitHub", href: "https://github.com/username" },
                { label: "Medium", href: "https://medium.com/@username" },
                { label: "X", href: "https://x.com/username" },
              ]}
            />
            <footer className="mt-10 text-xs text-[color:var(--muted)]">© {new Date().getFullYear()} Nama Kamu</footer>
          </div>
        </section>
      </main>
    </>
  );
}
