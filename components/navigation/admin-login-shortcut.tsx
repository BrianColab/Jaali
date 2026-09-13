"use client";

import { useEffect, useRef, useState } from "react";

import { AdminLoginForm } from "@/app/admin/login/login-form";
import { Heading, Text } from "@/components/ui/typography";

const TRIGGER_KEYS = new Set(["j", "4"]);

export function AdminLoginShortcut() {
  const [open, setOpen] = useState(false);
  const heldKeys = useRef(new Set<string>());

  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      if (!TRIGGER_KEYS.has(key)) return;

      heldKeys.current.add(key);

      if (heldKeys.current.size === TRIGGER_KEYS.size) {
        heldKeys.current.clear();
        setOpen(true);
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      heldKeys.current.delete(event.key.toLowerCase());
    }

    function handleBlur() {
      heldKeys.current.clear();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  if (!open) return null;

  return (
    <div className="admin-login-modal" role="presentation">
      <button
        className="admin-login-modal__backdrop"
        type="button"
        aria-label="Close admin login"
        onClick={() => setOpen(false)}
      />
      <div
        className="admin-login-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-modal-title"
      >
        <Heading id="admin-login-modal-title" level={2} variant="card">
          Admin Login
        </Heading>
        <Text muted>
          Enter the shared admin password to review memory photos.
        </Text>
        <AdminLoginForm autoFocus onSuccess={() => setOpen(false)} />
      </div>
    </div>
  );
}
