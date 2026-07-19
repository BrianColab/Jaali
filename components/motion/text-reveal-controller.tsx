"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = [
  "#main-content h1",
  "#main-content h2",
  "#main-content h3",
  "#main-content h4",
  "#main-content p",
  "#main-content li",
  "#main-content blockquote",
  "#main-content figcaption",
  "#main-content label",
  "#main-content legend",
  "#main-content .button",
  "#main-content .card",
  "#main-content .story-block",
  "#main-content .timeline__item",
  "#main-content .quote-block",
  "#main-content .feature-card",
  "#main-content .resource-card",
  "#main-content .accordion__item",
  "#main-content .warning-signs__item",
  "#main-content .responsive-asset",
  "#main-content .section-media-layout__media",
  "#main-content .section-media-layout__content",
  "#main-content .resources-layout__media",
  "#main-content .resources-layout__cards",
  "#main-content .content-page__section-grid",
  "#main-content .donation-page__grid",
  "#main-content .donate-banner",
  "#main-content .cta-banner",
  "#main-content .newsletter",
  ".site-footer h2",
  ".site-footer h3",
  ".site-footer p",
  ".site-footer li",
].join(",");

function getRevealDelay(element: HTMLElement, index: number) {
  if (element.matches("h1, h2, h3, h4")) return 0;
  if (element.matches("p, blockquote, figcaption")) return 70;
  if (
    element.matches(
      ".card, .feature-card, .resource-card, .accordion__item, .warning-signs__item, .timeline__item",
    )
  ) {
    return 90 + (index % 4) * 45;
  }
  if (element.matches(".responsive-asset, [class*='__media']")) return 80;

  return 110;
}

export function TextRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let scrollFrame: number | null = null;
    let setupFrame: number | null = null;
    let elements: HTMLElement[] = [];
    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const revealPassedElements = () => {
      scrollFrame = null;
      const revealLine = window.innerHeight * 0.92;

      elements.forEach((element) => {
        if (
          element.dataset.scrollRevealVisible !== undefined ||
          element.getBoundingClientRect().top > revealLine
        ) {
          return;
        }

        element.dataset.scrollRevealVisible = "";
        observer?.unobserve(element);
      });
    };

    const handleScroll = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(revealPassedElements);
    };

    const cleanupObserver = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = null;
    };

    const setupReveal = () => {
      cleanupObserver();
      elements = Array.from(
        document.querySelectorAll<HTMLElement>(revealSelector),
      ).filter((element) => !element.closest("[aria-hidden='true']"));

      elements.forEach((element, index) => {
        element.dataset.scrollReveal = "";
        delete element.dataset.scrollRevealVisible;
        element.style.setProperty(
          "--scroll-reveal-delay",
          `${getRevealDelay(element, index)}ms`,
        );
      });

      if (reduceMotionQuery.matches || !("IntersectionObserver" in window)) {
        elements.forEach((element) => {
          element.dataset.scrollRevealVisible = "";
        });
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const wasPassedDuringScroll = entry.boundingClientRect.top < 0;
            if (!entry.isIntersecting && !wasPassedDuringScroll) return;

            const element = entry.target as HTMLElement;
            element.dataset.scrollRevealVisible = "";
            observer?.unobserve(element);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );

      elements.forEach((element) => observer?.observe(element));
      window.addEventListener("scroll", handleScroll, { passive: true });
      revealPassedElements();
    };

    setupFrame = window.requestAnimationFrame(setupReveal);

    return () => {
      cleanupObserver();
      if (setupFrame !== null) window.cancelAnimationFrame(setupFrame);
    };
  }, [pathname]);

  return null;
}
