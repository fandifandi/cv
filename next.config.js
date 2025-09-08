// next.config.js
const isGh = process.env.GHPAGES === "1";   // flag sederhana
const base = isGh ? "/cv" : "";

module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base ? base + "/" : undefined,
};
