import type { SiteRoute } from "@/types/navigation";

export const siteRoutes: readonly SiteRoute[] = [
  { label: "Home", href: "/" },
  { label: "Jaali’s Story", href: "/jaalis-story" },
  {
    label: "Get Help Now",
    href: "/get-help-now",
    children: [
      { label: "Maternal Health", href: "/maternal-health" },
      { label: "Know Your Rights", href: "/know-your-rights" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Share Your Experience", href: "/share-your-experience" },
      { label: "Advocacy", href: "/advocacy" },
    ],
  },
  { label: "Remembering Jaali", href: "/remembering-jaali" },
  { label: "Contact Us", href: "/contact" },
];
