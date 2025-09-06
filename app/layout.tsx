// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Suspense } from "react";
import Analytics from "@/components/Analytics";


const inter = Inter({ subsets: ["latin"] });
const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  // lebih tepat: origin tanpa /cv
  metadataBase: new URL("https://fandifandi.github.io"),
  title: { default: "Afandi — Resume & Portfolio", template: "%s — Afandi" },
  description: "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <Suspense fallback={null}>
          {isProd && (
          <Analytics />
          )}
        </Suspense>

        <Providers>{children}</Providers>
        {isProd && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token":"0d9a81ac430c4fe2b6e162f2cc87e00b"}'
          ></script>
        )}
        
      </body>
    </html>
  );
}
