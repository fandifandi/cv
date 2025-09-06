// components/ContactSimple.tsx
"use client";
import { useState } from "react";
import { ANALYTICS_ENABLED } from "@/lib/analytics-config";

type LinkItem = {
  label: string;
  href: string;
  // optional tracking props — boleh tidak diisi dari pemakaian
  gtagEvent?: string;
  gtagParamLocation?: string;
  gtagParamVariant?: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
function isCV(label: string, href: string) {
  return /(^|\b)cv(\b|$)/i.test(label) || /\.pdf($|\?)/i.test(href);
}

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
    // track copy hanya saat tombol diklik (aman utk SSR)
    if (ANALYTICS_ENABLED && typeof window !== "undefined") {
      (window as any).gtag?.("event", "contact_copy_email", {
        transport_type: "beacon",
        location: "contact_simple",
      });
    }
  };

  // default links kalau props.links kosong
  const defaultLinks: LinkItem[] = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/username" },
    { label: "GitHub", href: "https://github.com/username" },
    { label: "Medium", href: "https://medium.com/@username" },
    { label: "X", href: "https://x.com/username" },
  ];

  const list = links.length ? links : defaultLinks;

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold">Contact Me</h2>

      {/* email */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`mailto:${email}`}
          className="font-semibold underline-offset-4 hover:underline"
          data-gtag-event="contact_email"
          data-gtag-param-location="contact_simple"
          data-gtag-param-variant="link"
          onClick={() => {
            if (ANALYTICS_ENABLED && typeof window !== "undefined") {
              (window as any).gtag?.("event", "contact_email", {
                transport_type: "beacon",
                location: "contact_simple",
              });
            }
          }}
        >
          {email}
        </a>
        <button
          onClick={copy}
          className="text-xs px-2 py-1 rounded border border-[color:var(--border)] hover:bg-[color:var(--card)]"
          aria-live="polite"
          data-gtag-event="contact_copy_email"
          data-gtag-param-location="contact_simple"
          data-gtag-param-variant="button"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* social links */}
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-[color:var(--muted)]">
        {list.map((l) => {
          // === AUTO DEFAULTS (tanpa ubah pemakaian) ===
          const event =
            l.gtagEvent ??
            (isCV(l.label, l.href) ? "cv_clicked" : `${slugify(l.label)}_clicked`);
          const loc = l.gtagParamLocation ?? "contact_simple";
          const variant = l.gtagParamVariant ?? "link";

          // render data-* selalu ada (string), bukan undefined
          const dataAttrs = {
            "data-gtag-event": event,
            "data-gtag-param-location": loc,
            "data-gtag-param-variant": variant,
          } as const;

          return (
            <li key={l.href}>
              <a
                target="_blank"
                rel="noreferrer"
                href={l.href}
                className="hover:text-[color:var(--fg)]"
                {...dataAttrs}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}