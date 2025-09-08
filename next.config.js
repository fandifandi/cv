// next.config.js
const isGh = process.env.GHPAGES === "1";   // flag sederhana
const base = isGh ? "/cv" : "";

module.exports = {
  output: "export",
<<<<<<< HEAD
  images: { unoptimized: true },
  basePath : '/cv',                          // /cv di prod, "" di lokal
  assetPrefix: isProd ? `/${repo}/` : undefined,
=======
>>>>>>> 51bfafa0dddfb5433dead7cc31fbb316bea277bc
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base ? base + "/" : undefined,
};
