"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

type GalleryItem =
  | string
  | { src: string; alt?: string; w?: number; h?: number; fit?: "cover" | "contain" };

export default function GalleryAuto({
  items,
  minH = 190,                 // tinggi placeholder saat loading
  className = "",
}: {
  items: GalleryItem[];
  minH?: number;
  className?: string;
}) {
  return (
    <div className={["grid grid-cols-2 md:grid-cols-3 gap-3", className].join(" ")}>
      {items.map((it, i) => {
        const obj = typeof it === "string" ? { src: it } : it;
        const src = /^https?:\/\//.test(obj.src) ? obj.src : asset(obj.src);
        const fit = obj.fit ?? "cover";
        const ratio = obj.w && obj.h ? `${obj.w}/${obj.h}` : undefined;

        return <Tile key={i} src={src} alt={obj.alt ?? `image ${i + 1}`} minH={minH} fit={fit} ratio={ratio} />;
      })}
    </div>
  );
}

function Tile({
  src,
  alt,
  minH,
  fit,
  ratio,
}: {
  src: string;
  alt: string;
  minH: number;
  fit: "cover" | "contain";
  ratio?: string; // CSS aspect-ratio "w/h"
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure
      className="relative rounded-lg overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)]"
      style={
        loaded
          ? ratio
            ? { aspectRatio: ratio }
            : undefined
          : // saat loading: kunci min-height supaya grid stabil
            ratio
            ? { aspectRatio: ratio, minHeight: minH }
            : { minHeight: minH }
      }
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={[
          "w-full transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          ratio ? "h-full" : "h-auto", // bila ada ratio → isi penuh; else ikut intrinsic
          fit === "cover" ? "object-cover" : "object-contain bg-[color:var(--bg)]",
        ].join(" ")}
      />
    </figure>
  );
}
