import { HeaderMotifs } from "@/components/brand/header-motifs";
import { MediaArchive } from "@/components/media/media-archive";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { mediaItems } from "@/data/media-inventory";
import { selectPublished } from "@/lib/media-archive";

export function MediaPage() {
  const publishedItems = selectPublished(mediaItems);

  return (
    <article className="content-page">
      <header className="content-page__hero">
        <HeaderMotifs seed="Justice for Jaali in the Media" />
        <Container>
          <Eyebrow>Media &amp; Milestones</Eyebrow>
          <span className="media-page__accent" aria-hidden="true" />
          <Heading id="page-title" level={1} variant="display">
            Justice for Jaali in the Media
          </Heading>
          <Text className="content-page__intro" size="lead">
            From the first calls for answers to national action, follow the
            reporting, community response and milestones that have carried
            Jaali&rsquo;s story forward.
          </Text>
        </Container>
      </header>

      <section
        className="media-archive"
        aria-labelledby="media-archive-heading"
      >
        <Container>
          <Heading
            id="media-archive-heading"
            level={2}
            variant="section"
            className="visually-hidden"
          >
            Coverage archive
          </Heading>
          <MediaArchive items={publishedItems} />
        </Container>
      </section>
    </article>
  );
}
