"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

import { MemoryEditFields } from "./memory-edit-fields";

type AdminQueueRowProps = Readonly<{
  caption: string | null;
  createdAt: string;
  id: string;
  imageUrl: string;
  uploaderName: string | null;
}>;

export function AdminQueueRow({
  caption,
  createdAt,
  id,
  imageUrl,
  uploaderName,
}: AdminQueueRowProps) {
  const router = useRouter();
  const [pending, setPending] = useState<"approve" | "decline">();
  const [error, setError] = useState<string>();

  async function handleAction(action: "approve" | "decline") {
    setPending(action);
    setError(undefined);

    const response = await fetch(`/api/admin/memories/${id}/${action}`, {
      method: "POST",
    });

    if (!response.ok) {
      setPending(undefined);
      setError("Something went wrong. Please try again.");
      return;
    }

    router.refresh();
  }

  return (
    <li className="admin-queue-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="admin-queue-row__image"
        src={imageUrl}
        alt={caption ?? "Submitted memory photo pending review"}
      />
      <div className="admin-queue-row__details">
        <Text size="small" muted>
          {new Date(createdAt).toLocaleString("en-CA")}
        </Text>
        <Text>{uploaderName ?? "Anonymous"}</Text>
        {caption ? <Text size="small">{caption}</Text> : null}
        <MemoryEditFields
          id={id}
          uploaderName={uploaderName}
          caption={caption}
        />
        {error ? (
          <Text size="small" className="form-error" role="alert">
            {error}
          </Text>
        ) : null}
      </div>
      <div className="admin-queue-row__actions">
        <Button
          type="button"
          size="medium"
          disabled={pending !== undefined}
          onClick={() => handleAction("approve")}
        >
          {pending === "approve" ? "Approving…" : "Approve"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          disabled={pending !== undefined}
          onClick={() => handleAction("decline")}
        >
          {pending === "decline" ? "Declining…" : "Decline"}
        </Button>
      </div>
    </li>
  );
}
