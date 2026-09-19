"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

const dismissalKey = "j4j-upcoming-event-dismissed";

type UpcomingEventPromptProps = Readonly<{
  date: string;
  title: string;
}>;

export function UpcomingEventPrompt({ date, title }: UpcomingEventPromptProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

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

  function getShareUrl() {
    return `${window.location.origin}/events`;
  }

  function openShareWindow(url: string) {
    window.open(url, "event-share", "noopener,noreferrer,width=720,height=620");
  }

  async function shareToInstagram() {
    const shareData = { title, text: `${title} — ${date}`, url: getShareUrl() };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(getShareUrl());
    setShareStatus("Link copied — paste it into Instagram");
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

      <div
        className="upcoming-event-prompt__share"
        aria-label="Share this event"
      >
        <span className="upcoming-event-prompt__share-label">
          <Share2 aria-hidden="true" size={13} strokeWidth={2} />
          Share
        </span>
        <button
          type="button"
          onClick={() =>
            openShareWindow(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
            )
          }
          aria-label="Share this event on Facebook"
        >
          Facebook
        </button>
        <button
          type="button"
          onClick={() =>
            openShareWindow(
              `https://x.com/intent/post?text=${encodeURIComponent(`${title} — ${date}`)}&url=${encodeURIComponent(getShareUrl())}`,
            )
          }
          aria-label="Share this event on X"
        >
          X
        </button>
        <button
          type="button"
          onClick={shareToInstagram}
          aria-label="Share this event to Instagram"
        >
          Instagram
        </button>
      </div>
      {shareStatus ? (
        <p className="upcoming-event-prompt__share-status" role="status">
          {shareStatus}
        </p>
      ) : null}
    </aside>
  );
}
