"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState, type DragEvent } from "react";

import { TextAreaField, TextField } from "@/components/forms/form-controls";
import { Modal } from "@/components/overlays/modal";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

const maxFileSizeBytes = 8 * 1024 * 1024;

export function MemoryUploadButton() {
  const router = useRouter();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [succeeded, setSucceeded] = useState(false);

  function resetForm() {
    setFile(undefined);
    setName("");
    setCaption("");
    setError(undefined);
    setSucceeded(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) resetForm();
  }

  function validateAndSetFile(candidate: File | undefined) {
    if (!candidate) return;

    if (!candidate.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (candidate.size > maxFileSizeBytes) {
      setError("Images must be 8MB or smaller.");
      return;
    }

    setError(undefined);
    setFile(candidate);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    validateAndSetFile(event.dataTransfer.files[0]);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Please choose a photo to upload.");
      return;
    }

    setSubmitting(true);
    setError(undefined);

    const formData = new FormData();
    formData.set("image", file);
    if (name.trim()) formData.set("name", name.trim());
    if (caption.trim()) formData.set("caption", caption.trim());

    const response = await fetch("/api/memories/upload", {
      method: "POST",
      body: formData,
    });

    setSubmitting(false);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(body?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setSucceeded(true);
    router.refresh();
  }

  return (
    <>
      <Button type="button" size="large" onClick={() => setOpen(true)}>
        Upload Your Photo
      </Button>

      <Modal
        open={open}
        onOpenChange={handleOpenChange}
        title="Share a Photo of Jaali"
      >
        {succeeded ? (
          <Text>Thank you — your photo is pending review.</Text>
        ) : (
          <form className="memory-upload-form" onSubmit={handleSubmit}>
            <div
              className="memory-upload-dropzone"
              data-active={dragActive ? "true" : "false"}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              {file ? (
                <Text size="small">{file.name}</Text>
              ) : (
                <Text size="small" muted>
                  Drag and drop a photo here, or click to browse.
                </Text>
              )}
              <input
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                accept="image/*"
                className="memory-upload-dropzone__input"
                onChange={(event) =>
                  validateAndSetFile(event.target.files?.[0])
                }
              />
            </div>

            <TextField
              id="memory-uploader-name"
              label="Your name (optional)"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextAreaField
              id="memory-caption"
              label="Caption (optional)"
              name="caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />

            {error ? (
              <Text size="small" className="form-error" role="alert">
                {error}
              </Text>
            ) : null}

            <Button type="submit" size="large" disabled={submitting}>
              {submitting ? "Uploading…" : "Upload Photo"}
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
