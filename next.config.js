// next.config.js
/** @type {import('next').NextConfig} */
const base = "/cv";

module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // selalu /cv
  basePath: base,
  assetPrefix: `${base}/`,

  // kalau butuh di client (untuk helper asset())
  env: { NEXT_PUBLIC_BASE_PATH: base },

  productionBrowserSourceMaps: false,
};
