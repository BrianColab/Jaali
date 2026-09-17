import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Heading, Text } from "@/components/ui/typography";
import { formatMediaDate, primaryActionLabel } from "@/lib/media-archive";
import { getMediaBanner } from "@/lib/media-banners";
import type { MediaItem } from "@/types/media";
import { cn } from "@/utils/cn";

type ExternalActionProps = Readonly<{
  headline: string;
  href: string;
  label: string;
  variant: "primary" | "secondary";
}>;

function ExternalAction({
  headline,
  href,
  label,
  variant,
}: ExternalActionProps) {
  return (
    <a
      className={cn("media-card__action", `media-card__action--${variant}`)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <span className="visually-hidden">: {headline} (opens in a new tab)</span>
      <ArrowUpRight
        className="media-card__action-icon"
        aria-hidden="true"
        size={16}
        strokeWidth={1.75}
      />
    </a>
  );
}

type MediaCardProps = Readonly<{
  item: MediaItem;
}>;

export function MediaCard({ item }: MediaCardProps) {
  const isMilestone = item.majorMilestone === true;
  const banner = getMediaBanner(item);
  const badgeTone = item.type
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace("&", "and");

  return (
    <article
      className={cn("media-card", isMilestone && "media-card--milestone")}
    >
      <div className="media-card__banner">
        <Image
          className="media-card__image"
          src={banner.src}
          alt=""
          fill
          sizes="(min-width: 87.5rem) 21vw, (min-width: 64rem) 30vw, (min-width: 48rem) 46vw, 94vw"
          style={{ objectPosition: banner.objectPosition }}
        />
        <span
          className={cn("media-card__badge", `media-card__badge--${badgeTone}`)}
        >
          {item.source}
        </span>
        {isMilestone ? (
          <span className="media-card__milestone">Major Milestone</span>
        ) : null}
        <time className="media-card__date" dateTime={item.date}>
          {formatMediaDate(item)}
        </time>
      </div>

      <div className="media-card__body">
        <Heading level={3} variant="card" className="media-card__headline">
          {item.headline}
        </Heading>

        <Text size="small" className="media-card__summary">
          {item.summary}
        </Text>

        {item.author ? (
          <p className="media-card__author">By {item.author}</p>
        ) : null}

        <div className="media-card__actions">
          {item.url ? (
            <ExternalAction
              headline={item.headline}
              href={item.url}
              label={primaryActionLabel(item.type)}
              variant="primary"
            />
          ) : null}
          {item.secondaryUrl && item.secondaryLabel ? (
            <ExternalAction
              headline={item.headline}
              href={item.secondaryUrl}
              label={item.secondaryLabel}
              variant="secondary"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
