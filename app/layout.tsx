// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Suspense } from "react";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import ClickTracker from "@/components/ClickTracker";
import { ANALYTICS_ENABLED } from "@/lib/analytics-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fandifandi.github.io"),
  title: { default: "Afandi — Resume & Portfolio", template: "%s — Afandi" },
  description:
    "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {ANALYTICS_ENABLED && (
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        )}

        {ANALYTICS_ENABLED && <ClickTracker />}

        <Providers>{children}</Providers>

        {ANALYTICS_ENABLED && (
          <Script
            id="cf-beacon"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon='{"token":"0d9a81ac430c4fe2b6e162f2cc87e00b"}'
          />
        )}
      </body>
    </html>
  );
}
