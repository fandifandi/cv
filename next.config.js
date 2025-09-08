/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "cv";
const basePath = isProd ? `/${repo}` : "";

module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath : '/cv',                          // /cv di prod, "" di lokal
  assetPrefix: isProd ? `/${repo}/` : undefined,
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
