"use client";

import { asset } from "@/lib/asset";

type Props = {
  mp4?: string;           // "/assets/..." atau URL absolut
  webm?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;     // default false; autoplay butuh muted=true agar jalan di mobile
  loop?: boolean;         // default false
  muted?: boolean;        // default false
};

// helper kecil: undefined-in → undefined-out
const to = (u?: string) => (u ? asset(u) : undefined);

export default function VideoBasic({
  mp4,
  webm,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
}: Props) {
  const srcMp4 = to(mp4);
  const srcWebm = to(webm);
  const posterSrc = to(poster);

  return (
    <video
      className={`w-full rounded-xl border border-[color:var(--border)] bg-black ${className}`}
      controls
      playsInline
      preload="metadata"
      muted={muted}
      autoPlay={autoPlay && muted}  // autoplay modern browser wajib muted
      loop={loop}
      poster={posterSrc}
    >
      {srcWebm && <source src={srcWebm} type="video/webm" />}
      {srcMp4  && <source src={srcMp4}  type="video/mp4"  />}
      Browser kamu tidak mendukung video.
    </video>
  );
}
