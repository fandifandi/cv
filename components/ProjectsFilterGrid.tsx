// components/ProjectsFilterGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Project = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  year: number;
  cover?: string;
  featured?: boolean;
};

export default function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b)),
    [projects]
  );

  const tag = search.get("tag"); // current selected tag (via ?tag=...)
  const filtered = useMemo(
    () => (tag ? projects.filter((p) => p.tags.includes(tag)) : projects),
    [projects, tag]
  );

  const setTag = (next: string | null) => {
    const qs = next ? `?tag=${encodeURIComponent(next)}` : "";
    router.replace(`${pathname}${qs}`, { scroll: false });
  };

  return (
    <div className="w-full">
      {/* Tag chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTag(null)}
          className={[
            "px-3 py-1.5 rounded-full text-sm border transition",
            tag
              ? "bg-[color:var(--bg)] border-[color:var(--border)] hover:bg-[color:var(--card)]"
              : "bg-emerald-500 text-black border-emerald-400"
          ].join(" ")}
        >
          All
          <span className="ml-1 opacity-75">({projects.length})</span>
        </button>

        {allTags.map((t) => {
          const active = t === tag;
          const count = projects.filter((p) => p.tags.includes(t)).length;
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
            >
              {t}
              <span className="ml-1 opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Count + reset hint */}
      <div className="mt-3 text-sm text-[color:var(--muted)]">
        Showing <span className="font-semibold text-[color:var(--fg)]">{filtered.length}</span> of{" "}
        {projects.length} projects{tag ? (
          <>
            {" "}for tag <span className="font-semibold text-[color:var(--fg)]">{tag}</span>.{" "}
            <button onClick={() => setTag(null)} className="underline hover:no-underline">
              Clear filter
            </button>
          </>
        ) : "."}
      </div>

      {/* Grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)] hover:shadow-glass transition"
          >
            <div className="relative h-44">
              <Image
                src={p.cover ?? "/covers/placeholder.png"}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-[color:var(--muted)] line-clamp-2">{p.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                {p.tags.map((t) => (
                  <button
                    key={t}
                    onClick={(e) => {
                      e.preventDefault();
                      setTag(t);
                    }}
                    className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)] hover:bg-[color:var(--card)]"
                    title={`Filter by ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
