import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { createPageMetadata } from "@/lib/seo";
import { getApprovedMemories } from "@/lib/memories";
import { getMemoryImageUrl } from "@/lib/storage";

import { MemoryGallery } from "./memory-gallery";
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
            <MemoryGallery
              memories={memories.map((memory) => ({
                id: memory.id,
                imageUrl: getMemoryImageUrl(memory.imageKey),
                caption: memory.caption,
                uploaderName: memory.uploaderName,
              }))}
            />
          )}
        </Container>
      </section>
    </main>
  );
}
