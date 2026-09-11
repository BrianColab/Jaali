import type { SiteRoute } from "@/types/navigation";

export const siteRoutes = [
  { label: "Home", href: "/" },
  { label: "Jaali’s Story", href: "/jaalis-story" },
  { label: "Get Help Now", href: "/get-help-now" },
  { label: "Maternal Health", href: "/maternal-health" },
  { label: "Know Your Rights", href: "/know-your-rights" },
  { label: "Share Your Experience", href: "/share-your-experience" },
  { label: "Resources", href: "/resources" },
  { label: "Advocacy", href: "/advocacy" },
  { label: "Remembering Jaali", href: "/remembering-jaali" },
  { label: "Contact Us", href: "/contact" },
] as const satisfies readonly SiteRoute[];
