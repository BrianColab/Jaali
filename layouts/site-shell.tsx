import type { ReactNode } from "react";

import { DonationDrawer } from "@/components/donation/donation-drawer";
import { TextRevealController } from "@/components/motion/text-reveal-controller";
import { RouteScrollRestoration } from "@/components/navigation/route-scroll-restoration";
import { SkipLink } from "@/components/navigation/skip-link";
import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";

type SiteShellProps = Readonly<{
  children: ReactNode;
}>;

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      <RouteScrollRestoration />
      <TextRevealController />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <DonationDrawer />
    </>
  );
}
