// app/(site)/projects/page.tsx
import Section from "@/components/Section";
import ProjectsFilterGrid from "@/components/ProjectsFilterGrid";
import { allProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description: "All projects and case studies.",
};

export const dynamic = "force-static";

export default function ProjectsPage() {
  const total = allProjects.length;
  const featured = allProjects.filter((p) => p.featured).length;
  const tags = Array.from(new Set(allProjects.flatMap((p) => p.tags)));

  return (
    <>
      {/* HERO */}
      <Section className="pt-16 pb-10 mesh">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-widest text-[color:var(--muted)]">WORK</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold leading-tight">
             Selected <span className="bg-gradient-to-r from-teal-400 to-violet-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
            A curated list of shipped work, experiments, and long-form case studies.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-2xl font-semibold text-[color:var(--fg)]">{total}</p>
              <p className="text-[color:var(--muted)]">Total projects</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[color:var(--fg)]">{featured}</p>
              <p className="text-[color:var(--muted)]">Featured</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[color:var(--fg)]">{tags.length}</p>
              <p className="text-[color:var(--muted)]">Tags</p>
            </div>
          </div>
        </div>
        <br />
        <br />
         <div className="max-w-7xl mx-auto px-6">
          <ProjectsFilterGrid projects={allProjects} />
        </div>
      </Section>
    </>
  );
}
