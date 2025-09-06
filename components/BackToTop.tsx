// components/BackToTop.tsx
"use client";
import { useEffect, useState } from "react";

export default function BackToTop({ targetId = "scroller" }: { targetId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => setShow(el.scrollTop > 400);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [targetId]);

  if (!show) return null;

  return (
    <button
      onClick={() => document.getElementById(targetId)?.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-[color:var(--border)]
                 bg-[color:var(--card)]/85 backdrop-blur px-3 py-2 text-sm shadow
                 hover:bg-[color:var(--card)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      aria-label="Back to top"
      title="Back to top"
    >
      ↑ 
    </button>
  );
}
