"use client";

import { useEffect, useState } from "react";

export type HomepageChapter = Readonly<{
  id: string;
  label: string;
  number: string;
}>;

type HomepageProgressProps = Readonly<{
  chapters: readonly HomepageChapter[];
}>;

export function HomepageProgress({ chapters }: HomepageProgressProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-32% 0px -55%", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav className="homepage-progress" aria-label="Homepage chapters">
      <ol className="homepage-progress__list">
        {chapters.map((chapter) => {
          const active = chapter.id === activeId;

          return (
            <li key={chapter.id}>
              <a
                className="homepage-progress__link"
                href={`#${chapter.id}`}
                aria-current={active ? "location" : undefined}
              >
                <span className="homepage-progress__number" aria-hidden="true">
                  {chapter.number}
                </span>
                <span className="homepage-progress__label">
                  {chapter.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
