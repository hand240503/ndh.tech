/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // basePath và assetPrefix sẽ được action configure-pages tự động thiết lập khi build trên GitHub Pages,
  // hoặc để trống nếu bạn dùng custom domain (ndh.tech) và dev local.
  images: {
    unoptimized: true, // GitHub Pages không có Image Optimization server
  },
  trailingSlash: true, // giúp route tĩnh resolve đúng trên GitHub Pages
};

module.exports = nextConfig;