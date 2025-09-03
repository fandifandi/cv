// components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeIconToggle from "@/components/ThemeIconToggle";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  // aktif hanya untuk route (bukan anchor #contact)
  const active = href !== "/#contact" && (pathname === href || pathname.startsWith(href + "/"));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "px-3 py-2 rounded-lg text-sm transition",
        active
          ? "font-semibold text-[color:var(--fg)] bg-[color:var(--bg)]/40"
          : "text-[color:var(--muted)] hover:text-[color:var(--fg)] hover:bg-[color:var(--bg)]/40",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--card)]/65 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--card)]/55">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight hover:opacity-90">
          Afandi
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeIconToggle />
        </div>
      </div>
    </header>
  );
}
