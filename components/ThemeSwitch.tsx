// components/ThemeSwitch.tsx
"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  // Init: baca localStorage / system preference, set <html class="dark">
  useEffect(() => {
    setMounted(true);
    try {
      const ls = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = ls ? ls === "dark" : prefersDark;
      setDark(initial);
      document.documentElement.classList.toggle("dark", initial);
    } catch {
      // no-op
    }
  }, []);

  // Persist & toggle kelas saat state berubah
  useEffect(() => {
    if (!mounted) return;
    try {
      document.documentElement.classList.toggle("dark", dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // no-op
    }
  }, [mounted, dark]);

  return (
    <button
      className="text-sm px-3 py-2 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--card)]"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
}
