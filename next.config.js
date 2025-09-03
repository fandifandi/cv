/** @type {import('next').NextConfig} */
const nextConfig = {
  // penting: jadikan output statis (generate folder "out")
  output: "export",

  // supaya <Image> tidak butuh optimizer server
  images: { unoptimized: true },

  // optional tapi membantu: matikan sourcemap server
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
