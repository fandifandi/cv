// ===============================
// FILE: components/ProjectCard.tsx
// ===============================
import Link from "next/link";

export default function ProjectCard({
  title,
  excerpt,
  tags,
  cover,
  href,
}: {
  title: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 p-3 hover:border-white/20 transition bg-white/[0.02]"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={cover || "/og-base.png"}
          alt={title}
          className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/70">{excerpt}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}