import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";

import type {
  ImageAssetSource,
  ReadyResponsiveImageAsset,
  ResponsiveImageAsset,
} from "@/types/assets";
import { cn } from "@/utils/cn";

type ResponsiveAssetProps = Readonly<{
  asset: ResponsiveImageAsset;
  className?: string;
  priority?: boolean;
}>;

type AssetStyle = CSSProperties &
  Readonly<{
    "--asset-desktop-ratio"?: string;
    "--asset-mobile-ratio": string;
    "--asset-tablet-ratio"?: string;
  }>;

function getRatio(source: ImageAssetSource) {
  return `${source.width}/${source.height}`;
}

function getSourceProps(
  source: ImageAssetSource,
  asset: ReadyResponsiveImageAsset,
) {
  return getImageProps({
    alt: asset.decorative ? "" : asset.alt,
    height: source.height,
    quality: asset.quality ?? 85,
    sizes: asset.sizes,
    src: source.src,
    width: source.width,
  }).props;
}

function assertAccessibleAsset(asset: ReadyResponsiveImageAsset) {
  if (!asset.decorative && !asset.alt.trim()) {
    throw new Error(
      "Ready informative image assets must include approved alternative text.",
    );
  }

  if (asset.decorative && asset.alt) {
    throw new Error("Decorative image assets must use an empty alt value.");
  }

  if (
    asset.quality !== undefined &&
    (asset.quality < 1 || asset.quality > 100)
  ) {
    throw new Error("Image asset quality must be between 1 and 100.");
  }

  for (const source of Object.values(asset.sources)) {
    if (source && (source.width <= 0 || source.height <= 0)) {
      throw new Error("Ready image assets must include positive dimensions.");
    }
  }
}

export function ResponsiveAsset({
  asset,
  className,
  priority = false,
}: ResponsiveAssetProps) {
  if (asset.status === "pending") {
    return (
      <div
        className={cn(
          "responsive-asset",
          "responsive-asset--pending",
          className,
        )}
        style={{ aspectRatio: asset.fallbackAspectRatio }}
        role="img"
        aria-label={asset.fallbackLabel}
      >
        <span className="responsive-asset__status" aria-hidden="true">
          {asset.fallbackLabel}
        </span>
      </div>
    );
  }

  assertAccessibleAsset(asset);

  const tabletProps = asset.sources.tablet
    ? getSourceProps(asset.sources.tablet, asset)
    : undefined;
  const desktopProps = asset.sources.desktop
    ? getSourceProps(asset.sources.desktop, asset)
    : undefined;
  const style: AssetStyle = {
    "--asset-mobile-ratio": getRatio(asset.sources.mobile),
    ...(asset.sources.tablet
      ? { "--asset-tablet-ratio": getRatio(asset.sources.tablet) }
      : {}),
    ...(asset.sources.desktop
      ? { "--asset-desktop-ratio": getRatio(asset.sources.desktop) }
      : {}),
  };

  return (
    <picture
      className={cn("responsive-asset", className)}
      style={style}
      data-asset-status="ready"
    >
      {desktopProps ? (
        <source
          media="(min-width: 75rem)"
          srcSet={desktopProps.srcSet}
          sizes={desktopProps.sizes}
        />
      ) : null}
      {tabletProps ? (
        <source
          media="(min-width: 48rem)"
          srcSet={tabletProps.srcSet}
          sizes={tabletProps.sizes}
        />
      ) : null}
      <Image
        alt={asset.decorative ? "" : asset.alt}
        className="responsive-asset__image"
        height={asset.sources.mobile.height}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        quality={asset.quality ?? 85}
        sizes={asset.sizes}
        src={asset.sources.mobile.src}
        width={asset.sources.mobile.width}
      />
    </picture>
  );
}
