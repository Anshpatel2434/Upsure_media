import type { ComponentType } from "react";

import type { Page } from "@/content/types";

import { ApproachStepsBlock } from "@/components/blocks/approach-steps";
import { BlogCarouselBlock } from "@/components/blocks/blog-carousel";
import { CapabilitiesBlock } from "@/components/blocks/capabilities";
import { ComparisonBlock } from "@/components/blocks/comparison";
import { CtaBlock } from "@/components/blocks/cta";
import { EngagementModelsBlock } from "@/components/blocks/engagement-models";
import { FaqBlock } from "@/components/blocks/faq";
import { FeatureListBlock } from "@/components/blocks/feature-list";
import { HeroBlock } from "@/components/blocks/hero";
import { LeadFormBlock } from "@/components/blocks/lead-form";
import { LogoTickerBlock } from "@/components/blocks/logo-ticker";
import { MediaBlock } from "@/components/blocks/media";
import { NeedPickerBlock } from "@/components/blocks/need-picker";
import { NewsletterBlock } from "@/components/blocks/newsletter";
import { ProcessStepsBlock } from "@/components/blocks/process-steps";
import { ProofTickerBlock } from "@/components/blocks/proof-ticker";
import { RichTextBlock } from "@/components/blocks/rich-text";
import { ServiceGridBlock } from "@/components/blocks/service-grid";
import { StatementBlock } from "@/components/blocks/statement";
import { StatsBlock } from "@/components/blocks/stats";
import { TeamGridBlock } from "@/components/blocks/team-grid";
import { TestimonialCarouselBlock } from "@/components/blocks/testimonial-carousel";
import { TextColumnsBlock } from "@/components/blocks/text-columns";
import { WorkGridBlock } from "@/components/blocks/work-grid";

export type LayoutBlock = NonNullable<Page["layout"]>[number];
export type BlockOf<T extends LayoutBlock["blockType"]> = Extract<LayoutBlock, { blockType: T }>;

/** Every block component receives its CMS data plus its 1-based section index. */
export type BlockProps<T extends LayoutBlock["blockType"]> = { block: BlockOf<T>; index: number };

const registry: { [K in LayoutBlock["blockType"]]: ComponentType<BlockProps<K>> } = {
  hero: HeroBlock,
  statement: StatementBlock,
  stats: StatsBlock,
  logoTicker: LogoTickerBlock,
  proofTicker: ProofTickerBlock,
  serviceGrid: ServiceGridBlock,
  workGrid: WorkGridBlock,
  testimonialCarousel: TestimonialCarouselBlock,
  needPicker: NeedPickerBlock,
  capabilities: CapabilitiesBlock,
  approachSteps: ApproachStepsBlock,
  featureList: FeatureListBlock,
  faq: FaqBlock,
  teamGrid: TeamGridBlock,
  blogCarousel: BlogCarouselBlock,
  leadForm: LeadFormBlock,
  engagementModels: EngagementModelsBlock,
  comparison: ComparisonBlock,
  processSteps: ProcessStepsBlock,
  newsletter: NewsletterBlock,
  textColumns: TextColumnsBlock,
  media: MediaBlock,
  richText: RichTextBlock,
  cta: CtaBlock,
};

/**
 * Renders a page-builder layout. Section numbering skips heroes so the first
 * numbered eyebrow below a hero reads "01".
 */
export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] | null | undefined }) {
  if (!blocks?.length) return null;
  const numbered = blocks.reduce<{ block: LayoutBlock; index: number }[]>((acc, block) => {
    const prev = acc[acc.length - 1]?.index ?? 0;
    acc.push({ block, index: block.blockType === "hero" ? prev : prev + 1 });
    return acc;
  }, []);
  return (
    <>
      {numbered.map(({ block, index }) => {
        const Component = registry[block.blockType] as ComponentType<{
          block: LayoutBlock;
          index: number;
        }>;
        if (!Component) return null;
        return (
          <Component key={block.id ?? `${block.blockType}-${index}`} block={block} index={index} />
        );
      })}
    </>
  );
}
