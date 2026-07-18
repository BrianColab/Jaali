const DEFAULT_DEVELOPMENT_URL = "http://localhost:3000";

function getSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_DEVELOPMENT_URL;

  try {
    return new URL(configuredUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

export const siteConfig = {
  name: "Justice for Jaali",
  url: getSiteUrl(),
  themeColor: "#F7F5F2",
} as const;
