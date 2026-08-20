import { getPayload } from 'payload'
import config from '@payload-config'
import { mediaUrl } from './media'
import type { Media } from './media'

export { mediaUrl }
export type { Media }

// Types matching the collections/globals defined in payload.config.ts.
// Run `npm run generate:types` after your first schema push to replace
// these with Payload's auto-generated types from payload-types.ts.

export type Seo = {
  metaTitle?: string
  metaDescription?: string
}

// --- Page builder ------------------------------------------------------
// Types matching the block configs in src/blocks/. Kept alongside the rest
// of this file's manually-maintained types (see note above generate:types).

export type LinkField = {
  label: string
  type?: 'reference' | 'custom'
  reference?: { relationTo: 'services'; value: Service | string } | null
  url?: string | null
  newTab?: boolean | null
  style?: 'primary' | 'secondary' | null
}

export type Alignment = 'left' | 'center' | 'right'

export type ContentBlockData = {
  id?: string
  blockType: 'content'
  eyebrow?: string | null
  heading?: string | null
  richText?: unknown
  alignment?: Alignment | null
}

export type ImageBlockData = {
  id?: string
  blockType: 'imageBlock'
  image: Media
  altOverride?: string | null
  caption?: string | null
  alignment?: 'left' | 'center' | 'right' | null
  size?: 'contained' | 'wide' | 'full' | null
}

export type CTABlockData = {
  id?: string
  blockType: 'cta'
  heading?: string | null
  text?: string | null
  alignment?: 'left' | 'center' | null
  buttons?: LinkField[] | null
}

export type ColumnItem = {
  id?: string
  heading?: string | null
  richText?: unknown
  image?: Media | null
  altOverride?: string | null
  buttons?: LinkField[] | null
}

export type ColumnsLayout = '50-50' | '33-33-33' | '33-66' | '66-33'

export type ColumnsBlockData = {
  id?: string
  blockType: 'columns'
  layout: ColumnsLayout
  columns: ColumnItem[]
}

export type ImageContentBlockData = {
  id?: string
  blockType: 'imageContent'
  imagePosition?: 'left' | 'right' | null
  image: Media
  altOverride?: string | null
  eyebrow?: string | null
  heading?: string | null
  richText?: unknown
  buttons?: LinkField[] | null
  background?: 'none' | 'light' | 'brand' | 'dark' | null
}

export type HeroBlockData = {
  id?: string
  blockType: 'hero'
  eyebrow?: string | null
  heading: string
  text?: string | null
  image?: Media | null
  alignment?: 'left' | 'center' | null
  buttons?: LinkField[] | null
}

export type StatItem = {
  id?: string
  value: string
  label: string
}

export type StatsBlockData = {
  id?: string
  blockType: 'stats'
  heading?: string | null
  stats: StatItem[]
  background?: 'none' | 'light' | 'brand' | null
}

export type TestimonialItem = {
  id?: string
  quote: string
  authorName: string
  authorRole?: string | null
  authorImage?: Media | null
}

export type TestimonialsBlockData = {
  id?: string
  blockType: 'testimonials'
  eyebrow?: string | null
  heading?: string | null
  testimonials: TestimonialItem[]
}

export type FAQItem = {
  id?: string
  question: string
  answer: string
}

export type FAQBlockData = {
  id?: string
  blockType: 'faq'
  eyebrow?: string | null
  heading?: string | null
  items: FAQItem[]
}

export type LogoItem = {
  id?: string
  image: Media
  altOverride?: string | null
  url?: string | null
}

export type LogoCloudBlockData = {
  id?: string
  blockType: 'logoCloud'
  heading?: string | null
  logos: LogoItem[]
}

// --- Homepage (GO MO design) blocks ------------------------------------

export type HomeHeroBlockData = {
  id?: string
  blockType: 'homeHero'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
  scrollLabel?: string | null
  backgroundType?: 'image' | 'video' | null
  backgroundImage?: Media | null
  backgroundVideo?: Media | null
}

export type ProofStatItem = {
  id?: string
  value: string
  description: string
  color?: 'yellow' | 'rose' | 'cyan' | 'purple' | null
}

export type ProofBarBlockData = {
  id?: string
  blockType: 'proofBar'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  backgroundImage?: Media | null
  logos?: { id?: string; image: Media }[] | null
  caption?: string | null
  captionSubtext?: string | null
  stats: ProofStatItem[]
}

export type SegmentCardItem = {
  id?: string
  title: string
  description: string
  image?: Media | null
  buttonLabel?: string | null
  buttonHref?: string | null
}

export type SegmentCardsBlockData = {
  id?: string
  blockType: 'segmentCards'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  subtext?: string | null
  cards: SegmentCardItem[]
}

export type TransformSplitBlockData = {
  id?: string
  blockType: 'transformSplit'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  paragraph?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
  galleryImages?: { id?: string; image: Media }[] | null
}

export type ServiceMarqueeBlockData = {
  id?: string
  blockType: 'serviceMarquee'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  subtext?: string | null
  limit?: number | null
}

export type AIWorkflowImprovement = {
  id?: string
  title: string
  description?: string | null
}

export type AIWorkflowTag = {
  id?: string
  label: string
}

export type AIWorkflowPanelBlockData = {
  id?: string
  blockType: 'aiWorkflowPanel'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  paragraph?: string | null
  listLabel?: string | null
  improvements?: AIWorkflowImprovement[] | null
  tags?: AIWorkflowTag[] | null
  buttonLabel?: string | null
  buttonHref?: string | null
  backgroundImage?: Media | null
}

export type VideoSpeaker = {
  id?: string
  posterImage?: Media | null
  name: string
  role: string
  youtubeUrl?: string | null
}

export type VideoTestimonialsBlockData = {
  id?: string
  blockType: 'videoTestimonials'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  mainSpeaker?: VideoSpeaker | null
  testimonials: VideoSpeaker[]
}

export type CaseStudySpotlightBlockData = {
  id?: string
  blockType: 'caseStudySpotlight'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  limit?: number | null
}

export type InsightsGridBlockData = {
  id?: string
  blockType: 'insightsGrid'
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  subtext?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
  limit?: number | null
}

export type LayoutBlock =
  | ContentBlockData
  | ImageBlockData
  | CTABlockData
  | ColumnsBlockData
  | ImageContentBlockData
  | HeroBlockData
  | StatsBlockData
  | TestimonialsBlockData
  | FAQBlockData
  | LogoCloudBlockData
  | HomeHeroBlockData
  | ProofBarBlockData
  | SegmentCardsBlockData
  | TransformSplitBlockData
  | ServiceMarqueeBlockData
  | AIWorkflowPanelBlockData
  | VideoTestimonialsBlockData
  | CaseStudySpotlightBlockData
  | InsightsGridBlockData

export type Service = {
  id: string
  title: string
  slug: string
  shortDescription: string
  heroImage: Media
  content?: unknown
  layout?: LayoutBlock[]
  seo?: Seo
}

export type CaseStudy = {
  id: string
  title: string
  slug?: string | null
  client?: string | null
  excerpt?: string | null
  backgroundImage: Media
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
  content?: unknown
  buttonLabel?: string | null
  seo?: Seo
}

export type Insight = {
  id: string
  title: string
  slug: string
  category: string
  publishedDate: string
  readTime?: string | null
  excerpt?: string | null
  heroImage: Media
  content?: unknown
  seo?: Seo
}

export type AboutGlobal = {
  title: string
  heroImage?: Media
  content?: unknown
  layout?: LayoutBlock[]
  seo?: Seo
}

export type HomeGlobal = {
  layout?: LayoutBlock[]
  seo?: Seo
}

export type ContactGlobal = {
  title: string
  description?: string
  email: string
  phone?: string
  address?: string
  notificationEmail?: string
  content?: unknown
  seo?: Seo
}

/**
 * Fetch all services, ordered by title.
 * Returns an empty array (rather than throwing) if the CMS call fails,
 * so pages can render gracefully with a "no services yet" state.
 */
export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      sort: 'title',
      limit: 100,
    })
    return result.docs as Service[]
  } catch (error) {
    console.error('getServices failed:', error)
    return []
  }
}

/**
 * Fetch all case studies, newest first.
 * Returns an empty array (rather than throwing) if the CMS call fails.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'case-studies',
      sort: '-createdAt',
      limit: 20,
    })
    return result.docs as CaseStudy[]
  } catch (error) {
    console.error('getCaseStudies failed:', error)
    return []
  }
}

/**
 * Fetch a single service by its slug. Returns null if not found or on error,
 * so callers can trigger a 404 via Next's notFound().
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as Service) ?? null
  } catch (error) {
    console.error(`getServiceBySlug(${slug}) failed:`, error)
    return null
  }
}

/**
 * Fetch a single case study by its slug. Returns null if not found or on error,
 * so callers can trigger a 404 via Next's notFound().
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as CaseStudy) ?? null
  } catch (error) {
    console.error(`getCaseStudyBySlug(${slug}) failed:`, error)
    return null
  }
}

/**
 * Fetch all insights, newest first.
 * Returns an empty array (rather than throwing) if the CMS call fails.
 */
export async function getInsights(): Promise<Insight[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'insights',
      sort: '-publishedDate',
      limit: 50,
    })
    return result.docs as Insight[]
  } catch (error) {
    console.error('getInsights failed:', error)
    return []
  }
}

/**
 * Fetch a single insight by its slug. Returns null if not found or on error,
 * so callers can trigger a 404 via Next's notFound().
 */
export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'insights',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return (result.docs[0] as Insight) ?? null
  } catch (error) {
    console.error(`getInsightBySlug(${slug}) failed:`, error)
    return null
  }
}

export async function getAbout(): Promise<AboutGlobal | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({ slug: 'about' })
    return result as AboutGlobal
  } catch (error) {
    console.error('getAbout failed:', error)
    return null
  }
}

export async function getHome(): Promise<HomeGlobal | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({ slug: 'home' })
    return result as HomeGlobal
  } catch (error) {
    console.error('getHome failed:', error)
    return null
  }
}

export async function getContact(): Promise<ContactGlobal | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({ slug: 'contact' })
    return result as ContactGlobal
  } catch (error) {
    console.error('getContact failed:', error)
    return null
  }
}
