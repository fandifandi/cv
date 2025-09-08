// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"; 
const base = isProd ? "/cv" : "";                     

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
