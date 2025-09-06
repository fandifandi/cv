// ===============================
// FILE: lib/seo.ts
// ===============================
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Afandi",
  url: "https://your-domain.com",
  jobTitle: "Data/AI Engineer & Product Analytics",
  sameAs: ["https://www.linkedin.com/in/your", "https://github.com/your"],
};

export const projectJsonLd = (p: { title: string; slug: string; year: number }) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: p.title,
  url: `https://your-domain.com/projects/${p.slug}`,
  datePublished: `${p.year}-01-01`,
});