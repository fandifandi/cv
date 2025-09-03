// ===============================
// FILE: app/layout.tsx
// ===============================
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: { default: "Afandi — Resume & Portfolio", template: "%s — Afandi" },
  description: "Data/AI engineer & product analytics. Portfolio, projects, and writing.",
};

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <script dangerouslySetInnerHTML={{__html: `(() => { try { const ls = localStorage.getItem('theme'); const m = window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = ls ? ls === 'dark' : m; document.documentElement.classList.toggle('dark', dark); } catch (e) {} })();`}} />{children}</body>
//     </html>
//   );
// }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}