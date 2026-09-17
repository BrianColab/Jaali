import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import type { AnnouncementContent } from "@/types/content";

type AnnouncementBarProps = Readonly<{
  content: AnnouncementContent;
}>;

export function AnnouncementBar({ content }: AnnouncementBarProps) {
  return (
    <div
      className="announcement-bar"
      role="region"
      aria-label="Major news announcement"
    >
      <Container>
        <Reveal kind="fadeUp" className="announcement-bar__inner">
          <div className="announcement-bar__message">
            <span className="announcement-bar__icon-wrap" aria-hidden="true">
              <svg
                className="announcement-bar__icon"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
                <path d="M14 2v6h6" />
                <text
                  x="12"
                  y="17.5"
                  textAnchor="middle"
                  fontSize="6.5"
                  fontWeight="700"
                  stroke="none"
                  fill="currentColor"
                  fontFamily="sans-serif"
                >
                  PDF
                </text>
              </svg>
            </span>
            <div className="announcement-bar__copy">
              <p className="announcement-bar__meta">
                <span className="announcement-bar__label">{content.label}</span>
                <span className="announcement-bar__format">Official PDF</span>
              </p>
              <p className="announcement-bar__headline">{content.headline}</p>
            </div>
          </div>
          <a
            className="announcement-bar__cta"
            href={content.action.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{content.action.label}</span>
            <span className="visually-hidden">
              : {content.headline} (opens in a new tab)
            </span>
            <span
              className="announcement-bar__cta-icon-wrap"
              aria-hidden="true"
            >
              <ArrowUpRight
                className="announcement-bar__cta-icon"
                size={17}
                strokeWidth={2}
              />
            </span>
          </a>
        </Reveal>
      </Container>
    </div>
  );
}
