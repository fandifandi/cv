// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // GANTI ke URL situs kamu (WAJIB absolute URL)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fandifandi.github.io/cv"),
  title: { default: "Afandi — Resume & Portfolio", template: "%s — Afandi" },
  description: "Data/AI engineer & product analytics. Portfolio, projects, and writing.",

  // ====== ICONS / FAVICON ======
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },                                   // fallback
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",                              // iOS home screen
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#22c55e" }], // Safari pinned tab
  },
  manifest: "/site.webmanifest",
  themeColor: "#0b0b0b", // warna address bar (Android) & PWA
  openGraph: {
    title: "Afandi — Resume & Portfolio",
    description: "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
    url: "/",
    siteName: "Afandi",
    images: [{ url: "/icon.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afandi — Resume & Portfolio",
    description: "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
