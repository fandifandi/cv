// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = process.env.NEXT_PUBLIC_GHPAGES_REPO || "cv";   // bisa override via env
const prodBase = `/${repo}`;

module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // -> Local: ""  |  GitHub Pages (project): "/cv"
  basePath: isProd ? prodBase : "",
  assetPrefix: isProd ? `${prodBase}/` : undefined,

  // bikin mudah dipakai di client/helper
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? prodBase : "" },

  // optional quality-of-life:
  productionBrowserSourceMaps: false,
};
