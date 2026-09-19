import type { ReactNode } from "react";

import { ContactDrawer } from "@/components/contact/contact-drawer";
import { UpcomingEventPrompt } from "@/components/events/upcoming-event-prompt";
import { TextRevealController } from "@/components/motion/text-reveal-controller";
import { AdminLoginShortcut } from "@/components/navigation/admin-login-shortcut";
import { RouteScrollRestoration } from "@/components/navigation/route-scroll-restoration";
import { SkipLink } from "@/components/navigation/skip-link";
import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { events } from "@/data/events";
import { sortEventsByDateDesc } from "@/lib/events";

type SiteShellProps = Readonly<{
  children: ReactNode;
}>;

export function SiteShell({ children }: SiteShellProps) {
  const upcomingEvent = sortEventsByDateDesc(events).find(
    (event) => event.status !== "past",
  );

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
      {upcomingEvent ? (
        <UpcomingEventPrompt
          date={upcomingEvent.dateDisplay}
          title={upcomingEvent.title}
        />
      ) : null}
      <ContactDrawer />
    </>
  );
}
