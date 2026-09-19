"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import { useEffect, useState } from "react";

const dismissalKey = "j4j-upcoming-event-dismissed";

type UpcomingEventPromptProps = Readonly<{
  date: string;
  title: string;
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
    <aside className="upcoming-event-prompt" aria-label="Upcoming event">
      <button
        className="upcoming-event-prompt__close"
        type="button"
        onClick={dismiss}
        aria-label="Dismiss upcoming event notice"
      >
        <X aria-hidden="true" size={17} strokeWidth={2} />
      </button>

      <div className="upcoming-event-prompt__eyebrow">
        <CalendarDays aria-hidden="true" size={15} strokeWidth={2} />
        Upcoming event
      </div>
      <p className="upcoming-event-prompt__title">{title}</p>
      <p className="upcoming-event-prompt__date">{date}</p>
      <Link className="upcoming-event-prompt__link" href="/events">
        View event details
        <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
      </Link>
    </aside>
  );
}
