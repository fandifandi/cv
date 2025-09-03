// components/ProjectsCarousel.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";

export type ProjectItem = {
  title: string;
  img: string;
  chips: string[];
  desc: string;
  href?: string; // <— tambahkan
};

export default function ProjectsCarousel({ items }: { items: ProjectItem[] }) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (delta: number) => stripRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scrollBy(-360)} className="px-3 py-1.5 rounded-lg frost border border-[color:var(--border)]">←</button>
          <button onClick={() => scrollBy(360)} className="px-3 py-1.5 rounded-lg frost border border-[color:var(--border)]">→</button>
        </div>
      </div>

      <div ref={stripRef} className="mt-5 overflow-x-auto snap-x snap-mandatory flex gap-6 pb-2 scroll-smooth">
        {items.map((p, i) => {
          const Card = (
            <article className="min-w-[320px] max-w-[360px] snap-start rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] overflow-hidden hover:shadow-glass transition">
              <img loading="lazy" src={p.img} alt={p.title} className="h-40 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="opacity-90 text-sm mt-1">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  {p.chips.map((c) => (
                    <span key={c} className="px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
          return p.href ? (
            <Link key={p.title + i} href={p.href} className="block">{Card}</Link>
          ) : (
            <div key={p.title + i}>{Card}</div>
          );
        })}
      </div>
    </div>
  );
}
