import { redirect } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { getApprovedMemories, getPendingMemories } from "@/lib/memories";
import { hasAdminSession } from "@/lib/require-admin";
import { getMemoryImageUrl } from "@/lib/storage";

import { AdminApprovedGrid } from "./approved-grid";
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

  const [pendingMemories, approvedMemories] = await Promise.all([
    getPendingMemories(),
    getApprovedMemories(),
  ]);

  return (
    <main className="admin-queue">
      <Container className="admin-queue__container">
        <Heading level={1} variant="section">
          Review Memory Photos
        </Heading>
        <Text muted>
          {pendingMemories.length === 0
            ? "No photos are waiting for review."
            : `${pendingMemories.length} photo${pendingMemories.length === 1 ? "" : "s"} waiting for review.`}
        </Text>
        <ul className="admin-queue__list">
          {pendingMemories.map((memory) => (
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

        <Heading
          level={2}
          variant="card"
          className="admin-queue__section-title"
        >
          Approved Photos
        </Heading>
        <Text muted>
          {approvedMemories.length === 0
            ? "No photos are live on the gallery yet."
            : "Drag to reorder how photos appear on the public gallery, or delete one."}
        </Text>
        <AdminApprovedGrid
          key={approvedMemories
            .map(
              (memory) =>
                `${memory.id}:${memory.uploaderName}:${memory.caption}`,
            )
            .join(",")}
          memories={approvedMemories.map((memory) => ({
            id: memory.id,
            imageUrl: getMemoryImageUrl(memory.imageKey),
            uploaderName: memory.uploaderName,
            caption: memory.caption,
          }))}
        />
      </Container>
    </main>
  );
}
