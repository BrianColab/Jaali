"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

type MemoryEditFieldsProps = Readonly<{
  caption: string | null;
  id: string;
  uploaderName: string | null;
}>;

export function MemoryEditFields({
  caption,
  id,
  uploaderName,
}: MemoryEditFieldsProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(uploaderName ?? "");
  const [captionValue, setCaptionValue] = useState(caption ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  if (!editing) {
    return (
      <button
        type="button"
        className="memory-edit-toggle"
        onClick={() => setEditing(true)}
      >
        Edit name &amp; caption
      </button>
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(undefined);

    const response = await fetch(`/api/admin/memories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uploaderName: name, caption: captionValue }),
    });

    setSaving(false);

    if (!response.ok) {
      setError("Couldn't save. Please try again.");
      return;
    }

    setEditing(false);
    router.refresh();
  }

  function handleCancel() {
    setName(uploaderName ?? "");
    setCaptionValue(caption ?? "");
    setError(undefined);
    setEditing(false);
  }

  return (
    <div className="memory-edit-fields">
      <input
        type="text"
        className="memory-edit-fields__input"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        className="memory-edit-fields__input"
        placeholder="Caption"
        value={captionValue}
        onChange={(event) => setCaptionValue(event.target.value)}
      />
      {error ? (
        <Text size="small" className="form-error" role="alert">
          {error}
        </Text>
      ) : null}
      <div className="memory-edit-fields__actions">
        <Button
          type="button"
          size="medium"
          disabled={saving}
          onClick={handleSave}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          disabled={saving}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
