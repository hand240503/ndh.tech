const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/ndh.tech" : "",
  assetPrefix: isProd ? "/ndh.tech" : "",
  images: {
    unoptimized: true, // GitHub Pages không có Image Optimization server
  },
  trailingSlash: true, // giúp route tĩnh resolve đúng trên GitHub Pages
};

module.exports = nextConfig;