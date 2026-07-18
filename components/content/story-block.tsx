import { ResponsiveAsset } from "@/components/media/responsive-asset";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { ResponsiveImageAsset } from "@/types/assets";
import { cn } from "@/utils/cn";

type StoryBlockProps = Readonly<{
  asset: ResponsiveImageAsset;
  body: string;
  eyebrow?: string;
  mediaPosition?: "start" | "end";
  title: string;
}>;

export function StoryBlock({
  asset,
  body,
  eyebrow,
  mediaPosition = "start",
  title,
}: StoryBlockProps) {
  return (
    <div
      className={cn(
        "story-block",
        "editorial-grid",
        mediaPosition === "end" && "story-block--media-end",
      )}
    >
      <div className="story-block__media">
        <ResponsiveAsset asset={asset} />
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
