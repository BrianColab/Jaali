import type { MetadataRoute } from "next";

import { siteRoutes } from "@/data/site-routes";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.flatMap((route) => [
    { url: new URL(route.href, siteConfig.url).toString() },
    ...(route.children ?? []).map((child) => ({
      url: new URL(child.href, siteConfig.url).toString(),
    })),
  ]);
}
