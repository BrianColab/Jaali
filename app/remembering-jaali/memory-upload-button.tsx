"use client";

import { Heart, Lock, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type DragEvent } from "react";

import { TextField } from "@/components/forms/form-controls";
import { Modal } from "@/components/overlays/modal";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

const maxFileSizeBytes = 8 * 1024 * 1024;
const maxFiles = 5;
const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<{ ok: boolean; status: number; body: unknown }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      let body: unknown;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        body = null;
      }
      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        body,
      });
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
}

type PendingFile = Readonly<{
  caption: string;
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
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
    setError(undefined);
    setSucceeded(false);
    setUploadProgress(0);
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
        caption: "",
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

  function setFileCaption(id: string, value: string) {
    setPendingFiles((current) =>
      current.map((item) =>
        item.id === id ? { ...item, caption: value } : item,
      ),
    );
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
    setUploadProgress(0);
    setError(undefined);

    const formData = new FormData();
    for (const pending of pendingFiles) {
      formData.append("images", pending.file);
      formData.append("captions", pending.caption.trim());
    }
    if (name.trim()) formData.set("name", name.trim());

    let response: Awaited<ReturnType<typeof uploadWithProgress>>;
    try {
      response = await uploadWithProgress(
        "/api/memories/upload",
        formData,
        setUploadProgress,
      );
    } catch {
      setSubmitting(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitting(false);

    if (!response.ok) {
      const body = response.body as { error?: string } | null;
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
          <div className="memory-upload-success">
            <Heart
              aria-hidden="true"
              size={36}
              strokeWidth={1.5}
              className="memory-upload-success__icon"
            />
            <Heading level={2} variant="card">
              Thank You
            </Heading>
            <Text muted>
              Your photo{pendingFiles.length > 1 ? "s are" : " is"} pending
              review and will appear here once approved.
            </Text>
            <Button type="button" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
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
                {pendingFiles.map((pending, index) => (
                  <li key={pending.id} className="memory-upload-preview">
                    <div className="memory-upload-preview__image-wrap">
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
                    </div>
                    <Text
                      size="small"
                      muted
                      className="memory-upload-preview__label"
                    >
                      Picture {index + 1}
                    </Text>
                    <input
                      type="text"
                      className="memory-upload-preview__caption"
                      placeholder="Caption (optional)"
                      value={pending.caption}
                      onChange={(event) =>
                        setFileCaption(pending.id, event.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="memory-upload-name">
              <TextField
                id="memory-uploader-name"
                label="Your name (optional)"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            {error ? (
              <Text size="small" className="form-error" role="alert">
                {error}
              </Text>
            ) : null}

            {submitting ? (
              <div
                className="memory-upload-progress"
                role="progressbar"
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Upload progress"
              >
                <div
                  className="memory-upload-progress__bar"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            ) : null}

            <Button type="submit" size="large" disabled={submitting}>
              {submitting
                ? `Uploading… ${uploadProgress}%`
                : `Upload ${pendingFiles.length > 1 ? `${pendingFiles.length} Photos` : "Photo"}`}
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
