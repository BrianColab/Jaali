import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { createPageMetadata } from "@/lib/seo";
import { getApprovedMemories } from "@/lib/memories";
import { getMemoryImageUrl } from "@/lib/storage";

import { MemoryUploadButton } from "./memory-upload-button";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata(
  "Remembering Jaali",
  "/remembering-jaali",
);

export default async function RememberingJaaliPage() {
  const memories = await getApprovedMemories();

  return (
    <main>
      <section
        id="remembering-jaali"
        className="section section--warm-ivory"
        aria-labelledby="remembering-jaali-heading"
      >
        <Container>
          <header className="section__header remembering-jaali__header">
            <Eyebrow>Justice for Jaali</Eyebrow>
            <Heading
              id="remembering-jaali-heading"
              level={1}
              variant="section"
              className="remembering-jaali__title"
            >
              Remembering Jaali
            </Heading>
            <Text size="lead" className="remembering-jaali__intro">
              Family, friends and community members are sharing photos and
              memories of Jaali. Every photo is reviewed before it appears here.
            </Text>
            <MemoryUploadButton />
          </header>

          {memories.length === 0 ? (
            <Text muted>No memory photos have been shared yet.</Text>
          ) : (
            <ul className="memory-gallery">
              {memories.map((memory) => (
                <li key={memory.id} className="memory-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="memory-card__image"
                    src={getMemoryImageUrl(memory.imageKey)}
                    alt={memory.caption ?? "A memory photo of Jaali"}
                    loading="lazy"
                  />
                  {memory.caption || memory.uploaderName ? (
                    <div className="memory-card__meta">
                      {memory.caption ? (
                        <Text size="small">{memory.caption}</Text>
                      ) : null}
                      {memory.uploaderName ? (
                        <Text size="small" muted>
                          — {memory.uploaderName}
                        </Text>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  );
}
