// app/(site)/projects/(detail)/ls99/page.tsx
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";
import Image from "next/image";

export const dynamic = "force-static";

export async function generateMetadata() {
  const p = getProjectBySlug("ls99");
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

export default function Page() {
  const p = getProjectBySlug("ls99");
  if (!p) notFound();

  const STEPS = [
    "Define brand system & IA for the store",
    "Set up WooCommerce: catalog, variations, tax & shipping",
    "Integrate payments and order emails",
    "Instrument GA4 e-commerce via GTM",
    "Launch checklist, handover docs, and owner training",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd({ title: p.title, slug: p.slug, year: p.year })
          ),
        }}
      />
      <ProjectLayout
        project={p}
        quick={{
          client: "Laras Saras (LS-99)",
          roles: ["Web Developer","Web Designer","Brand Designer","Content Writer"],
          website: "https://www.larassaras99.com",
          stackExtra: ["WooCommerce", "WordPress", "GA4", "GTM", "Hostinger"],
          // metrics: [], // no public metrics for this project
          steps: STEPS,
        }}
      >
        <h2>Overview</h2>
        <p>
          End-to-end WooCommerce storefront: brand system, product catalog,
          payments & shipping, and GA4 e-commerce instrumentation. Fokusnya
          adalah toko yang siap jual, mudah dirawat, dan punya dasar analitik
          yang rapi.
        </p>


          <div className="relative w-full aspect-[16/9]">
            <Image
              src="https://previews.dropbox.com/p/thumb/ACwL3c3SsXnGBeMKSKSD84Z7zMQoXzy4P7zCDsqD4Hbw7RD_86yLA_7f0FmDrrefuDx4jV6vkWNbVVRT1OQaNggkLE4Riag9HlRs-qnc3fKoWyU0NaHx80lhTE6H5clelGUyNv2iYv-WTgTxLVtP2aByPSHiJuUxI-9a-QLHh6cK22MuiM68m4TZEKMTMeRjLB-a1oZE1uxF-LHJknndI0BtfPNjYipMl-JbO6QbfZSG0nCq8diuFCKZepROQQ2nbVmQfURGk_qD6DwPd4o9UQuOLZ-RZCqIeoWf6FC4ZJpBOD2WeGRw4Pvn_j5dAJl8dK0/p.png"
              alt="LS-99 storefront"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>


        <br />
        <h2>Goals</h2>
        <ul>
          <li>Ship a reliable, shippable store with clean brand and UX.</li>
          <li>Standardize catalog & variants so ops can scale.</li>
          <li>Track the full funnel (view_item → purchase) in GA4.</li>
        </ul>


        <h2>Approach & Architecture</h2>
        <ul>
          <li>
            Brand system with reusable tokens (logo, palette, typography,
            packaging guidelines).
          </li>
          <li>
            WooCommerce setup: categories, attributes/variations, SEO basics,
            cache/CDN for performance.
          </li>
          <li>
            Payments & shipping: gateway integration, taxes, shipping rules, and
            order email templates.
          </li>
          <li>
            GA4 via GTM: enhanced e-commerce events + consent & UTM hygiene.
          </li>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="https://previews.dropbox.com/p/thumb/ACxnbfjm-1Mk0yx9YoGn81nh0ZkmTgHOorSI5LrrbDu26_5ttYR5usKqL72OWLHQ8AUjbVnMhpMam0rl5bpDqO1aNPDhLSgKA3yK5HT1t18YMcikEOopvNUC0-DltvYtpFqhcbB9XveuJ3I4CtxuAMIqDeioRe24evxUFCeB2DZ7tPLFPUxIDTyJE3az3FpoqgvU1o37Lo3vvJGKE-FJa19u4ytHTkl4tJdGK5llsPqdzR_1WOCuvAXXybwWYaE4Lf5ekp62OQ_fy9p9SazRpPWFyB--xjQAqmWkY0y0ezcDl73I79AAFvsaqZgqMEy57hzJ7Nh7jro5gbghqnrWxntD/p.png?is_prewarmed=true"
              alt="LS-99 storefront"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </ul>
              <br />
        <h2>What shipped</h2>
        <ul>
          <li>Production storefront with secure payments and shipping rules.</li>
          <li>Owner playbook: add SKU, manage inventory, run promos.</li>
          <li>Self-serve reports for sales and SKU performance.</li>
        </ul>

        <h2>Learnings</h2>
        <ul>
          <li>
            Clear catalog structure saves hours when adding new product lines.
          </li>
          <li>
            Image/CDN tuning matters more than theme tweaks for real-world
            speed.
          </li>
          <li>
            A clean GA4 model early prevents rework when campaigns scale.
          </li>
        </ul>

        <h2>Next steps</h2>
        <ul>
          <li>Transactional email A/B (abandoned cart, post-purchase).</li>
          <li>Bundle/upsell experiments and cohort views for repeat buyers.</li>
          <li>Server-side tagging once volume justifies the complexity.</li>
        </ul>

        
      </ProjectLayout>
    </>
  );
}
