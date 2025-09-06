// app/(site)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug, slugs } from "@/lib/projects";
import { CUSTOM_SLUGS } from "@/lib/project-custom";

import { projectJsonLd } from "@/lib/seo";

import { asset } from "@/lib/asset";
import VideoBasic from "@/components/VideoBasic";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return slugs
    .filter((s) => !CUSTOM_SLUGS.includes(s)) // ← keluarkan slug custom
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug);
  if (!p) return {};
  const ogImg = p.cover ? asset(p.cover) : undefined;
  return {
    title: p.seo?.title ?? p.title,
    description: p.seo?.description ?? p.excerpt,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      images: ogImg ? [{ url: ogImg, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default function ProjectDetailGeneric({ params }: { params: { slug: string } }) {
  const p = getProjectBySlug(params.slug);
  if (!p) return notFound();

  const s = p.detail?.sections;
  const v = p.detail?.video;
  const gallery = p.detail?.gallery ?? [];
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd({ title: p.title, slug: p.slug, year: p.year })) }}
      />

      <ProjectLayout project={p}>
        {/* ==== Demo Video (opsional) ==== */}
        {p.detail?.video && (
          <div className="mt-6">
            <VideoBasic
              mp4={p.detail.video.mp4}      // isi kalau punya
              webm={p.detail.video.webm}    // kalau ada
              poster={p.detail.video.poster}
              // controls aktif default
              // autoPlay // aktifkan kalau mau, tapi set muted={true}
              // muted
              // loop
            />
          </div>
        )}

        {/* ==== Body default ==== */}
        {s?.problem && (<><h2 className="mt-8 text-xl font-semibold">Problem</h2><p className="mt-2">{s.problem}</p></>)}
        {!!s?.goals?.length && (<><h2 className="mt-8 text-xl font-semibold">Goals</h2><ul className="mt-2 list-disc ps-5 space-y-1">{s.goals.map((g,i)=><li key={i}>{g}</li>)}</ul></>)}
        {!!s?.approach?.length && (<><h2 className="mt-8 text-xl font-semibold">Approach & Architecture</h2><ol className="mt-2 list-decimal ps-5 space-y-1">{s.approach.map((a,i)=><li key={i}>{a}</li>)}</ol></>)}
        {!!s?.results?.length && (<><h2 className="mt-8 text-xl font-semibold">Results</h2><ul className="mt-2 list-disc ps-5 space-y-1">{s.results.map((r,i)=><li key={i}>{r}</li>)}</ul></>)}
        {!!s?.learnings?.length && (<><h2 className="mt-8 text-xl font-semibold">Learnings</h2><ul className="mt-2 list-disc ps-5 space-y-1">{s.learnings.map((l,i)=><li key={i}>{l}</li>)}</ul></>)}
        {!s && (<><h2 className="mt-8 text-xl font-semibold">Case Study</h2><p className="mt-2">Isi <code>detail.sections</code> di <code>lib/projects.ts</code> untuk menampilkan konten.</p></>)}


        {!!gallery.length && (
          <>
            <h2 className="mt-8 text-xl font-semibold">Gallery</h2>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((g, i) => {
                const src = typeof g === "string" ? g : (g as any).src; // dukung string[]/object[]
                const url = /^https?:\/\//.test(src) ? src : asset(src);
                return (
                  <figure
                    key={i}
                    className="rounded-lg overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)]"
                  >
                    <img
                      src={url}
                      alt={`${p.title} — image ${i + 1}`}
                      loading="lazy"
                      className="block w-full h-auto"   // ← tinggi mengikuti gambar (no gap)
                    />
                  </figure>
                );
              })}
            </div>
          </>
        )}
      </ProjectLayout>
    </>
  );
}
