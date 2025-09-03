// ===============================
// FILE: next.config.mjs
// ===============================
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: false },
  images: { unoptimized: true }, // enable next export compatibility
};
export default nextConfig;