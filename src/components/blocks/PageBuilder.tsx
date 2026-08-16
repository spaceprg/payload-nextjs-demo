import type { LayoutBlock } from '@/lib/payload'
import ContentBlock from './ContentBlock'
import ImageBlock from './ImageBlock'
import CTABlock from './CTABlock'
import ColumnsBlock from './ColumnsBlock'
import ImageContentBlock from './ImageContentBlock'
import HeroBlock from './HeroBlock'
import StatsBlock from './StatsBlock'
import TestimonialsBlock from './TestimonialsBlock'
import FAQBlock from './FAQBlock'
import LogoCloudBlock from './LogoCloudBlock'
import HomeHeroBlock from './HomeHeroBlock'
import ProofBarBlock from './ProofBarBlock'
import SegmentCardsBlock from './SegmentCardsBlock'
import TransformSplitBlock from './TransformSplitBlock'
import ServiceMarqueeBlock from './ServiceMarqueeBlock'
import AIWorkflowPanelBlock from './AIWorkflowPanelBlock'
import VideoTestimonialsBlock from './VideoTestimonialsBlock'
import CaseStudySpotlightBlock from './CaseStudySpotlightBlock'
import InsightsGridBlock from './InsightsGridBlock'

/**
 * Renders a page's `layout` blocks field. To support a new section type, add its config to
 * `src/blocks/index.ts`, its renderer here, and a `case` below — no page needs to change.
 */
export default function PageBuilder({ blocks }: { blocks?: LayoutBlock[] | null }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} {...block} />
          case 'content':
            return <ContentBlock key={key} {...block} />
          case 'imageBlock':
            return <ImageBlock key={key} {...block} />
          case 'cta':
            return <CTABlock key={key} {...block} />
          case 'columns':
            return <ColumnsBlock key={key} {...block} />
          case 'imageContent':
            return <ImageContentBlock key={key} {...block} />
          case 'stats':
            return <StatsBlock key={key} {...block} />
          case 'testimonials':
            return <TestimonialsBlock key={key} {...block} />
          case 'faq':
            return <FAQBlock key={key} {...block} />
          case 'logoCloud':
            return <LogoCloudBlock key={key} {...block} />
          case 'homeHero':
            return <HomeHeroBlock key={key} {...block} />
          case 'proofBar':
            return <ProofBarBlock key={key} {...block} />
          case 'segmentCards':
            return <SegmentCardsBlock key={key} {...block} />
          case 'transformSplit':
            return <TransformSplitBlock key={key} {...block} />
          case 'serviceMarquee':
            return <ServiceMarqueeBlock key={key} {...block} />
          case 'aiWorkflowPanel':
            return <AIWorkflowPanelBlock key={key} {...block} />
          case 'videoTestimonials':
            return <VideoTestimonialsBlock key={key} {...block} />
          case 'caseStudySpotlight':
            return <CaseStudySpotlightBlock key={key} {...block} />
          case 'insightsGrid':
            return <InsightsGridBlock key={key} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
