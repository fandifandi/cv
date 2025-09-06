// lib/images.ts
import { asset } from "./asset";

// Tipe opsional kalau mau simpan alt/credit
export type ImageItem = { src: string; alt?: string; credit?: string };

// pembungkus kecil biar pemanggilan singkat
const a = (src: string, extra: Omit<ImageItem, "src"> = {}): ImageItem => ({
  src: asset(src),
  ...extra,
});

// Semua path gambar kamu kumpulkan di sini
export const IMG = {
  profile_pic: {
    me: a("https://media.licdn.com/dms/image/v2/D5603AQEtK7MvSGPaMw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731997776943?e=1759968000&v=beta&t=KwtrNYtKrquynIrjCz183aNHIOquYoRPqqDX0p0c25U", { alt: "Profile photo" }),
    mesh: a("/img/mesh-light.webp", { alt: "Gradient mesh" }),
  },
  pkj: {
    statistik: a("https://raw.githubusercontent.com/Kartu-Prakerja/laporan-penerima/main/img/img-cover-statistik-prakerja.png", { alt: "Statistik Prakerja" }),
    mesh: a("/img/mesh-light.webp", { alt: "Gradient mesh" }),
  },

  hero: {
    profile: a("/img/profile.jpg", { alt: "Profile photo" }),
    mesh: a("/img/mesh-light.webp", { alt: "Gradient mesh" }),
  },
  projects: {
    // sejalan: a("/covers/sejalan.png", { alt: "Sejalan cover" }),
    ls99: a("/covers/ls99.png", { alt: "LS99 cover" }),
    analyticsMap: a("/covers/analytics-map.png", { alt: "Analytics Map cover" }),
  },
  placeholders: {
    cover: a("/covers/placeholder.png", { alt: "Placeholder cover" }),
    // contoh URL eksternal juga bisa
    stock1: a("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"),
  },
  icons: {
    github: a("/icons/github.svg", { alt: "GitHub" }),
    linkedin: a("/icons/linkedin.svg", { alt: "LinkedIn" }),
    x: a("/icons/x.svg", { alt: "X/Twitter" }),
  },
} as const;

// Akses pakai string "dot path" kalau suka:
export function getImg(path: string): string {
  const parts = path.split(".");
  let cur: any = IMG;
  for (const p of parts) cur = cur?.[p];
  if (!cur || typeof cur.src !== "string") {
    throw new Error(`Unknown image key: ${path}`);
  }
  return cur.src as string;
}

// (Opsional) mapping cover per slug project
export const COVER_BY_SLUG: Record<string, string> = {
  // "sejalan-rides": IMG.projects.sejalan.src,
  "ls99": IMG.projects.ls99.src,
  "analytics-pkj": IMG.projects.analyticsMap.src,
};

export function projectCover(slug: string, fallback = IMG.placeholders.cover.src) {
  return COVER_BY_SLUG[slug] ?? fallback;
}
