import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Heading } from "@/components/ui/typography";
import type { SiteEvent } from "@/types/events";

type EventListItemProps = Readonly<{
  event: SiteEvent;
}>;

export function EventListItem({ event }: EventListItemProps) {
  return (
    <li className="event-list-item">
      <div className="event-list-item__thumb">
        <Image
          className="event-list-item__image"
          src={event.image}
          alt=""
          fill
          sizes="4.5rem"
        />
      </div>

      <div className="event-list-item__body">
        <p className="event-list-item__date">{event.dateDisplay}</p>
        <Heading level={3} variant="card" className="event-list-item__title">
          {event.title}
        </Heading>
        <p className="event-list-item__location">{event.location}</p>
      </div>

      {event.url ? (
        <a
          className="event-list-item__action"
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${event.actionLabel ?? "Learn more"}: ${event.title} (opens in a new tab)`}
        >
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </a>
      ) : null}
    </li>
  );
}
