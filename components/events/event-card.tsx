import Image from "next/image";
import { ArrowUpRight, CalendarDays, CalendarPlus, MapPin } from "lucide-react";

import { Heading, Text } from "@/components/ui/typography";
import { formatEventDateTile } from "@/lib/events";
import type { SiteEvent } from "@/types/events";

type EventCardProps = Readonly<{
  event: SiteEvent;
}>;

function getEventActionHref(event: SiteEvent): string | undefined {
  if (!event.url || !event.url.toLowerCase().startsWith("mailto:")) {
    return event.url;
  }

  const separator = event.url.includes("?") ? "&" : "?";
  return `${event.url}${separator}subject=${encodeURIComponent(event.title)}`;
}

export function EventCard({ event }: EventCardProps) {
  const dateTile = formatEventDateTile(event.date);
  const actionHref = getEventActionHref(event);

  return (
    <article className="event-card">
      <a
        className="event-card__poster"
        href={event.image}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View full poster: ${event.title} (opens in a new tab)`}
      >
        <Image
          className="event-card__image"
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 64rem) 28rem, 90vw"
        />
        <span className="event-card__poster-cta">
          View full poster
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
        </span>
      </a>

      <div className="event-card__body">
        {event.status === "past" ? (
          <p className="event-card__status">This event has passed</p>
        ) : null}

        <div className="event-card__topline">
          <div className="event-card__date-tile" aria-hidden="true">
            <span>{dateTile.month}</span>
            <strong>{dateTile.day}</strong>
          </div>
          <p className="event-card__date">
            <CalendarDays aria-hidden="true" size={17} strokeWidth={2} />
            {event.dateDisplay}
          </p>
        </div>

        <Heading level={3} variant="card" className="event-card__title">
          {event.title}
        </Heading>

        <p className="event-card__location">
          <MapPin aria-hidden="true" size={16} strokeWidth={2} />
          {event.location}
          {event.address ? `, ${event.address}` : ""}
        </p>

        <Text size="small" className="event-card__summary">
          {event.summary}
        </Text>

        {event.highlight ? (
          <p className="event-card__highlight">{event.highlight}</p>
        ) : null}

        {event.details && event.details.length > 0 ? (
          <dl className="event-card__details">
            {event.details.map((detail) => (
              <div className="event-card__detail" key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {event.calendarFile || actionHref ? (
          <div className="event-card__actions">
            {event.calendarFile ? (
              <div className="event-card__calendar">
                <a
                  className="event-card__calendar-button"
                  href={event.calendarFile}
                  download
                >
                  <CalendarPlus aria-hidden="true" size={18} strokeWidth={2} />
                  Add to calendar
                </a>
                <span>Google · Apple · Outlook</span>
              </div>
            ) : null}

            {actionHref ? (
              <a
                className="event-card__action"
                href={actionHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.actionLabel ?? "Learn more"}
                <span className="visually-hidden">
                  : {event.title} (opens in a new tab)
                </span>
                <ArrowUpRight
                  className="event-card__action-icon"
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.75}
                />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
