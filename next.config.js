// next.config.js
const isGh = process.env.GHPAGES === "1";   // flag sederhana
const base = isGh ? "/cv" : "";

module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath : '/cv',                          // /cv di prod, "" di lokal
  assetPrefix: isProd ? `/${repo}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base ? base + "/" : undefined,
};
