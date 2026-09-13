import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 85, 88, 92],
  },
  async rewrites() {
    return [
      {
        source: "/597e791a37996d3f5fb.js",
        destination: "https://static.getclicky.com/js?in=%2Ff9368cac3e4f43b557e",
      },
      {
        source: "/f9368cac3e4f43b557e",
        destination: "https://in.getclicky.com/in.php",
      },
      {
        source: "/3336e377e2fb9a82cae",
        destination: "https://in.getclicky.com/101511679ns.gif",
      },
    ];
  },
};

export default nextConfig;
