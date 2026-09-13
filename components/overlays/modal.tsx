"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Heading } from "@/components/ui/typography";

type ModalProps = Readonly<{
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  showLogo?: boolean;
  title: string;
}>;

export function Modal({
  children,
  onOpenChange,
  open,
  showLogo = false,
  title,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onCancel={() => onOpenChange(false)}
      onClose={() => onOpenChange(false)}
    >
      <div className="modal__inner">
        <header className="modal__header">
          <div className="modal__title-group">
            {showLogo ? (
              <BrandLogo className="modal__logo" sizes="3rem" />
            ) : null}
            <Heading id={titleId} level={2} variant="card">
              {title}
            </Heading>
          </div>
          <button
            type="button"
            className="modal__close"
            aria-label="Close dialog"
            onClick={() => onOpenChange(false)}
          >
            <X aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </dialog>
  );
}
