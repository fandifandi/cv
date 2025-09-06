// components/ScrollSpy.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = { id: string; label: string };

export default function ScrollSpy({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  // Observe section visibility & mark active
  useEffect(() => {
    const els = items.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      entries => {
        // pilih entry yang paling “centered” (largest intersection ratio)
        const vis = [...entries]
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive(vis.target.id);
      },
      { root: document.getElementById("scroller") ?? null, threshold: [0.35, 0.5, 0.75] }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Toggle data-active untuk efek scale/ highlight via CSS
  useEffect(() => {
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (!el) return;
      if (i.id === active) el.setAttribute("data-active", "true");
      else el.removeAttribute("data-active");
    });
  }, [active, items]);

  const dots = useMemo(() => items, [items]);

  return (
    <aside
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 text-[11px]"
      aria-label="Section navigation"
    >
      {dots.map(d => (
        <Link
          key={d.id}
          href={`#${d.id}`}
          className="group grid grid-cols-[auto,1fr] items-center gap-2"
          aria-current={active === d.id ? "true" : undefined}
        >
          <div
            className={[
              "size-3 rounded-full border",
              active === d.id
                ? "bg-emerald-500/80 border-emerald-400/60 scale-110"
                : "bg-white/25 border-[color:var(--border)]"
            ].join(" ")}
          />
          <span className={active === d.id ? "opacity-100" : "opacity-60 group-hover:opacity-100"}>
            {d.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}
