import { ResponsiveAsset } from "@/components/media/responsive-asset";
import { ImageReveal } from "@/components/motion/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { ResponsiveImageAsset } from "@/types/assets";
import { cn } from "@/utils/cn";

type StoryBlockProps = Readonly<{
  asset: ResponsiveImageAsset;
  body: string;
  eyebrow?: string;
  mediaPosition?: "start" | "end";
  opening?: boolean;
  title: string;
}>;

export function StoryBlock({
  asset,
  body,
  eyebrow,
  mediaPosition = "start",
  opening = false,
  title,
}: StoryBlockProps) {
  return (
    <div
      className={cn(
        "story-block",
        "editorial-grid",
        mediaPosition === "end" && "story-block--media-end",
        opening && "story-block--opening",
      )}
    >
      <div className="story-block__media">
        <ImageReveal>
          <ResponsiveAsset asset={asset} />
        </ImageReveal>
      </div>
      <div className="story-block__content">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={3} variant="section">
          {title}
        </Heading>
        <Text size="lead">{body}</Text>
      </div>
    </div>
  );
}
