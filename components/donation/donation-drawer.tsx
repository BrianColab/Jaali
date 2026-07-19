"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { DonationForm } from "@/components/donation/donation-form";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { donatePageContent } from "@/data/pages";

const closeDuration = 600;

export function DonationDrawer() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrawer = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    window.requestAnimationFrame(() => setOpen(true));
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    closeTimerRef.current = setTimeout(
      () => {
        setMounted(false);
        returnFocusRef.current?.focus();
      },
      reduceMotion ? 0 : closeDuration,
    );
  }, []);

  useEffect(() => {
    const handleDonateLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href="/donate"]');
      if (!link || link.target === "_blank") return;

      event.preventDefault();
      openDrawer();
    };

    document.addEventListener("click", handleDonateLink, true);
    const initialOpenFrame =
      window.location.hash === "#donate"
        ? window.requestAnimationFrame(openDrawer)
        : null;

    return () => {
      document.removeEventListener("click", handleDonateLink, true);
      if (initialOpenFrame !== null) {
        window.cancelAnimationFrame(initialOpenFrame);
      }
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [openDrawer]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDrawer, open]);

  if (!mounted) return null;

  return (
    <div
      className="donation-drawer"
      data-open={open ? "true" : "false"}
      role="presentation"
    >
      <button
        className="donation-drawer__backdrop"
        type="button"
        aria-label="Close donation form"
        onClick={closeDrawer}
      />
      <aside
        ref={drawerRef}
        className="donation-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-drawer-title"
      >
        <header className="donation-drawer__header">
          <BrandLogo
            className="donation-drawer__logo"
            sizes="(min-width: 48rem) 10rem, 8.5rem"
          />
          <button
            ref={closeButtonRef}
            className="donation-drawer__close"
            type="button"
            aria-label="Close donation form"
            onClick={closeDrawer}
          >
            <X aria-hidden="true" size={22} strokeWidth={1.5} />
          </button>
        </header>

        <div className="donation-drawer__body">
          <div className="donation-drawer__introduction">
            <Eyebrow>{donatePageContent.eyebrow}</Eyebrow>
            <Heading id="donation-drawer-title" level={2} variant="section">
              {donatePageContent.title}
            </Heading>
            <Text>{donatePageContent.intro}</Text>
          </div>
          <DonationForm
            className="donation-form--drawer"
            idPrefix="donation-drawer"
          />
        </div>
      </aside>
    </div>
  );
}
