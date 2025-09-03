// ===============================
// FILE: app/(site)/layout.tsx
// ===============================
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/asset";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Afandi — Resume & Portfolio",
    template: "%s — Afandi",
  },
  description:
    "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
  keywords: [
    "resume",
    "portfolio",
    "data engineer",
    "AI",
    "Indonesia",
    "Afandi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Afandi — Resume & Portfolio",
    description: "Selected projects & case studies.",
    images: [{ url: "/og-base.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/icons/favicon-32x32.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-[var(--bg)] text-[var(--fg)]`}>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
  );
}