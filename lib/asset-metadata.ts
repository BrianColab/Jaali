import type { Metadata } from "next";

import type { FaviconAsset, OpenGraphAsset } from "@/types/assets";

export function getFaviconMetadata(
  asset: FaviconAsset,
): Metadata["icons"] | undefined {
  if (asset.status === "pending") return undefined;

  return {
    icon: [
      {
        url: asset.href,
        ...(asset.sizes ? { sizes: asset.sizes } : {}),
        ...(asset.type ? { type: asset.type } : {}),
      },
    ],
  };
}

export function getOpenGraphImages(
  asset: OpenGraphAsset,
): NonNullable<Metadata["openGraph"]>["images"] | undefined {
  if (asset.status === "pending") return undefined;

  if (!asset.alt.trim() || asset.width <= 0 || asset.height <= 0) {
    throw new Error(
      "Ready Open Graph assets require alternative text and positive dimensions.",
    );
  }

  return [
    {
      alt: asset.alt,
      height: asset.height,
      url: asset.src,
      width: asset.width,
      ...(asset.type ? { type: asset.type } : {}),
    },
  ];
}
