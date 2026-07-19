"use client";

import { useEffect } from "react";

const textSelector = [
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
  ".site-footer h2",
  ".site-footer h3",
  ".site-footer p",
  ".site-footer li",
].join(",");

export function TextRevealController() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(textSelector),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    elements.forEach((element) => {
      const delay = element.matches("h1, h2, h3, h4")
        ? 0
        : element.matches("p, blockquote, figcaption")
          ? 70
          : 110;
      element.dataset.scrollText = "";
      element.style.setProperty("--text-reveal-delay", `${delay}ms`);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.scrollTextVisible = "";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasPassedDuringScroll = entry.boundingClientRect.top < 0;
          if (!entry.isIntersecting && !wasPassedDuringScroll) return;

          const element = entry.target as HTMLElement;
          element.dataset.scrollTextVisible = "";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    let scrollFrame: number | null = null;
    const revealPassedElements = () => {
      scrollFrame = null;
      const revealLine = window.innerHeight * 0.92;

      elements.forEach((element) => {
        if (
          element.dataset.scrollTextVisible !== undefined ||
          element.getBoundingClientRect().top > revealLine
        ) {
          return;
        }

        element.dataset.scrollTextVisible = "";
        observer.unobserve(element);
      });
    };
    const handleScroll = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(revealPassedElements);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    revealPassedElements();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return null;
}
