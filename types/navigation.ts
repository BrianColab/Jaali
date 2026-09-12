export type SiteRoute = Readonly<{
  label: string;
  href: `/${string}` | "/";
  children?: readonly SiteRoute[];
}>;
