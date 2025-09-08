// lib/asset.ts
const ABS = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function asset(p: string) {
  if (!p || ABS.test(p)) return p;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const path = p.startsWith("/") ? p : `/${p}`;
  if (base && (path === base || path.startsWith(base + "/"))) return path;
  return base ? base + path : path;
}

// (opsional) absolute URL untuk OG/Twitter images
export function abs(p: string) {
  const a = asset(p);
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "";
  try { return origin ? new URL(a, origin).toString() : a; } catch { return a; }
}

