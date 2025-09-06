"use client";
import { useEffect } from "react";
import { ANALYTICS_ENABLED } from "@/lib/analytics-config";

export default function ClickTracker() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-gtag-event]");
      if (!target) return;
      const eventName = target.dataset.gtagEvent!;
      const params: Record<string, any> = { transport_type: "beacon" };

      for (const [k, v] of Object.entries(target.dataset)) {
        if (!k.startsWith("gtagParam")) continue;
        const key = k.replace(/^gtagParam/, "");
        const outKey = key.charAt(0).toLowerCase() + key.slice(1);
        params[outKey] = v;
      }

      const a = target.closest("a") as HTMLAnchorElement | null;
      if (a) {
        params.link_url = a.href;
        params.link_text = a.textContent?.trim();
      }

      (window as any).gtag?.("event", eventName, params);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, []);

  return null;
}
