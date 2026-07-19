export type AssetPath = `/${string}`;

export type ImageAssetSource = Readonly<{
  height: number;
  src: AssetPath;
  width: number;
}>;

export type ResponsiveImageSources = Readonly<{
  desktop?: ImageAssetSource;
  mobile: ImageAssetSource;
  tablet?: ImageAssetSource;
}>;

type AssetPresentation = Readonly<{
  fallbackAspectRatio: `${number}/${number}`;
  fallbackLabel: string;
  sizes: string;
}>;

export type PendingResponsiveImageAsset = AssetPresentation &
  Readonly<{
    status: "pending";
  }>;

export type ReadyResponsiveImageAsset = AssetPresentation &
  Readonly<{
    alt: string;
    caption?: string;
    credit?: string;
    decorative: boolean;
    quality?: number;
    sources: ResponsiveImageSources;
    status: "ready";
  }>;

export type ResponsiveImageAsset =
  PendingResponsiveImageAsset | ReadyResponsiveImageAsset;

export type PendingOpenGraphAsset = Readonly<{
  status: "pending";
}>;

export type ReadyOpenGraphAsset = Readonly<{
  alt: string;
  height: number;
  src: AssetPath;
  status: "ready";
  type?: string;
  width: number;
}>;

export type OpenGraphAsset = PendingOpenGraphAsset | ReadyOpenGraphAsset;

export type PendingFaviconAsset = Readonly<{
  status: "pending";
}>;

export type ReadyFaviconAsset = Readonly<{
  href: AssetPath;
  sizes?: string;
  status: "ready";
  type?: string;
}>;

export type FaviconAsset = PendingFaviconAsset | ReadyFaviconAsset;

export type HomepageAssetManifest = Readonly<{
  donate: ResponsiveImageAsset;
  hero: ResponsiveImageAsset;
  quote: ResponsiveImageAsset;
  resources: ResponsiveImageAsset;
  story: ResponsiveImageAsset;
  timeline: ResponsiveImageAsset;
  vision: ResponsiveImageAsset;
}>;

export type AssetManifest = Readonly<{
  homepage: HomepageAssetManifest;
  metadata: Readonly<{
    favicon: FaviconAsset;
    openGraph: OpenGraphAsset;
  }>;
}>;
