import type { Metadata } from "next";

export function createPageMetadata(
  title: string,
  path: `/${string}`,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
    },
  };
}
