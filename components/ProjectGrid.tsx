// ===============================
// FILE: components/ProjectGrid.tsx
// ===============================
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";
import clsx from "clsx";

export default function ProjectGrid({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
      {projects.map((p) => (
        <ProjectCard
          key={p.slug}
          title={p.title}
          excerpt={p.excerpt}
          tags={p.tags}
          cover={p.cover}
          href={`/projects/${p.slug}`}
        />
      ))}
    </div>
  );
}