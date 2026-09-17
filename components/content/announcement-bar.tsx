import { ArrowUpRight, FileText } from "lucide-react";

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
              <FileText
                className="announcement-bar__icon"
                size={24}
                strokeWidth={1.75}
              />
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
