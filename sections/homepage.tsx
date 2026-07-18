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
import { SectionReveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { homepageContent } from "@/data/homepage";
import { homepageAssets } from "@/lib/assets";
import { Hero } from "@/sections/hero";
import type { HomepageAssetManifest } from "@/types/assets";
import type { ContentAction, HomepageContent } from "@/types/content";

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
      <Hero asset={assets.hero} content={content.hero} />

      <Section {...content.story.header}>
        <SectionReveal>
          <StoryBlock asset={assets.story} {...content.story.block} />
        </SectionReveal>
      </Section>

      <Section {...content.timeline.header}>
        <div className="section-media-layout editorial-grid">
          <SectionReveal className="section-media-layout__media">
            <ResponsiveAsset asset={assets.timeline} />
          </SectionReveal>
          <div className="section-media-layout__content">
            <Timeline items={content.timeline.items} />
          </div>
        </div>
      </Section>

      <Section {...content.context.header}>
        <div className="section-media-layout section-media-layout--media-end editorial-grid">
          <SectionReveal className="section-media-layout__media">
            <ResponsiveAsset asset={assets.quote} />
          </SectionReveal>
          <SectionReveal className="section-media-layout__content">
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

      <Section {...content.rights.header}>
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

      <Section {...content.vision.header}>
        <SectionReveal>
          <StoryBlock asset={assets.vision} {...content.vision.block} />
        </SectionReveal>
      </Section>

      <Section {...content.resources.header}>
        <SectionReveal className="section-supporting-media">
          <ResponsiveAsset asset={assets.resources} />
        </SectionReveal>
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

      <Section {...content.donate.header}>
        <div className="section-media-layout editorial-grid">
          <SectionReveal className="section-media-layout__media">
            <ResponsiveAsset asset={assets.donate} />
          </SectionReveal>
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
