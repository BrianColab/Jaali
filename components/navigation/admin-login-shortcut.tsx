"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const TRIGGER_KEYS = new Set(["j", "4"]);

export function AdminLoginShortcut() {
  const router = useRouter();
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
        router.push("/admin/login");
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
  }, [router]);

  return null;
}
