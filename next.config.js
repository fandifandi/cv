// next.config.js
/** @type {import('next').NextConfig} */
// basePath sama di dev & prod supaya path "/cv/assets/..." di data jalan di keduanya.
// Dev: buka http://localhost:3000/cv/
const base = "/cv";

module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  basePath: base,
  assetPrefix: base ? `${base}/` : undefined,

  // dipakai helper utk <img>/<video>/CSS/metadata
  env: { NEXT_PUBLIC_BASE_PATH: base },

  productionBrowserSourceMaps: false,
};
