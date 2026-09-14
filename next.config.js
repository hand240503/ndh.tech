/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  
  basePath: "/my-site",
  assetPrefix: "/my-site",
  images: {
    unoptimized: true, // GitHub Pages không có Image Optimization server
  },
  trailingSlash: true, // giúp route tĩnh resolve đúng trên GitHub Pages
};

module.exports = nextConfig;