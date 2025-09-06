"use client";
import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ⬅️ HARD-CODE DI SINI
const GA_ID = "G-SB5EMM564G"; // ganti dgn ID kamu

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>

      {/* bagian yang pakai router hooks wajib dibungkus Suspense */}
      <Suspense fallback={null}>
        <SendPageView />
      </Suspense>
    </>
  );
}

function SendPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    let tries = 0;
    const max = 20, delay = 250;
    const fire = () => {
      const gtag = (window as any).gtag;
      if (!gtag) { if (tries++ < max) return void setTimeout(fire, delay); return; }
      const page_path = window.location.pathname + (window.location.search || "") + (window.location.hash || "");
      gtag("event", "page_view", {
        page_path,
        page_location: window.location.href,
        page_title: document.title,
      });
    };
    fire();
  }, [pathname, search]);

  return null;
}
