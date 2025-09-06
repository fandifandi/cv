// components/SkillsBars.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type SkillDatum = { name: string; value: number }; // value 0..100

export default function SkillsBars({ data, title = "Skills" }: { data: SkillDatum[]; title?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // animate when in-view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="mt-4 space-y-3">
        {data.map((s) => (
          <div key={s.name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="opacity-90">{s.name}</span>
              <span className="opacity-70">{s.value}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-[color:var(--bg)] border border-[color:var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-[width] duration-700"
                style={{ width: ready ? `${Math.max(0, Math.min(100, s.value))}%` : "0%" }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
