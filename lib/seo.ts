import type { Metadata } from "next";

export function createPageMetadata(
  title: string,
  path: `/${string}`,
): Metadata {
  return {
    title,
    alternates: {
      canonical: path,
    },
  };
}
