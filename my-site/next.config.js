/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Site deploy dạng project page: hand240503.github.io/my-site/
  // Nếu sau này chuyển sang custom domain (vd: ndh.tech), XOÁ 2 dòng basePath/assetPrefix này đi.
  basePath: "/my-site",
  assetPrefix: "/my-site",
  images: {
    unoptimized: true, // GitHub Pages không có Image Optimization server
  },
  trailingSlash: true, // giúp route tĩnh resolve đúng trên GitHub Pages
};

module.exports = nextConfig;
