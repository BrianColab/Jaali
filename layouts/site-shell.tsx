import type { ReactNode } from "react";

import { ContactDrawer } from "@/components/contact/contact-drawer";
import { TextRevealController } from "@/components/motion/text-reveal-controller";
import { AdminLoginShortcut } from "@/components/navigation/admin-login-shortcut";
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
      <AdminLoginShortcut />
      <TextRevealController />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <ContactDrawer />
    </>
  );
}
