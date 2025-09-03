// app/(site)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug, slugs } from "@/lib/projects";
import { CUSTOM_SLUGS } from "@/lib/project-custom";
import { projectJsonLd } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // exclude slug yang punya page custom
  return slugs
    .filter((s) => !CUSTOM_SLUGS.includes(s))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.seo?.title ?? p.title,
    description: p.seo?.description ?? p.excerpt,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      images: p.cover ? [{ url: p.cover, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default function ProjectDetailGeneric({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug);
  if (!p) notFound();

  const s = p.detail?.sections;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd({ title: p.title, slug: p.slug, year: p.year })) }}
      />
      <ProjectLayout project={p}>
        {/* body default dari data (kalau ada) */}
        {s?.problem && (<><h2>Problem</h2><p>{s.problem}</p></>)}
        {!!s?.goals?.length && (<><h2>Goals</h2><ul>{s.goals.map((g, i) => <li key={i}>{g}</li>)}</ul></>)}
        {!!s?.approach?.length && (<><h2>Approach & Architecture</h2><ol>{s.approach.map((a, i) => <li key={i}>{a}</li>)}</ol></>)}
        {!!s?.results?.length && (<><h2>Results</h2><ul>{s.results.map((r, i) => <li key={i}>{r}</li>)}</ul></>)}
        {!!s?.learnings?.length && (<><h2>Learnings</h2><ul>{s.learnings.map((l, i) => <li key={i}>{l}</li>)}</ul></>)}
        {!s && (<><h2>Case Study</h2><p>Isi detail.sections di <code>lib/projects.ts</code> untuk menampilkan konten.</p></>)}
      </ProjectLayout>
    </>
  );
}
