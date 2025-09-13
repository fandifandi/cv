"use client";

import Link from "next/link";
import { useRef, useState, KeyboardEvent, useCallback } from "react";

export type TimelineItem = {
  time: string;
  title: string;
  city?: string;
  company?: string;
  desc: string;
  href?: string;
};

export default function TimelineInteractive({
  items,
  onChange,
}: {
  items: TimelineItem[];
  onChange?: (index: number, item: TimelineItem) => void;
}) {
  const [active, setActive] = useState(0);
  const liRefs = useRef<Array<HTMLLIElement | null>>([]);

  const setLiRef = useCallback(
    (idx: number): React.RefCallback<HTMLLIElement> =>
      (el) => {
        liRefs.current[idx] = el;
      },
    []
  );

  const scrollToItem = (i: number) => {
    const el = liRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const select = (i: number) => {
    setActive(i);
    onChange?.(i, items[i]);
    scrollToItem(i);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(i);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      select(Math.min(items.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      select(Math.max(0, i - 1));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Timeline</h2>
      <ol className="relative mt-2 border-s-2 border-[color:var(--border)]">
        {items.map((t, i) => {
          const isActive = i === active;
          return (
            <li
              key={i}
              ref={setLiRef(i)}
              className="ms-6 mb-8 last:mb-0 scroll-mt-48"
            >
              <span className="absolute -start-3 top-3 size-6 rounded-full bg-[var(--bg)] border-2 border-emerald-400 grid place-items-center">
                <span
                  className={[
                    "size-2 rounded-full transition transform",
                    isActive ? "bg-emerald-400 scale-100" : "bg-emerald-400/50 scale-75",
                  ].join(" ")}
                />
              </span>

              <div
                role="button"
                tabIndex={0}
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={[
                  "rounded-lg px-3 py-2 transition cursor-pointer",
                  "outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50",
                  isActive
                    ? "bg-[color:var(--card)] ring-1 ring-emerald-400/60"
                    : "hover:bg-[color:var(--card)]",
                ].join(" ")}
              >
                {/* Header: Title + City (kiri), Time (kanan) */}
                <header className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-semibold">{t.title}</h3>
                      {t.city && (
                        <span className="text-sm text-[color:var(--muted)]">
                          • {t.city}
                        </span>
                      )}
                    </div>
                    {t.company && (
                      <div className="mt-0.5 text-sm italic text-[color:var(--muted)]">
                        {t.company}
                      </div>
                    )}
                  </div>

                  <time className="shrink-0 text-xs text-[color:var(--muted)] whitespace-nowrap">
                    {t.time}
                  </time>
                </header>

                {/* Deskripsi */}
                <p className="mt-2 opacity-85">{t.desc}</p>

                {t.href && (
                  <Link
                    href={t.href}
                    data-gtag-event="view_details_clicked"
                    data-gtag-param-location="about_me"
                    data-gtag-param-variant="link"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-emerald-400 hover:underline"
                  >
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
