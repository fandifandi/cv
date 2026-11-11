// lib/seo.ts

// Public origin of the deployed site (no trailing slash).
export const SITE_URL = "https://fandifandi.github.io/cv";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Afandi",
  url: SITE_URL,
  jobTitle: "Data/AI Engineer & Product Analytics",
  sameAs: ["https://www.linkedin.com/in/afandi-afandi/", "https://github.com/fandifandi"],
};

export const projectJsonLd = (p: { title: string; slug: string; year: number }) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: p.title,
  url: `${SITE_URL}/projects/${p.slug}/`,
  datePublished: `${p.year}-01-01`,
});
