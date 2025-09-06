export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function to(href: string) {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  return `${BASE}${href.startsWith("/") ? href : "/" + href}`;
}
