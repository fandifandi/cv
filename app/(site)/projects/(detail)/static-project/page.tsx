// app/(site)/projects/(detail)/ls99/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata() {
  const p = getProjectBySlug("static-project");
  if (!p) return {};
  return {
    title: p.seo?.title ?? p.title,
    description: p.seo?.description ?? p.excerpt,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, images: p.cover ? [{ url: p.cover, width: 1200, height: 630 }] : undefined },
  };
}

export default function Page() {
  const p = getProjectBySlug("static-project");
  if (!p) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd({ title: p.title, slug: p.slug, year: p.year })) }} />
      <ProjectLayout
        project={p}
        quick={{
          // kamu bisa override quick facts spesifik halaman custom
          client: "LS99",
          roles: ["Brand Designer", "Analytics"],
          stackExtra: ["WooCommerce", "GA4", "GTM"],
          // metrics / responsibilities biarkan ambil dari lib.projects.ts (detail) secara default
        }}
      >
        {/* Konten bebas (custom): boleh lebih naratif, tabel, dsb */}
        <h2>Problem DARI PROJECT - DETAIL - LS099 </h2>
        <p>Brand belum konsisten; e-commerce tanpa tracking memadai. Target: trust visual & pengukuran funnel end-to-end.</p>

        <h2>Goals</h2>
        <ul>
          <li>G1 — +5% checkout conversion</li>
          <li>G2 — Implement GA4 enhanced ecommerce</li>
          <li>G3 — Retention cohort 90 hari</li>
        </ul>

        <h2>Approach & Architecture</h2>
        <ol>
          <li>Design system (token warna/typo) → konsistensi across assets.</li>
          <li>Checkout UX: trust badges, shipping clarity, sticky CTA.</li>
          <li>GA4 EE + GTM server-side untuk event yang andal.</li>
        </ol>

        <h2>Results</h2>
        <ul>
          <li>+8% CVR; CTR PDP → cart +13%.</li>
          <li>Retensi 90 hari naik 6pt pasca bundle.</li>
          <li>Dashboard cohort mingguan untuk marketing.</li>
        </ul>

        <h2>Learnings</h2>
        <ul>
          <li>SSOT event naming memudahkan analisis lintas kampanye.</li>
          <li>Packaging konsisten menaikkan trust di PDP.</li>
          <li>Bundling diskon generik untuk LTV.</li>
        </ul>
      </ProjectLayout>
    </>
  );
}
