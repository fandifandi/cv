// lib/analytics-config.ts
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_DISABLE_ANALYTICS !== "1";
