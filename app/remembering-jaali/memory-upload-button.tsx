"use client";

import { Lock, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type DragEvent } from "react";

import { TextAreaField, TextField } from "@/components/forms/form-controls";
import { Modal } from "@/components/overlays/modal";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

const maxFileSizeBytes = 8 * 1024 * 1024;
const maxFiles = 5;
const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

type PendingFile = Readonly<{
  file: File;
  id: string;
  previewUrl: string;
}>;

export function MemoryUploadButton() {
  const router = useRouter();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    return () => {
      for (const pending of pendingFiles)
        URL.revokeObjectURL(pending.previewUrl);
    };
  }, [pendingFiles]);

  function resetForm() {
    for (const pending of pendingFiles) URL.revokeObjectURL(pending.previewUrl);
    setPendingFiles([]);
    setName("");
    setCaption("");
    setError(undefined);
    setSucceeded(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) resetForm();
  }

  function addFiles(candidates: FileList | File[]) {
    const incoming = Array.from(candidates);
    if (incoming.length === 0) return;

    const accepted: PendingFile[] = [];
    let rejectionReason: string | undefined;

    for (const candidate of incoming) {
      if (!acceptedTypes.includes(candidate.type)) {
        rejectionReason = "Photos must be PNG, JPEG, or GIF files.";
        continue;
      }
      if (candidate.size > maxFileSizeBytes) {
        rejectionReason = "Each photo must be 8MB or smaller.";
        continue;
      }
      accepted.push({
        file: candidate,
        id: `${candidate.name}-${candidate.lastModified}-${candidate.size}`,
        previewUrl: URL.createObjectURL(candidate),
      });
    }

    setPendingFiles((current) => {
      const merged = [...current];
      for (const item of accepted) {
        if (merged.some((existing) => existing.id === item.id)) {
          URL.revokeObjectURL(item.previewUrl);
          continue;
        }
        if (merged.length >= maxFiles) {
          URL.revokeObjectURL(item.previewUrl);
          rejectionReason = `You can share up to ${maxFiles} photos at a time.`;
          continue;
        }
        merged.push(item);
      }
      return merged;
    });

    setError(rejectionReason);
  }

  function removeFile(id: string) {
    setPendingFiles((current) => {
      const target = current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingFiles.length === 0) {
      setError("Please choose at least one photo to upload.");
      return;
    }

    setSubmitting(true);
    setError(undefined);

    const formData = new FormData();
    for (const pending of pendingFiles) formData.append("images", pending.file);
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
            >
              <UploadCloud
                aria-hidden="true"
                size={32}
                strokeWidth={1.75}
                className="memory-upload-dropzone__icon"
              />
              <Text size="small" className="memory-upload-dropzone__label">
                Drag and Drop here
              </Text>
              <Text size="small" muted>
                or
              </Text>
              <button
                type="button"
                className="memory-upload-dropzone__browse"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse files
              </button>
              <input
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                accept="image/png,image/jpeg,image/gif"
                multiple
                className="memory-upload-dropzone__input"
                onChange={(event) => {
                  if (event.target.files) addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </div>

            <div className="memory-upload-dropzone__footer">
              <Text size="small" muted>
                Accepted file types: PNG, JPEG, GIF — up to {maxFiles} photos
              </Text>
              <Text
                size="small"
                muted
                className="memory-upload-dropzone__secure"
              >
                <Lock aria-hidden="true" size={14} strokeWidth={1.75} />
                Secure
              </Text>
            </div>

            {pendingFiles.length > 0 ? (
              <ul className="memory-upload-previews">
                {pendingFiles.map((pending) => (
                  <li key={pending.id} className="memory-upload-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview URL, not an optimizable remote image */}
                    <img src={pending.previewUrl} alt="" />
                    <button
                      type="button"
                      className="memory-upload-preview__remove"
                      aria-label={`Remove ${pending.file.name}`}
                      onClick={() => removeFile(pending.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

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
              {submitting
                ? "Uploading…"
                : `Upload ${pendingFiles.length > 1 ? `${pendingFiles.length} Photos` : "Photo"}`}
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
