// lib/asset.ts
/**
 * Normalisasi path asset agar:
 * - Lokal: "/assets/..." -> tetap "/assets/..."
 * - GitHub Pages (project "/cv"): otomatis jadi "/cv/assets/..."
 * - Jika src absolute (http(s), data:, blob:, //, mailto:, tel:, #anchor) -> dikembalikan apa adanya
 * - Cegah double prefix ("/cv/cv/...") bila src sudah diprefix
 */
const ABSOLUTE_OR_SPECIAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function asset(src: string): string {
  if (!src) return src;
  // Absolut / special scheme -> biarkan
  if (ABSOLUTE_OR_SPECIAL.test(src)) return src;

  // Base path dari next.config.js (di-inject saat build)
  const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || ""; // "" (dev) atau "/cv" (prod Pages)
  const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

  // Pastikan src selalu diawali "/"
  const path = src.startsWith("/") ? src : `/${src}`;

  // Jika sudah diprefix base (mis. "/cv/..."), jangan diprefix lagi
  if (base && (path === base || path.startsWith(`${base}/`))) return path;

  // Prefix kalau base ada
  return base ? `${base}${path}` : path;
}

// Opsional kalau suka constant
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
