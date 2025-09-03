// components/ContactSocial.tsx
"use client";

import { useState } from "react";

type Social = { label: string; href: string; note?: string; icon?: React.ReactNode };

export default function ContactSocial({
  email = "email@example.com",
  socials = [],
}: {
  email?: string;
  socials?: Social[];
}) {
  const [copied, setCopied] = useState(false);

  const items: Social[] =
    socials.length
      ? socials
      : [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/username", note: "Let’s connect" },
          { label: "GitHub", href: "https://github.com/username", note: "Code & repos" },
          { label: "Medium", href: "https://medium.com/@username", note: "Writing & notes" },
          { label: "X (Twitter)", href: "https://x.com/username", note: "DM open" },
          { label: "Email", href: `mailto:${email}`, note: email },
          // tambahkan yang lain kalau perlu (WhatsApp/Telegram/Calendly)
        ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const Card = ({ s }: { s: Social }) => (
    <a
      href={s.href}
      target={s.href.startsWith("http") ? "_blank" : undefined}
      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
      className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 hover:shadow-glass transition flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        {/* icon minimal (emoji biar tanpa deps) */}
        <div className="size-9 grid place-items-center rounded-xl bg-[color:var(--bg)] border border-[color:var(--border)]">
          <span aria-hidden>🔗</span>
        </div>
        <div>
          <div className="font-semibold">{s.label}</div>
          {s.note && <div className="text-sm text-[color:var(--muted)]">{s.note}</div>}
        </div>
      </div>
      <div className="text-[color:var(--muted)] group-hover:translate-x-0.5 transition" aria-hidden>
        ↗
      </div>
    </a>
  );

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold">Contact</h2>

      {/* Email highlight */}
      <div className="mt-4 rounded-2xl frost bg-[color:var(--card)] border border-[color:var(--border)] p-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 grid place-items-center rounded-xl bg-white text-black font-bold">✉️</div>
          <div className="min-w-0">
            <div className="text-sm text-[color:var(--muted)]">Email</div>
            <a href={`mailto:${email}`} className="font-semibold truncate hover:underline">{email}</a>
          </div>
        </div>
        <button
          onClick={copyEmail}
          className="px-3 py-1.5 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--bg)] text-sm shrink-0"
          aria-live="polite"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Social grid */}
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((s) => (
          <Card key={s.label} s={s} />
        ))}
      </div>

      {/* Availability mini chips (opsional, bisa dihapus) */}
      <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-[color:var(--bg)] border border-[color:var(--border)] p-3">
          <div className="opacity-70">Response time</div>
          <div className="font-semibold">~24 hours</div>
        </div>
        <div className="rounded-xl bg-[color:var(--bg)] border border-[color:var(--border)] p-3">
          <div className="opacity-70">Timezone</div>
          <div className="font-semibold">GMT+7 (WIB)</div>
        </div>
      </div>
    </div>
  );
}
