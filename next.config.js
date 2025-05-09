/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    // サーバーサイドのみの設定
    PROJECT_ROOT: __dirname,
  },
  experimental: {
    serverComponentsExternalPackages: ["formidable", "@aws-sdk/client-s3"]
  },
  // 画像最適化の設定
  images: {
    domains: ["autowebinar-assets.s3.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
};