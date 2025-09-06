"use client";
import { useState } from "react";

type LinkItem = { label: string; href: string };

export default function ContactSimple({
  email = "email@example.com",
  links = [],
}: {
  email?: string;
  links?: LinkItem[];
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold">Contact Me</h2>

      {/* email */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a href={`mailto:${email}`} className="font-semibold underline-offset-4 hover:underline">
          {email}
        </a>
        <button
          onClick={copy}
          className="text-xs px-2 py-1 rounded border border-[color:var(--border)] hover:bg-[color:var(--card)]"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* social links, simpel baris/rapi saat wrap */}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[color:var(--muted)]">
        {(links.length ? links : [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
          { label: "GitHub", href: "https://github.com/username" },
          { label: "Medium", href: "https://medium.com/@username" },
          { label: "X", href: "https://x.com/username" },
          // tambah WA/Calendly kalau mau
        ]).map((l) => (
          <li key={l.href}>
            <a target="_blank" rel="noreferrer" href={l.href} className="hover:text-[color:var(--fg)]">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
