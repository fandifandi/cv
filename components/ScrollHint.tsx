// components/ScrollHint.tsx
"use client";
import { useEffect, useState } from "react";

export default function ScrollHint({ hideAtId = "contact" }: { hideAtId?: string }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const last = document.getElementById(hideAtId);
    if (!last) return;
    const io = new IntersectionObserver(
      (entries) => setHide(entries.some((e) => e.isIntersecting)),
      { threshold: 0.4 }
    );
    io.observe(last);
    return () => io.disconnect();
  }, [hideAtId]);

  if (hide) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-6 z-40 text-xs opacity-75">
      Scroll ↓
    </div>
  );
}
