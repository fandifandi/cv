// components/projects/ProjectLayout.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { allProjects, type Project } from "@/lib/projects";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { useMemo } from "react";

/* ========= Types ========= */
type Metric = { label: string; value: string };
type LinkItem = { label: string; href: string };

type QuickOverrides = {
  client?: string;
  roles?: string[];
  stackExtra?: string[];
  links?: LinkItem[];
  responsibilities?: string[];
  metrics?: Metric[];
  gallery?: string[];
  steps?: string[];        // NEW: timeline proses
  learnings?: string[];    // NEW: apa yang dipelajari
  nextSteps?: string[];    // NEW: langkah berikutnya
  website?: string;
};

/* ========= Helpers ========= */
const isHttp = (u: string) => /^https?:\/\//i.test(u);
// const HERO_CANVAS = "relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/7]";
// const HERO_CANVAS = "relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]";
const HERO_CANVAS = "relative w-full aspect-[16/9]";
const prettyUrl = (u: string) => {
  try {
    const host = new URL(u).hostname.replace(/^www\./, "");
    return host;
  } catch {
    return u;
  }
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-[color:var(--card)] border border-[color:var(--border)] text-xs">
      {children}
    </span>
  );
}

/* ========= UI atoms ========= */
function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={[
        "rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)]",
        "shadow-sm hover:shadow-md/40 transition-shadow",
        "p-5 sm:p-6",                 // ⬅️ tighter than p-8
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-md bg-[color:var(--bg)] border border-[color:var(--border)] text-[11px] leading-tight">
      {children}
    </span>
  );
}

/* small label */
const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">{children}</div>
);

/* ========= Stack (compact) ========= */
function StackCard({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <Card className="h-full">
      {/* <Label>Stack</Label> */}
      <div className="text-sm font-semibold">Stack</div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => <Chip key={s}>{s}</Chip>)}
      </div>
    </Card>
  );
}

/* ========= Quick Facts (compact) ========= */
function QuickFactsCard({ client, year, roles,website, }: { client?: string | null; year: number | string; roles: string[] ;website?: string;  }) {
  // hide card if literally nothing to show
  // if (!client && !year && (!roles || roles.length === 0)) return null;
  if (!client && !year && (!roles || roles.length === 0) && !website) return null;


  return (
    <Card className="h-full">
      {/* <Label>Quick facts</Label> */}
      <div className="text-sm font-semibold">Quick facts</div>

      <dl className="mt-3 space-y-3 text-sm">
        {client && (
          <div className="grid grid-cols-[88px,1fr] items-baseline gap-3">
            <dt className="text-[color:var(--muted)]">Client</dt>
            <dd className="justify-self-end sm:justify-self-start">{client}</dd>
          </div>
        )}
        {/* ⬇️ NEW: Website row (opsional) */}
        {website && (
          <div className="grid grid-cols-[88px,1fr] items-baseline gap-3">
            <dt className="text-[color:var(--muted)]">Website</dt>
            <dd className="justify-self-end sm:justify-self-start">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:opacity-90 block max-w-[14rem] truncate"
                title={website}
              >
                {prettyUrl(website)}
              </a>
            </dd>
          </div>
        )}

        {year && (
          <div className="grid grid-cols-[88px,1fr] items-baseline gap-3">
            <dt className="text-[color:var(--muted)]">Year</dt>
            <dd className="justify-self-end sm:justify-self-start">{year}</dd>
          </div>
        )}
        {!!roles?.length && (
          <div className="grid grid-cols-[88px,1fr] items-start gap-3">
            <dt className="text-[color:var(--muted)]">Roles</dt>
            <dd className="flex flex-wrap gap-2">
              {roles.map((r) => <Chip key={r}>{r}</Chip>)}
            </dd>
          </div>
        )}
      </dl>
    </Card>
  );
}

/* ========= Responsibilities (compact) ========= */
function ResponsibilitiesCard({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <Card className="h-full">
      {/* <Label>Responsibilities</Label> */}
      <div className="text-sm font-semibold">Responsibilities</div>
      
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((r) => (
          <li key={r} className="flex gap-2">
            <span className="mt-[7px] size-1.5 rounded-full bg-emerald-400" />
            <span className="leading-relaxed">{r}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)] transition";
  return isHttp(href) ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : <Link className={cls} href={href}>{children}</Link>;
}

/* ========= HERO (centered title + full-width proportional cover) ========= */
function Hero({ project, links }: { project: Project; links: LinkItem[] }) {
  return (
    <Section className="pt-16 pb-6 mesh">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/projects" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]">← Back to projects</Link>

        <h1 className="mt-4 text-center font-extrabold tracking-tight text-3xl md:text-5xl lg:text-6xl">
          {project.title || "Project Title"}
        </h1>
        {project.excerpt && (
          <p className="mt-3 text-center text-[color:var(--muted)] max-w-3xl mx-auto">
            {project.excerpt}
          </p>
        )}

        {/* Ribbon (tags/year/actions) */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(project.tags ?? []).map((t) => (
            <Link key={t} href={`/projects?tag=${encodeURIComponent(t)}`} className="px-3 py-1.5 rounded-full bg-[color:var(--card)] border border-[color:var(--border)] text-xs hover:bg-[color:var(--bg)]">
              {t}
            </Link>
          ))}
          {/* <Chip>{project.year}</Chip> */}
          <Pill>{project.year}</Pill>
          {links.map((l) => <ActionLink key={l.href} href={l.href}>{l.label}</ActionLink>)}
        </div>

        {/* Full-width cover (proportional, not zoomed) */}
        <div className="mt-6 -mx-6 lg:mx-0 overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]">
          <div className={`${HERO_CANVAS}`}>
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover p-0"  // isi frame, tanpa padding
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-[color:var(--bg)]" />
            )}
          </div>
        </div>

      </div>
    </Section>
  );
}

/* ========= Timeline proses ========= */
function ProcessTimeline({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;

  return (
    <Card className="p-5 sm:p-6">
      <div className="text-sm font-semibold">Process</div>

      {/* Mobile: list vertikal ringkas */}
      <ol className="mt-4 grid gap-3 sm:hidden">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-6 place-items-center rounded-full border border-[color:var(--border)] text-[11px] font-semibold">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>

      {/* ≥sm: horizontal stepper dengan konektor gradien */}
      <div className="mt-3 hidden sm:block overflow-x-auto">
        <ol className="min-w-max flex items-center gap-4 px-1">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              <div
                className="group flex items-center gap-3"
                aria-label={`Step ${i + 1}: ${s}`}
              >
                {/* badge angka */}
                <span className="relative grid size-7 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] text-[11px] font-semibold">
                  {i + 1}
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-emerald-400/30" />
                </span>

                {/* pill label */}
                <span className="px-3 py-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 backdrop-blur text-sm font-medium transition-colors group-hover:border-emerald-400/60">
                  {s}
                </span>
              </div>

              {/* konektor ke step berikutnya */}
              {i < steps.length - 1 && (
                <span className="h-[2px] w-16 sm:w-24 md:w-32 lg:w-40 xl:w-56 rounded-full bg-gradient-to-r from-emerald-400/50 via-[color:var(--border)] to-fuchsia-400/50" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}


/* ========= Metrics ========= */
function MetricsRow({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-2xl border border-[color:var(--border)] p-6 text-center bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10">
          <div className="text-2xl font-bold text-emerald-400">{m.value}</div>
          <div className="text-sm opacity-80">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ========= Content ========= */
function ContentCard({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <Card className="p-6">
      <article className="prose max-w-none dark:prose-invert">{children}</article>
    </Card>
  );
}

/* ========= Learnings & Next ========= */
function ListCard({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
        {items.map((x) => <li key={x}>{x}</li>)}
      </ul>
    </Card>
  );
}

/* ========= Prev/Next ========= */
function PrevNext({ prev, next }: { prev: Project | null; next: Project | null }) {
  return (
    <Section className="py-8">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Project pagination">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)]">← {prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)]">{next.title} →</Link>
        ) : <span />}
      </nav>
    </Section>
  );
}

/* ========= Main Layout ========= */
export default function ProjectLayout({
  project,
  children,
  quick = {},
}: {
  project: Project;
  children?: React.ReactNode;
  quick?: QuickOverrides;
}) {
  const d = project.detail ?? {};
  const roles: string[] = quick.roles ?? d.roles ?? []; 
  const stack = useMemo(() => {
    const extra = quick.stackExtra ?? d.stackExtra ?? [];
    const tags = project.tags ?? [];
    return Array.from(new Set([...extra, ...tags].filter(Boolean)));
  }, [quick.stackExtra, d.stackExtra, project.tags]);
  const responsibilities = quick.responsibilities ?? d.responsibilities ?? [];
  const metrics = quick.metrics ?? d.metrics ?? [];
  const links = (quick.links ?? d.links ?? []).filter(Boolean);
  const steps = quick.steps ?? d.steps ?? [];             // optional
  const learnings = quick.learnings ?? d.learnings ?? []; // optional
  const nextSteps = quick.nextSteps ?? d.nextSteps ?? []; // optional

  // gallery fallback
  const gallery = (quick.gallery?.length ? quick.gallery : d.gallery?.length ? d.gallery : project.cover ? [project.cover] : []) ?? [];

  // prev/next
  const ordered = useMemo(() => [...allProjects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)), []);
  const idx = useMemo(() => ordered.findIndex((x) => x.slug === project.slug), [ordered, project.slug]);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const website = quick.website ?? (project.demo ?? undefined);

  return (
    <>
      {/* HERO (centered) */}
      <Hero project={project} links={links} />

      {/* SCAN ROW */}
      <Section className="py-6"> {/* ⬅️ slightly higher */}
        {(() => {
          const cards: React.ReactNode[] = [];


          const hasResp = (responsibilities?.length ?? 0) > 0;
          // const hasQuickFacts = Boolean((d.client ?? quick.client) || project.year || (roles?.length ?? 0) > 0);
          const hasQuickFacts = !!((d.client ?? quick.client) || project.year || (roles?.length ?? 0) > 0 || website);
          const hasStack = (stack?.length ?? 0) > 0;


          

          if (hasQuickFacts) cards.push(
              <QuickFactsCard
                key="facts"
                client={d.client ?? quick.client}
                year={project.year}
                roles={roles}
                website={website}  // ⬅️ pass website
              />
            );
          if (hasResp) cards.push(<ResponsibilitiesCard key="resp" items={responsibilities} />);
          if (hasStack) cards.push(<StackCard key="stack" items={stack} />);

          if (cards.length === 0) return null;

          const grid =
            cards.length === 1
              ? "grid-cols-1"
              : cards.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 lg:grid-cols-3";

          return (
            <div className={`max-w-7xl mx-auto px-6 grid ${grid} gap-4 md:gap-6 lg:gap-8 items-stretch`}>
              {cards}
            </div>
          );
        })()}
      </Section>


      {/* TIMELINE + METRICS */}
      {(steps.length > 0 || metrics.length > 0) && (
        <Section className="py-6">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            <ProcessTimeline steps={steps} />
            <MetricsRow metrics={metrics} />
          </div>
        </Section>
      )}

      {/* NARRATIVE CONTENT */}
      <Section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <ContentCard>{children}</ContentCard>
        </div>
      </Section>

      {/* LEARNINGS & NEXT */}

      {(learnings.length > 0 || nextSteps.length > 0) && (
        <Section className="py-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ListCard title="Key Learnings" items={learnings} />
            <ListCard title="Next Steps" items={nextSteps} />
          </div>
        </Section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <Section className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <ProjectGallery items={gallery} className="mt-4" />
          </div>
        </Section>
      )}

      <PrevNext prev={prev} next={next} />
    </>
  );
}
