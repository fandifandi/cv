// components/TimelineInteractive.tsx
"use client";

import Link from "next/link";
import { useState, KeyboardEvent } from "react";

export type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  href?: string;
};

export default function TimelineInteractive({
  items,
  onChange, // <— baru
}: {
  items: TimelineItem[];
  onChange?: (index: number, item: TimelineItem) => void; // <— baru
}) {
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    setActive(i);
    onChange?.(i, items[i]); // <— panggil parent
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(i);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Timeline</h2>
      <ol className="relative mt-2 border-s-2 border-[color:var(--border)]">
        {items.map((t, i) => {
          const isActive = i === active;
          return (
            <li key={i} className="ms-6 mb-8 last:mb-0">
              <span className="absolute -start-3 top-3 size-6 rounded-full bg-[var(--bg)] border-2 border-emerald-400 grid place-items-center">
                <span className={`size-2 rounded-full transition ${isActive ? "bg-emerald-400 scale-100" : "bg-emerald-400/50 scale-75"}`} />
              </span>

              <div
                role="button"
                tabIndex={0}
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={[
                  "rounded-lg px-3 py-2 transition",
                  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50",
                  isActive ? "bg-[color:var(--card)] ring-1 ring-emerald-400/60" : "hover:bg-[color:var(--card)]",
                ].join(" ")}
              >
                <time className="text-xs opacity-70">{t.time}</time>
                <h3 className="font-semibold mt-0.5">{t.title}</h3>
                <p className="opacity-85">{t.desc}</p>

                {t.href && (
                  <Link href={t.href} className="inline-flex items-center gap-1 mt-2 text-sm text-emerald-400 hover:underline">
                    View details <span aria-hidden>↗</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
