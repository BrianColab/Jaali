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
  description:
    "This site exists in Jaali’s memory—and because what happened to her must never happen again.",
  name: "Justice for Jaali",
  url: getSiteUrl(),
  themeColor: "#F7F5F2",
} as const;
