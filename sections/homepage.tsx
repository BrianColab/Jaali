import { Accordion } from "@/components/content/accordion";
import { CtaBanner } from "@/components/content/cta-banner";
import { DonateBanner } from "@/components/content/donate-banner";
import { FeatureCards } from "@/components/content/feature-cards";
import { QuoteBlock } from "@/components/content/quote-block";
import { ResourceCards } from "@/components/content/resource-cards";
import { StoryBlock } from "@/components/content/story-block";
import { Timeline } from "@/components/content/timeline";
import { WarningSigns } from "@/components/content/warning-signs";
import { ResponsiveAsset } from "@/components/media/responsive-asset";
import { ImageReveal, SectionReveal } from "@/components/motion/reveal";
import {
  HomepageProgress,
  type HomepageChapter,
} from "@/components/navigation/homepage-progress";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homepageContent } from "@/data/homepage";
import { homepageAssets } from "@/lib/assets";
import { Hero } from "@/sections/hero";
import type { HomepageAssetManifest } from "@/types/assets";
import type { ContentAction, HomepageContent } from "@/types/content";

const homepageChapters = [
  { id: "jaalis-story", label: "Jaali", number: "01" },
  { id: "timeline", label: "What Happened", number: "02" },
  {
    id: "not-an-isolated-tragedy",
    label: "The Wider Issue",
    number: "03",
  },
  { id: "know-your-rights", label: "Your Rights", number: "04" },
  { id: "vision", label: "The Vision", number: "05" },
  { id: "donate", label: "Take Action", number: "06" },
] as const satisfies readonly HomepageChapter[];

type HomepageProps = Readonly<{
  assets?: HomepageAssetManifest;
  content?: HomepageContent;
}>;

function ContentActionLink({ action }: Readonly<{ action: ContentAction }>) {
  return (
    <ButtonLink href={action.href} variant="secondary">
      {action.label}
    </ButtonLink>
  );
}

export function Homepage({
  assets = homepageAssets,
  content = homepageContent,
}: HomepageProps) {
  return (
    <>
      <HomepageProgress chapters={homepageChapters} />
      <Hero asset={assets.hero} content={content.hero} />

      <Section {...content.story.header} chapter="01">
        <SectionReveal>
          <StoryBlock asset={assets.story} opening {...content.story.block} />
        </SectionReveal>
      </Section>

      <Section {...content.timeline.header} chapter="02">
        <div className="section-media-layout editorial-grid">
          <ImageReveal className="section-media-layout__media">
            <ResponsiveAsset asset={assets.timeline} />
          </ImageReveal>
          <div className="section-media-layout__content">
            <Timeline items={content.timeline.items} />
          </div>
        </div>
      </Section>

      <Section
        {...content.context.header}
        chapter="03"
        className="section--signature-quote"
      >
        <div className="signature-quote__layout editorial-grid">
          <ImageReveal className="signature-quote__media">
            <ResponsiveAsset asset={assets.quote} />
          </ImageReveal>
          <SectionReveal className="signature-quote__content">
            <QuoteBlock
              quote={content.context.quote}
              attribution={content.context.attribution}
            />
          </SectionReveal>
        </div>
      </Section>

      <Section {...content.advocacy.header}>
        <SectionReveal>
          <FeatureCards items={content.advocacy.items} />
        </SectionReveal>
      </Section>

      <Section {...content.rights.header} chapter="04">
        <SectionReveal>
          <Accordion items={content.rights.items} />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <div className="section__content-spacer">
            <CtaBanner
              title={content.rights.cta.title}
              body={content.rights.cta.body}
              actions={<ContentActionLink action={content.rights.cta.action} />}
            />
          </div>
        </SectionReveal>
      </Section>

      <Section {...content.warningSigns.header}>
        <SectionReveal>
          <WarningSigns items={content.warningSigns.items} />
        </SectionReveal>
      </Section>

      <Section {...content.vision.header} chapter="05">
        <SectionReveal>
          <StoryBlock asset={assets.vision} {...content.vision.block} />
        </SectionReveal>
      </Section>

      <Section {...content.resources.header}>
        <ImageReveal className="section-supporting-media">
          <ResponsiveAsset asset={assets.resources} />
        </ImageReveal>
        <SectionReveal delay={0.08}>
          <ResourceCards items={content.resources.items} />
        </SectionReveal>
      </Section>

      <Section {...content.shareStory.header}>
        <SectionReveal>
          <CtaBanner
            title={content.shareStory.cta.title}
            body={content.shareStory.cta.body}
            actions={
              <ContentActionLink action={content.shareStory.cta.action} />
            }
          />
        </SectionReveal>
      </Section>

      <Section {...content.donate.header} chapter="06">
        <div className="section-media-layout editorial-grid">
          <ImageReveal className="section-media-layout__media">
            <ResponsiveAsset asset={assets.donate} />
          </ImageReveal>
          <SectionReveal className="section-media-layout__content" delay={0.08}>
            <DonateBanner
              title={content.donate.banner.title}
              body={content.donate.banner.body}
              actions={
                <ContentActionLink action={content.donate.banner.action} />
              }
            />
          </SectionReveal>
        </div>
      </Section>
    </>
  );
}
