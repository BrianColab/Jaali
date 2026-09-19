"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

type EventSocialShareProps = Readonly<{
  date: string;
  title: string;
}>;

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.7 22v-9h3l.45-3.5H13.7V7.26c0-1.01.28-1.7 1.74-1.7h1.86V2.43c-.32-.04-1.43-.13-2.72-.13-2.69 0-4.53 1.64-4.53 4.66V9.5H7v3.5h3.05v9h3.65Z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.97 2h6.4l4.42 5.84L18.9 2Zm-1.09 17.84h1.72L8.43 4.05H6.58l11.23 15.79Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.18 2A3.02 3.02 0 0 0 4 7.02v9.96A3.02 3.02 0 0 0 7.02 20h9.96A3.02 3.02 0 0 0 20 16.98V7.02A3.02 3.02 0 0 0 16.98 4H7.02Zm10.73 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

export function EventSocialShare({ date, title }: EventSocialShareProps) {
  const [status, setStatus] = useState("");

  function eventUrl() {
    return `${window.location.origin}/events`;
  }

  function openShareWindow(url: string) {
    window.open(url, "event-share", "noopener,noreferrer,width=720,height=620");
  }

  async function shareToApps() {
    if (navigator.share) {
      await navigator
        .share({ title, text: `${title} — ${date}`, url: eventUrl() })
        .catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(eventUrl());
    setStatus("Event link copied");
  }

  return (
    <div className="event-card__social-share">
      <span className="event-card__social-label">Share this event</span>
      <div className="event-card__social-links">
        <button
          type="button"
          onClick={() =>
            openShareWindow(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl())}`,
            )
          }
          aria-label="Share this event on Facebook"
          title="Share on Facebook"
        >
          <FacebookIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            openShareWindow(
              `https://x.com/intent/post?text=${encodeURIComponent(`${title} — ${date}`)}&url=${encodeURIComponent(eventUrl())}`,
            )
          }
          aria-label="Share this event on X"
          title="Share on X"
        >
          <XIcon />
        </button>
        <button
          type="button"
          onClick={shareToApps}
          aria-label="Share this event to Instagram or another app"
          title="Share to Instagram or another app"
        >
          <InstagramIcon />
        </button>
        <button
          type="button"
          onClick={shareToApps}
          aria-label="Open more sharing options"
          title="More sharing options"
        >
          <Share2 aria-hidden="true" />
        </button>
      </div>
      {status ? (
        <span className="event-card__social-status" role="status">
          {status}
        </span>
      ) : null}
    </div>
  );
}
