// components/HomeProjectsGrid.tsx
import Link from "next/link";

type Project = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  year: number;
  cover?: string;
};

type Card = {
  title: string;
  href?: string;        // kalau ada → link ke detail
  desc: string;
  img: string;
  chips: string[];
};

export default function HomeProjectsGrid({ projects }: { projects: Project[] }) {
  // urutkan terbaru → ambil 6
  const sorted = [...projects].sort((a, b) => b.year - a.year);
  const taken = sorted.slice(0, 6).map<Card>((p) => ({
    title: p.title,
    href: `/projects/${p.slug}`,
    desc: p.excerpt,
    img: p.cover ?? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    chips: p.tags.slice(0, 4), // maksimal 4 chips supaya rapih (2x2)
  }));

  // placeholder bila < 6
  const placeholders: Card[] = [
    {
      title: "Coming Soon — Case Study",
      desc: "Placeholder slot untuk project berikutnya.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
      chips: ["Design", "Analytics", "Ship", "Research"],
    },
    {
      title: "Coming Soon — Data App",
      desc: "Reserved card untuk showcase tambahan.",
      img: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop",
      chips: ["Python", "SQL", "DBT", "BI"],
    },
    {
      title: "Coming Soon — Experiment X",
      desc: "Slot untuk eksperimen / POC.",
      img: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop",
      chips: ["A/B", "Uplift", "Guardrail", "Metrics"],
    },
  ];

  const need = Math.max(0, 6 - taken.length);
  const list = [...taken, ...placeholders.slice(0, need)];

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link href="/projects" className="shrink-0 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]">
          See all →
        </Link>
      </div>

      {/* Grid 2 row (max 6) */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((c, i) => {
          const CardInner = (
            <article className="group rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)] hover:shadow-glass transition h-full flex flex-col">
              {/* pakai <img> agar tidak butuh config domain Next/Image */}
              <img src={c.img} alt={c.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)] line-clamp-2">{c.desc}</p>

                {/* Chips: grid 2 kolom → rata kiri-kanan kalau 2 baris */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  {c.chips.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)] text-center"
                      title={t}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );

          return c.href ? (
            <Link key={c.title + i} href={c.href} className="block">{CardInner}</Link>
          ) : (
            <div key={c.title + i}>{CardInner}</div>
          );
        })}
      </div>
    </div>
  );
}
