"use client";
import { useState } from "react";

export default function CopyEmailButton({
  email,
  location = "contact_page",
}: { email: string; location?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {/* ignore */}
        // track copy (langsung ke GA kalau ada)
        (window as any).gtag?.("event", "contact_email_copy", {
          transport_type: "beacon",
          location,
        });
      }}
      className="text-xs px-2 py-1 rounded border border-[color:var(--border)] hover:bg-[color:var(--card)]"
      aria-live="polite"
      data-gtag-event="contact_email_copy"
      data-gtag-param-location={location}
      data-gtag-param-variant="button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
