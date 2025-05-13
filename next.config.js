/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // 👈 this line is the patch
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'news.mewskhabar.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
};

module.exports = nextConfig;