/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const REPO = "cv";                       // ganti kalau nama repo beda
const base = isProd ? `/${REPO}` : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base + "/",
  env: { NEXT_PUBLIC_BASE_PATH: base },  // bantu prefix utk <img> manual
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;             // <- JANGAN ada "export default ..." di file ini
