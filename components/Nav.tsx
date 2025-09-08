// components/Nav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeIconToggle from "@/components/ThemeIconToggle";
import { GitHubGlyph, LinkedInGlyph } from "@/components/social/icon";
import { asset } from "@/lib/asset";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
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
    <>
      {/* Top nav bar (tanpa action icons agar tidak terkunci max-width) */}
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--card)]/65 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--card)]/55">
        <div className="max-w-7xl mx-auto px-6 h-14 grid grid-cols-[1fr,auto,1fr] items-center">
          {/* kiri: brand */}

            <Link
                href="/"
                className="group inline-flex items-center gap-3 font-semibold tracking-tight hover:opacity-90 justify-self-start"
              >
                {/* Logo ON di light, OFF di dark */}
                <Image
                  src={asset("/cv/icons/logo-icon.png")} // "/icons/logo-icon.png" // cv/icons
                  alt="Afandi"
                  width={55}
                  height={55}
                  priority
                  className="rounded align-middle inline dark:hidden"
                />

                {/* Teks OFF di light, ON di dark */}
                <span className="leading-none hidden dark:inline">Afandi</span>
              </Link>

          {/* tengah: menu (centered) */}
          <nav className="flex items-center gap-1 justify-self-center">
            <NavLink href="/projects">Projects</NavLink>
            {/* <NavLink href="/about">About</NavLink>
            <NavLink href="/#contact">Contact</NavLink> */}
          </nav>

          {/* kanan: spacer (kosong, karena ikon sosmed + theme sudah fixed di pojok kanan) */}
          <div className="justify-self-end" />
        </div>
      </header>


      {/* Floating actions — persis pojok kanan seperti di home */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <a
          href="https://github.com/fandifandi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="inline-flex items-center justify-center size-8 sm:size-9 rounded-full border border-[color:var(--border)] hover:bg-[color:var(--card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition"
        >
          <GitHubGlyph className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/afandi-afandi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="inline-flex items-center justify-center size-8 sm:size-9 rounded-full border border-[color:var(--border)] hover:bg-[color:var(--card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition"
        >
          <LinkedInGlyph className="w-4 h-4" />
        </a>

        <ThemeIconToggle />
      </div>
    </>
  );
}
