"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Text } from "@/components/ui/typography";

type GalleryMemory = Readonly<{
  caption: string | null;
  id: string;
  imageUrl: string;
  uploaderName: string | null;
}>;

type MemoryGalleryProps = Readonly<{
  memories: readonly GalleryMemory[];
}>;

export function MemoryGallery({ memories }: MemoryGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number>();
  const open = openIndex !== undefined;
  const current = open ? memories[openIndex] : undefined;

  const [layerA, setLayerA] = useState<GalleryMemory>();
  const [layerB, setLayerB] = useState<GalleryMemory>();
  const [showLayerA, setShowLayerA] = useState(true);
  const showingLayerARef = useRef(true);

  useEffect(() => {
    if (!current) return;

    if (showingLayerARef.current) {
      setLayerB(current);
      requestAnimationFrame(() => {
        setShowLayerA(false);
        showingLayerARef.current = false;
      });
    } else {
      setLayerA(current);
      requestAnimationFrame(() => {
        setShowLayerA(true);
        showingLayerARef.current = true;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(undefined);
      if (event.key === "ArrowLeft") {
        setOpenIndex((index) =>
          index === undefined
            ? index
            : (index - 1 + memories.length) % memories.length,
        );
      }
      if (event.key === "ArrowRight") {
        setOpenIndex((index) =>
          index === undefined ? index : (index + 1) % memories.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, memories.length]);

  return (
    <>
      <ul className="memory-gallery">
        {memories.map((memory, index) => (
          <li key={memory.id} className="memory-card">
            <button
              type="button"
              className="memory-card__image-button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View full-size photo${memory.caption ? `: ${memory.caption}` : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="memory-card__image"
                src={memory.imageUrl}
                alt={memory.caption ?? "A memory photo of Jaali"}
                loading="lazy"
              />
            </button>
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

      {open && current ? (
        <div
          className="memory-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpenIndex(undefined)}
        >
          <button
            type="button"
            className="memory-lightbox__close"
            aria-label="Close"
            onClick={() => setOpenIndex(undefined)}
          >
            <X aria-hidden="true" size={22} strokeWidth={1.75} />
          </button>

          {memories.length > 1 ? (
            <button
              type="button"
              className="memory-lightbox__nav memory-lightbox__nav--prev"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                setOpenIndex((index) =>
                  index === undefined
                    ? index
                    : (index - 1 + memories.length) % memories.length,
                );
              }}
            >
              <ChevronLeft aria-hidden="true" size={28} strokeWidth={1.75} />
            </button>
          ) : null}

          <figure
            className="memory-lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="memory-lightbox__stage">
              {layerA ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="memory-lightbox__layer"
                  style={{ opacity: showLayerA ? 1 : 0 }}
                  src={layerA.imageUrl}
                  alt={layerA.caption ?? "A memory photo of Jaali"}
                />
              ) : null}
              {layerB ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="memory-lightbox__layer"
                  style={{ opacity: showLayerA ? 0 : 1 }}
                  src={layerB.imageUrl}
                  alt={layerB.caption ?? "A memory photo of Jaali"}
                />
              ) : null}
            </div>
            {current.caption || current.uploaderName ? (
              <figcaption className="memory-lightbox__caption">
                {current.caption}
                {current.caption && current.uploaderName ? " — " : null}
                {current.uploaderName}
              </figcaption>
            ) : null}
          </figure>

          {memories.length > 1 ? (
            <button
              type="button"
              className="memory-lightbox__nav memory-lightbox__nav--next"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                setOpenIndex((index) =>
                  index === undefined ? index : (index + 1) % memories.length,
                );
              }}
            >
              <ChevronRight aria-hidden="true" size={28} strokeWidth={1.75} />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
