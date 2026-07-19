import type { AssetManifest } from "@/types/assets";

const jaaliPortraitSources = {
  desktop: {
    src: "/assets/images/hero/jaali-banner-desktop.webp",
    width: 816,
    height: 1020,
  },
  tablet: {
    src: "/assets/images/hero/jaali-banner-tablet.webp",
    width: 720,
    height: 900,
  },
  mobile: {
    src: "/assets/images/hero/jaali-banner-mobile.webp",
    width: 560,
    height: 700,
  },
} as const;

const jaaliUpdatedBannerSources = {
  desktop: {
    src: "/assets/images/hero/jaali-update-banner-desktop.webp",
    width: 1440,
    height: 958,
  },
  tablet: {
    src: "/assets/images/hero/jaali-update-banner-tablet.webp",
    width: 1200,
    height: 799,
  },
  mobile: {
    src: "/assets/images/hero/jaali-update-banner-mobile.webp",
    width: 720,
    height: 479,
  },
} as const;

const rememberingJaaliSources = {
  desktop: {
    src: "/assets/images/backgrounds/remembering-jaali-desktop.webp",
    width: 1408,
    height: 1056,
  },
  tablet: {
    src: "/assets/images/backgrounds/remembering-jaali-tablet.webp",
    width: 1024,
    height: 768,
  },
  mobile: {
    src: "/assets/images/backgrounds/remembering-jaali-mobile.webp",
    width: 720,
    height: 900,
  },
} as const;

export const assetManifest = {
  homepage: {
    hero: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Jaali smiling at the camera in warm sunset light.",
      decorative: false,
      fallbackAspectRatio: "1537/1023",
      fallbackLabel: "Portrait of Jaali at sunset",
      quality: 88,
      sizes: "(min-width: 1200px) 60vw, (min-width: 768px) 58vw, 100vw",
      sources: jaaliUpdatedBannerSources,
    },
    story: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Jaali and her boyfriend smiling together at the beach.",
      decorative: false,
      fallbackAspectRatio: "4/5",
      fallbackLabel: "Jaali and her boyfriend at the beach",
      quality: 88,
      sizes: "(min-width: 1200px) 44vw, (min-width: 768px) 50vw, 100vw",
      sources: {
        desktop: {
          src: "/assets/images/story/jaali-and-boyfriend-desktop.webp",
          width: 888,
          height: 1110,
        },
        tablet: {
          src: "/assets/images/story/jaali-and-boyfriend-tablet.webp",
          width: 720,
          height: 900,
        },
        mobile: {
          src: "/assets/images/story/jaali-and-boyfriend-mobile.webp",
          width: 560,
          height: 700,
        },
      },
    },
    timeline: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Jaali's family seated together beside a framed photograph of Jaali.",
      decorative: false,
      fallbackAspectRatio: "4/5",
      fallbackLabel: "Jaali's family with a framed photograph of Jaali",
      quality: 88,
      sizes: "(min-width: 1200px) 38vw, (min-width: 768px) 50vw, 100vw",
      sources: rememberingJaaliSources,
    },
    quote: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Jaali's family seated together beside a framed photograph of Jaali.",
      decorative: false,
      fallbackAspectRatio: "4/5",
      fallbackLabel: "Jaali's family with a framed photograph of Jaali",
      quality: 88,
      sizes: "(min-width: 1200px) 38vw, (min-width: 768px) 50vw, 100vw",
      sources: rememberingJaaliSources,
    },
    resources: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Front and back views of a black Justice for Jaali hoodie.",
      decorative: false,
      fallbackAspectRatio: "1/1",
      fallbackLabel: "Justice for Jaali hoodie",
      quality: 88,
      sizes: "(min-width: 1200px) 62vw, (min-width: 768px) 75vw, 100vw",
      sources: {
        desktop: {
          src: "/assets/images/banners/justice-for-jaali-hoodie-desktop.webp",
          width: 1200,
          height: 900,
        },
        tablet: {
          src: "/assets/images/banners/justice-for-jaali-hoodie-tablet.webp",
          width: 960,
          height: 720,
        },
        mobile: {
          src: "/assets/images/banners/justice-for-jaali-hoodie-mobile.webp",
          width: 720,
          height: 720,
        },
      },
    },
    donate: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Steak Night fundraiser poster supporting Justice for Jaali on July 21, 2026.",
      decorative: false,
      fallbackAspectRatio: "2/3",
      fallbackLabel: "Justice for Jaali Steak Night fundraiser poster",
      quality: 92,
      sizes: "(min-width: 1200px) 28vw, (min-width: 768px) 38vw, 100vw",
      sources: {
        desktop: {
          src: "/assets/images/banners/steak-night-desktop.webp",
          width: 600,
          height: 900,
        },
        tablet: {
          src: "/assets/images/banners/steak-night-tablet.webp",
          width: 560,
          height: 840,
        },
        mobile: {
          src: "/assets/images/banners/steak-night-mobile.webp",
          width: 480,
          height: 720,
        },
      },
    },
    vision: {
      status: "ready",
      // TODO(content): Confirm final alternative text with the family/editorial team.
      alt: "Jaali smiling outdoors in warm sunset light.",
      decorative: false,
      fallbackAspectRatio: "4/5",
      fallbackLabel: "Portrait of Jaali",
      quality: 88,
      sizes: "(min-width: 1200px) 44vw, (min-width: 768px) 50vw, 100vw",
      sources: jaaliPortraitSources,
    },
  },
  metadata: {
    // TODO(assets): Add the approved favicon file when supplied.
    favicon: {
      status: "pending",
    },
    openGraph: {
      status: "ready",
      alt: "Jaali smiling outdoors in warm sunset light.",
      height: 630,
      src: "/assets/images/hero/jaali-banner-open-graph.webp",
      type: "image/webp",
      width: 1200,
    },
  },
} as const satisfies AssetManifest;
