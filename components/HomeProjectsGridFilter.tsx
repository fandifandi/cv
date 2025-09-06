// components/HomeProjectsGridFilter.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Project = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  year: number;
  cover?: string;
};

type Card = {
  title: string;
  href?: string;
  desc: string;
  img: string;
  chips: string[];
};

export default function HomeProjectsGridFilter({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<string | null>(null);

  // daftar tag + hitungan
  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [projects]);

  // filter projects
  const filtered = useMemo(
    () => (tag ? projects.filter((p) => p.tags.includes(tag)) : projects),
    [projects, tag]
  );

  // ambil terbaru 6
  const top6 = useMemo(
    () => [...filtered].sort((a, b) => b.year - a.year).slice(0, 6),
    [filtered]
  );

  const cards: Card[] = top6.map((p) => ({
    title: p.title,
    href: `/projects/${p.slug}`,
    desc: p.excerpt,
    img:
      p.cover ??
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    chips: p.tags.slice(0, 4), // biar rapi, max 4 chips (2x2)
  }));

  // placeholder jika < 6
  const placeholders: Card[] = [
    {
      title: "Coming Soon — Case Study",
      desc: "Placeholder slot untuk project berikutnya.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
      chips: ["Design", "Analytics", "Ship", "Research"],
    },
    {
      title: "Coming Soon — Data App",
      desc: "Reserved card untuk showcase tambahan.",
      img: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop",
      chips: ["Python", "SQL", "DBT", "BI"],
    },
    {
      title: "Coming Soon — Experiment X",
      desc: "Slot untuk eksperimen / POC.",
      img: "https://images.unsplash.com/photo-1551281044-8b89e82f0a06?q=80&w=1200&auto=format&fit=crop",
      chips: ["A/B", "Uplift", "Guardrail", "Metrics"],
    },
  ];
  const need = Math.max(0, 6 - cards.length);
  const list = [...cards, ...placeholders.slice(0, need)];

  return (
    <div className="w-full">
      {/* Header + See all */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link
          href="/projects"
          className="shrink-0 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
        >
          See all →
        </Link>
      </div>

      {/* FILTER TAGS — grid auto-fit: chip lebar sama → rata kiri–kanan */}
      <div
        className="mt-4 grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        }}
        role="group"
        aria-label="Filter by tags"
      >
        <button
          onClick={() => setTag(null)}
          aria-pressed={tag === null}
          className={[
            "px-3 py-1.5 rounded-full text-sm border transition w-full",
            tag === null
              ? "bg-emerald-500 text-black border-emerald-400"
              : "bg-[color:var(--bg)] border-[color:var(--border)] hover:bg-[color:var(--card)]",
          ].join(" ")}
          title="Show all projects"
        >
          All <span className="ml-1 opacity-75">({projects.length})</span>
        </button>

        {tagCounts.map(([t, cnt]) => {
          const active = tag === t;
          return (
            <button
              key={t}
              onClick={() => setTag(active ? null : t)}
              aria-pressed={active}
              title={`Filter by ${t}`}
              className={[
                "px-3 py-1.5 rounded-full text-sm border transition w-full",
                active
                  ? "bg-emerald-500 text-black border-emerald-400"
                  : "bg-[color:var(--bg)] border-[color:var(--border)] hover:bg-[color:var(--card)]",
              ].join(" ")}
            >
              <span className="truncate">{t}</span>{" "}
              <span className="ml-1 opacity-75">({cnt})</span>
            </button>
          );
        })}
      </div>

      {/* GRID 2 row × 3 col */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((c, i) => {
          const CardInner = (
            <article className="group rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)] hover:shadow-glass transition h-full flex flex-col">
              {/* pakai <img> biar gak perlu config domain Next/Image untuk placeholder unsplash */}
              <img src={c.img} alt={c.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)] line-clamp-2">{c.desc}</p>

                {/* TAGS di item: tetap AS IS (grid 2 kolom supaya rapi bila 2 baris) */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  {c.chips.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)] text-center"
                      title={t}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
          return c.href ? (
            <Link key={c.title + i} href={c.href} className="block">
              {CardInner}
            </Link>
          ) : (
            <div key={c.title + i}>{CardInner}</div>
          );
        })}
      </div>
    </div>
  );
}
