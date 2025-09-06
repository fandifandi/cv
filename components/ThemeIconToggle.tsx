// components/ThemeIconToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeIconToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // hindari hydration mismatch

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`${isDark ? "Light" : "Dark"} mode`}
      className="group rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/80 backdrop-blur px-2 py-2 shadow-sm hover:bg-[color:var(--card)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
    >
      <span className="relative block w-4 h-4">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 transition-all ${isDark ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
          fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 transition-all ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </span>
    </button>
  );
}
