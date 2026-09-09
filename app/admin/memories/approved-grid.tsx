"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type DragEvent } from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

import { MemoryEditFields } from "./memory-edit-fields";

type ApprovedMemory = Readonly<{
  caption: string | null;
  id: string;
  imageUrl: string;
  uploaderName: string | null;
}>;

type AdminApprovedGridProps = Readonly<{
  memories: readonly ApprovedMemory[];
}>;

export function AdminApprovedGrid({ memories }: AdminApprovedGridProps) {
  const router = useRouter();
  const [items, setItems] = useState(memories);
  const [deletingId, setDeletingId] = useState<string>();
  const [error, setError] = useState<string>();
  const dragIndex = useRef<number | undefined>(undefined);

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragOver(event: DragEvent<HTMLLIElement>, index: number) {
    event.preventDefault();
    const from = dragIndex.current;
    if (from === undefined || from === index) return;

    setItems((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      if (!moved) return current;
      next.splice(index, 0, moved);
      return next;
    });
    dragIndex.current = index;
  }

  async function handleDragEnd() {
    dragIndex.current = undefined;
    setError(undefined);

    const response = await fetch("/api/admin/memories/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: items.map((item) => item.id) }),
    });

    if (!response.ok) {
      setError("Couldn't save the new order. Please try again.");
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(undefined);

    const response = await fetch(`/api/admin/memories/${id}/delete`, {
      method: "POST",
    });

    if (!response.ok) {
      setDeletingId(undefined);
      setError("Something went wrong. Please try again.");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setDeletingId(undefined);
    router.refresh();
  }

  if (items.length === 0) return null;

  return (
    <>
      {error ? (
        <Text size="small" className="form-error" role="alert">
          {error}
        </Text>
      ) : null}
      <ul className="admin-approved-grid">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="admin-approved-card"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="admin-approved-card__image"
              src={item.imageUrl}
              alt={item.caption ?? "Approved memory photo"}
            />
            <div className="admin-approved-card__details">
              <Text size="small">{item.caption || "No caption"}</Text>
              <Text size="small" muted>
                — {item.uploaderName ?? "Anonymous"}
              </Text>
              <MemoryEditFields
                id={item.id}
                uploaderName={item.uploaderName}
                caption={item.caption}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              disabled={deletingId !== undefined}
              onClick={() => handleDelete(item.id)}
            >
              {deletingId === item.id ? "Deleting…" : "Delete"}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
