/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true
  },
  images: {
    domains: ['imagedelivery.net']
  }
};

module.exports = nextConfig;
