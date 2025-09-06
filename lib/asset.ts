// lib/asset.ts
export function asset(src: string) {
  // URL absolut -> biarkan
  if (/^https?:\/\//i.test(src)) return src;

  // samakan dengan basePath dari next.config.js (di-inject sebagai env)
  const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
  const path = src.startsWith("/") ? src : `/${src}`;

  return `${base}${path}`; // contoh: "" + "/icons/a.png" (lokal), "/cv" + "/icons/a.png" (GH)
}
