import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // This site is mostly prerendered. Preloading every server entry keeps route
  // modules resident for little benefit and raises the idle Railway footprint.
  experimental: {
    preloadEntriesOnStart: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 85, 88, 92],
    // Responsive display assets are already generated as size-specific WebP
    // files. Serving them directly avoids Sharp/libvips memory and an on-disk
    // image cache in the long-lived application container.
    unoptimized: true,
  },
};

export default nextConfig;
