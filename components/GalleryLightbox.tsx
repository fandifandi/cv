"use client";

import { useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/asset";

type GalleryItem = string | { src: string; alt?: string };

export default function GalleryLightbox({
  items,
  className = "",
  minH = 190,             // tinggi placeholder saat loading grid
}: {
  items: GalleryItem[];
  className?: string;
  minH?: number;
}) {
  const list = useMemo(
    () =>
      items.map((g) => {
        const it = typeof g === "string" ? { src: g } : g;
        const url = /^https?:\/\//.test(it.src) ? it.src : asset(it.src);
        return { src: url, alt: it.alt ?? "" };
      }),
    [items]
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  // body scroll lock saat modal open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // keyboard: Esc / ← →
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  // preload next/prev
  useEffect(() => {
    if (!open || list.length < 2) return;
    const next = new Image();
    next.src = list[(idx + 1) % list.length].src;
    const prev = new Image();
    prev.src = list[(idx - 1 + list.length) % list.length].src;
  }, [open, idx, list]);

  return (
    <>
      {/* GRID */}
      <div className={["grid grid-cols-2 md:grid-cols-3 gap-3", className].join(" ")}>
        {list.map((it, i) => (
          <figure
            key={i}
            className="relative rounded-lg overflow-hidden bg-[color:var(--card)]"
            style={{ minHeight: minH }}
          >
            {!loaded[i] && <div className="absolute inset-0 animate-pulse bg-white/5" />}
            <img
              src={it.src}
              alt={it.alt || `image ${i + 1}`}
              loading="lazy"
              onLoad={() => setLoaded((m) => ({ ...m, [i]: true }))}
              onClick={() => { setIdx(i); setOpen(true); }}
              className="
                block w-full h-auto align-bottom cursor-zoom-in
                rounded-lg ring-1 ring-[color:var(--border)] hover:ring-2 transition
              "
            />
          </figure>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* container untuk centering & stopPropagation */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* tombol close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white"
            >
              ✕
            </button>

            {/* prev/next */}
            {list.length > 1 && (
              <>
                <button
                  onClick={() => setIdx((i) => (i - 1 + list.length) % list.length)}
                  aria-label="Previous"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white"
                >
                  ←
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % list.length)}
                  aria-label="Next"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white"
                >
                  →
                </button>
              </>
            )}

            {/* gambar besar */}
            <img
              src={list[idx].src}
              alt={list[idx].alt || `image ${idx + 1}`}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg ring-1 ring-white/20"
            />
          </div>
        </div>
      )}
    </>
  );
}
