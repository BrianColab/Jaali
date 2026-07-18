import type { MetadataRoute } from "next";

import { siteRoutes } from "@/data/site-routes";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map(({ href }) => ({
    url: new URL(href, siteConfig.url).toString(),
  }));
}
