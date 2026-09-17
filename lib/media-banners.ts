import type { MediaItem } from "@/types/media";

type MediaBanner = Readonly<{
  objectPosition: string;
  src: string;
  fit?: "cover" | "contain";
}>;

// Fixed banners for specific stories, checked before the rotating set below.
const mediaBannerOverrides: Readonly<Record<string, MediaBanner>> = {
  "resolution-13-2026": {
    src: "/assets/images/brand/assembly-of-first-nations-logo.png",
    objectPosition: "center",
    fit: "contain",
  },
};

const mediaBanners: readonly [MediaBanner, ...MediaBanner[]] = [
  {
    src: "/assets/images/media-banners/01-golden-feather.webp",
    objectPosition: "64% center",
  },
  {
    src: "/assets/images/media-banners/02-white-wildflowers.webp",
    objectPosition: "center",
  },
  {
    src: "/assets/images/media-banners/03-hand-drum.webp",
    objectPosition: "60% center",
  },
  {
    src: "/assets/images/media-banners/04-sunset-lake.webp",
    objectPosition: "center",
  },
  {
    src: "/assets/images/media-banners/05-prairie-vista.webp",
    objectPosition: "center",
  },
  {
    src: "/assets/images/media-banners/06-beads-woven-textures.webp",
    objectPosition: "center",
  },
  {
    src: "/assets/images/media-banners/07-misty-reeds.webp",
    objectPosition: "center",
  },
  {
    src: "/assets/images/media-banners/08-sage-river-stones.webp",
    objectPosition: "58% center",
  },
  {
    src: "/assets/images/media-banners/09-birch-woodland.webp",
    objectPosition: "38% center",
  },
  {
    src: "/assets/images/media-banners/10-prairie-sunset.webp",
    objectPosition: "center",
  },
] as const;

/**
 * A stable 32-bit FNV-1a hash with a short avalanche pass. The salt makes the
 * current archive feel mixed rather than sequential without coupling images to
 * array order; adding, sorting or filtering stories never changes assignments.
 */
function hashStoryKey(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  hash += hash << 13;
  hash ^= hash >>> 7;
  hash += hash << 3;
  hash ^= hash >>> 17;
  hash += hash << 5;

  return hash >>> 0;
}

export function getMediaBanner(story: MediaItem): MediaBanner {
  const storyKey = story.id || story.url || story.headline;
  const override = mediaBannerOverrides[storyKey];
  if (override) return override;

  const bannerIndex =
    hashStoryKey(`media-25:${storyKey}`) % mediaBanners.length;

  return mediaBanners[bannerIndex] ?? mediaBanners[0];
}

export const mediaBannerPaths = mediaBanners.map((banner) => banner.src);
