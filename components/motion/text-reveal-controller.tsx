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

    elements.forEach((element, index) => {
      element.dataset.scrollText = "";
      element.style.setProperty("--text-reveal-delay", `${(index % 3) * 45}ms`);
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
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.scrollTextVisible = "";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
