import { EventCard } from "@/components/events/event-card";
import { EventListItem } from "@/components/events/event-list-item";
import { HeaderMotifs } from "@/components/brand/header-motifs";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { events } from "@/data/events";
import { buildEventJsonLd, sortEventsByDateDesc } from "@/lib/events";

export function EventsPage() {
  const sortedEvents = sortEventsByDateDesc(events);
  const [featuredEvent, ...otherEvents] = sortedEvents;

  return (
    <article className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sortedEvents.map(buildEventJsonLd)),
        }}
      />
      <header className="content-page__hero">
        <HeaderMotifs seed="Justice for Jaali Community Events" />
        <Container>
          <Eyebrow>Events</Eyebrow>
          <span className="media-page__accent" aria-hidden="true" />
          <Heading id="page-title" level={1} variant="display">
            Community Events
          </Heading>
          <Text className="content-page__intro" size="lead">
            Walks, gatherings and ceremonies where Jaali is remembered and the
            call for justice continues. Check back for future dates.
          </Text>
        </Container>
      </header>

      <section className="events-page" aria-labelledby="events-heading">
        <Container>
          <Heading
            id="events-heading"
            level={2}
            variant="section"
            className="visually-hidden"
          >
            Events
          </Heading>

          {featuredEvent ? (
            <>
              <div className="events-page__section-heading">
                <p className="events-page__eyebrow">Featured gathering</p>
                <p className="events-page__section-note">Everyone is welcome</p>
              </div>
              <EventCard event={featuredEvent} />
            </>
          ) : (
            <p className="events-page__empty">
              No upcoming events are listed right now. Check back soon.
            </p>
          )}

          {otherEvents.length > 0 ? (
            <div className="events-page__more">
              <Heading
                level={2}
                variant="card"
                className="events-page__more-heading"
              >
                Previous
              </Heading>
              <ul className="events-page__list">
                {otherEvents.map((event) => (
                  <EventListItem key={event.id} event={event} />
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>
    </article>
  );
}
