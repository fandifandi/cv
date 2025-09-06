// components/HomeProjectsStrip.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProjectsCarousel, { type ProjectItem } from "@/components/ProjectsCarousel";

type Project = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  year: number;
  cover?: string;
  featured?: boolean;
};

export default function HomeProjectsStrip({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<string | null>(null);

  // semua tag unik + hitungan
  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [projects]);

  // filter by tag (kalau ada)
  const filtered = useMemo(
    () => (tag ? projects.filter((p) => p.tags.includes(tag)) : projects),
    [projects, tag]
  );

  const items: ProjectItem[] = useMemo(
    () =>
      [...filtered]
        .sort((a, b) => b.year - a.year)
        .map((p) => ({
          title: p.title,
          img: p.cover ?? "/covers/placeholder.png",
          chips: p.tags.slice(0, 3),
          desc: p.excerpt,
          href: `/projects/${p.slug}`,
        })),
    [filtered]
  );

  return (
    <div className="w-full">
      {/* Bar: filter chips + See all link */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={[
              "px-3 py-1.5 rounded-full text-sm border transition",
              tag
                ? "bg-[color:var(--bg)] border-[color:var(--border)] hover:bg-[color:var(--card)]"
                : "bg-emerald-500 text-black border-emerald-400"
            ].join(" ")}
            aria-pressed={tag === null}
            title="Show all projects"
          >
            All <span className="ml-1 opacity-75">({projects.length})</span>
          </button>

          {tagCounts.map(([t, count]) => {
            const active = t === tag;
            return (
              <button
                key={t}
                onClick={() => setTag(active ? null : t)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm border transition",
                  active
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-[color:var(--bg)] border-[color:var(--border)] hover:bg-[color:var(--card)]"
                ].join(" ")}
                aria-pressed={active}
                title={`Filter by ${t}`}
              >
                {t} <span className="ml-1 opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        <Link
          href="/projects"
          className="shrink-0 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
        >
          See all →
        </Link>
      </div>

      {/* Carousel (judul & panah sudah di dalam komponen) */}
      <div className="mt-5">
        <ProjectsCarousel items={items} />
      </div>
    </div>
  );
}
