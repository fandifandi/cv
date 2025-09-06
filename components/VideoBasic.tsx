"use client";

type Props = {
  mp4?: string;           // URL penuh atau /public/videos/...
  webm?: string;          // opsional
  poster?: string;        // opsional
  className?: string;
  autoPlay?: boolean;     // default false (autoplay aman hanya jika muted)
  loop?: boolean;         // default false
  muted?: boolean;        // default false
};

const to = (u?: string) =>
  !u ? undefined
     : /^https?:\/\//.test(u)
       ? u
       : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${u.startsWith("/") ? u : `/${u}`}`;

export default function VideoBasic({
  mp4, webm, poster,
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
      autoPlay={autoPlay && muted}  // autoplay mobile butuh muted
      loop={loop}
      poster={posterSrc}
    >
      {srcWebm && <source src={srcWebm} type="video/webm" />}
      {srcMp4  && <source src={srcMp4}  type="video/mp4"  />}
      Browser kamu tidak mendukung video.
    </video>
  );
}
