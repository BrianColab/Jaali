import { redirect } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { getPendingMemories } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";
import { getMemoryImageUrl } from "@/lib/storage";

import { AdminQueueRow } from "./queue-row";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Review Memory Photos",
  robots: { index: false, follow: false },
};

export default async function AdminMemoriesPage() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const memories = await getPendingMemories();

  return (
    <main className="admin-queue">
      <Container className="admin-queue__container">
        <Heading level={1} variant="section">
          Review Memory Photos
        </Heading>
        <Text muted>
          {memories.length === 0
            ? "No photos are waiting for review."
            : `${memories.length} photo${memories.length === 1 ? "" : "s"} waiting for review.`}
        </Text>
        <ul className="admin-queue__list">
          {memories.map((memory) => (
            <AdminQueueRow
              key={memory.id}
              id={memory.id}
              imageUrl={getMemoryImageUrl(memory.imageKey)}
              uploaderName={memory.uploaderName}
              caption={memory.caption}
              createdAt={memory.createdAt}
            />
          ))}
        </ul>
      </Container>
    </main>
  );
}
