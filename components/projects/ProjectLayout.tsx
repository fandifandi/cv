// components/projects/ProjectLayout.tsx
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { allProjects, type Project } from "@/lib/projects";

type Metric = { label: string; value: string };
type LinkItem = { label: string; href: string };

type QuickOverrides = {
  client?: string;
  roles?: string[];
  stackExtra?: string[];
  responsibilities?: string[];
  metrics?: Metric[];
  links?: LinkItem[];
  gallery?: string[];
};

export default function ProjectLayout({
  project,
  children,
  quick = {},
}: {
  project: Project;
  children?: React.ReactNode;        // konten custom kamu
  quick?: QuickOverrides;            // override quick facts bila perlu
}) {
  const d = project.detail ?? {};
  const roles = quick.roles ?? d.roles ?? ["Contributor"];
  const stack = [
    ...new Set([...(quick.stackExtra ?? d.stackExtra ?? []), ...project.tags]),
  ];
  const responsibilities = quick.responsibilities ?? d.responsibilities ?? [];
  const metrics = quick.metrics ?? d.metrics ?? [];
  const links = quick.links ?? d.links ?? [];
  const gallery =
    quick.gallery?.length ? quick.gallery :
    d.gallery?.length ? d.gallery :
    [project.cover ?? "/covers/placeholder.png"];

  // prev/next by year desc
  const ordered = [...allProjects].sort((a, b) => b.year - a.year);
  const idx = ordered.findIndex((x) => x.slug === project.slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null;

  return (
    <>
      {/* HERO */}
      <Section className="pt-16 pb-8 mesh">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/projects" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]">
            ← Back to projects
          </Link>

          <div className="mt-2 grid lg:grid-cols-[1fr,360px] gap-8 items-start">
            {/* Title + cover + chips */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1]">{project.title}</h1>
              <p className="mt-3 text-[color:var(--muted)] max-w-2xl">{project.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {project.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/projects?tag=${encodeURIComponent(t)}`}
                    className="px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)] hover:bg-[color:var(--bg)]"
                  >
                    {t}
                  </Link>
                ))}
                <span className="px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
                  {project.year}
                </span>
              </div>

              {project.cover && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--border)]">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                  >
                    Live Demo
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)] transition"
                  >
                    View Code
                  </a>
                )}
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)] transition"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick facts (BAKU) */}
            <aside className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-6">
              <h2 className="text-xl font-semibold">Quick facts</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {(quick.client ?? d.client) && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-[color:var(--muted)]">Client</dt>
                    <dd className="text-right">{quick.client ?? d.client}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-[color:var(--muted)]">Year</dt>
                  <dd className="text-right">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--muted)]">Roles</dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {roles.map((r) => (
                      <span key={r} className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)]">
                        {r}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--muted)]">Stack</dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {stack.map((s) => (
                      <span key={s} className="px-2 py-1 rounded bg-[color:var(--bg)] border border-[color:var(--border)]">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {!!metrics.length && (
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl frost bg-[color:var(--bg)] border border-[color:var(--border)] p-3">
                      <div className="text-lg font-bold text-emerald-400">{m.value}</div>
                      <div className="text-xs opacity-80">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </Section>

      {/* BODY CONTENT (custom) */}
      {children && (
        <Section className="py-10">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr,360px] gap-8">
            <article className="prose prose-invert max-w-none">{children}</article>

            {!!responsibilities.length && (
              <aside className="rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-6 h-max">
                <h3 className="text-lg font-semibold">Responsibilities</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {responsibilities.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-emerald-400" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </Section>
      )}

      {/* GALLERY (optional) */}
      {!!gallery.length && (
        <Section className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-semibold">Gallery</h2>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[color:var(--border)]">
                  <Image src={src} alt={`${project.title} image ${i + 1}`} width={1200} height={800} className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* PREV / NEXT (BAKU) */}
      <Section className="py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)]">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-[color:var(--card)]">
              {next.title} →
            </Link>
          ) : <span />}
        </div>
      </Section>
    </>
  );
}
