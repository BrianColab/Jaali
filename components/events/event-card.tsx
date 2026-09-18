import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Heading, Text } from "@/components/ui/typography";
import type { SiteEvent } from "@/types/events";

type EventCardProps = Readonly<{
  event: SiteEvent;
}>;

export function EventCard({ event }: EventCardProps) {
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
      </a>

      <div className="event-card__body">
        <p className="event-card__date">
          <CalendarDays aria-hidden="true" size={16} strokeWidth={2} />
          {event.dateDisplay}
        </p>

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

        {event.url ? (
          <a
            className="event-card__action"
            href={event.url}
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
    </article>
  );
}
