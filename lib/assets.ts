import officialLogo from "@/TopJustice Logo.png";

import { assetManifest } from "@/data/assets";

export const assetPackagePaths = {
  root: "/assets/justice-for-jaali-phase-3-assets",
  visualAssets: "/assets/justice-for-jaali-phase-3-assets/assets",
  originalPhotos:
    "/assets/justice-for-jaali-phase-3-assets/assets/original-photos",
  optimized: {
    desktop:
      "/assets/justice-for-jaali-phase-3-assets/assets/optimized/desktop",
    mobile: "/assets/justice-for-jaali-phase-3-assets/assets/optimized/mobile",
    tablet: "/assets/justice-for-jaali-phase-3-assets/assets/optimized/tablet",
  },
  backgrounds: "/assets/justice-for-jaali-phase-3-assets/assets/backgrounds",
  icons: "/assets/justice-for-jaali-phase-3-assets/assets/icons",
  illustrations:
    "/assets/justice-for-jaali-phase-3-assets/assets/illustrations",
  patterns: "/assets/justice-for-jaali-phase-3-assets/assets/patterns",
  textures: "/assets/justice-for-jaali-phase-3-assets/assets/textures",
} as const;

export const approvedImagePaths = {
  root: "/assets/images",
  backgrounds: "/assets/images/backgrounds",
  banners: "/assets/images/banners",
  hero: "/assets/images/hero",
  originals: "/assets/images/originals",
  story: "/assets/images/story",
} as const;

export const homepageAssets = assetManifest.homepage;
export const metadataAssets = assetManifest.metadata;

export const brandAssets = {
  officialLogo,
} as const;

export const missingSectionAssets = {
  timeline:
    "Dedicated milestone-by-milestone photos are still pending; the approved family remembrance image provides section context.",
  footer: "No approved footer asset or placement filename was supplied.",
  favicon: "No approved favicon asset was supplied.",
} as const;
