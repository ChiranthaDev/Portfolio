/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS image sources including Cloudflare R2 public URLs
      },
    ],
  },
};

module.exports = nextConfig;
