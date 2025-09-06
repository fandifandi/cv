// components/HomeProjectsGridSimple.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { asset } from "@/lib/asset"; // <-- import

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

export default function HomeProjectsGridSimple({ projects }: { projects: Project[] }) {
  const router = useRouter();

  // urut terbaru → ambil 6
  const sorted = [...projects].sort((a, b) => b.year - a.year);
  const taken: Card[] = sorted.slice(0, 6).map((p) => ({
    title: p.title,
    href: `/projects/${p.slug}`,
    desc: p.excerpt,
    img:
      p.cover ??
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    chips: p.tags.slice(0, 4), // max 4 chip (2x2)
  }));

  // placeholder kalau kurang dari 6
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
      title: "Coming Soon — Experiment Z",
      desc: "Slot untuk eksperimen / POC.",
      img: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop",
      chips: ["A/B", "Uplift", "Guardrail", "Metrics"],
    },
  ];
  const need = Math.max(0, 6 - taken.length);
  const list = [...taken, ...placeholders.slice(0, need)];

  return (
    <div className="w-full">
      {/* Header + See all */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link href="/projects" className="shrink-0 text-sm ...">See all →</Link>

      </div>

      {/* Grid 2 row × 3 col */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((c, i) => (
          <div
            key={c.title + i}
            role="button"
            tabIndex={0}
            onClick={() => c.href && router.push(c.href)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && c.href) {
                e.preventDefault();
                router.push(c.href);
              }
            }}
            className="group rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)] hover:shadow-glass transition h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            aria-label={`Open project ${c.title}`}
          >
            <img src={asset(c.img)} // src={c.img} 

                  alt={c.title} loading="lazy" className="h-44 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted)] line-clamp-2">{c.desc}</p>

              {/* TAGS (bukan <a> untuk hindari nested anchor) */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                {c.chips.map((t) => (
                  <button
                    key={t}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects?tag=${encodeURIComponent(t)}`);
                    }}
                    className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)] text-center hover:bg-[color:var(--card)]"
                    title={`Filter by ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
