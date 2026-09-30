"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import { useEffect, useState } from "react";

const dismissalKey = "j4j-upcoming-event-dismissed";

type UpcomingEventPromptProps = Readonly<{
  date?: string | undefined;
  title?: string | undefined;
}>;

export function UpcomingEventPrompt({ date, title }: UpcomingEventPromptProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setVisible(window.sessionStorage.getItem(dismissalKey) !== "true");
    }, 0);

    return () => window.clearTimeout(revealTimer);
  }, []);

  function dismiss() {
    window.sessionStorage.setItem(dismissalKey, "true");
    setVisible(false);
  }

  if (!visible || pathname === "/events" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      className="upcoming-event-prompt"
      aria-label={title ? "Upcoming event" : "Community events"}
    >
      <button
        className="upcoming-event-prompt__close"
        type="button"
        onClick={dismiss}
        aria-label="Dismiss events notice"
      >
        <X aria-hidden="true" size={17} strokeWidth={2} />
      </button>

      <div className="upcoming-event-prompt__eyebrow">
        <CalendarDays aria-hidden="true" size={15} strokeWidth={2} />
        {title ? "Upcoming event" : "Community events"}
      </div>
      <p className="upcoming-event-prompt__title">
        {title ?? "Gatherings where Jaali is remembered"}
      </p>
      <p className="upcoming-event-prompt__date">
        {date ?? "See past events and check back for new dates."}
      </p>
      <Link className="upcoming-event-prompt__link" href="/events">
        {title ? "View event details" : "View events"}
        <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
      </Link>
    </aside>
  );
}
