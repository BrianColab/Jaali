import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/layouts/site-shell";
import { getFaviconMetadata, getOpenGraphImages } from "@/lib/asset-metadata";
import { metadataAssets } from "@/lib/assets";
import { bodyFont, displayFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const faviconMetadata = getFaviconMetadata(metadataAssets.favicon);
const openGraphImages = getOpenGraphImages(metadataAssets.openGraph);

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  description: siteConfig.description,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: siteConfig.url,
  alternates: {
    canonical: "/",
  },
  ...(faviconMetadata ? { icons: faviconMetadata } : {}),
  openGraph: {
    description: siteConfig.description,
    title: siteConfig.name,
    siteName: siteConfig.name,
    type: "website",
    url: "/",
    ...(openGraphImages ? { images: openGraphImages } : {}),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en-CA"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        <noscript>
          <style>{`.motion-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
