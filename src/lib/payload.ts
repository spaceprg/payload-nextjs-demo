import { getPayload } from 'payload'
import config from '@payload-config'

// Types matching the collections/globals defined in payload.config.ts.
// Run `npm run generate:types` after your first schema push to replace
// these with Payload's auto-generated types from payload-types.ts.

export type Media = {
  id: string
  alt: string
  url?: string
  sizes?: {
    thumbnail?: { url?: string }
    card?: { url?: string }
    hero?: { url?: string }
  }
}

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

export type AboutGlobal = {
  title: string
  heroImage?: Media
  content?: unknown
  layout?: LayoutBlock[]
  seo?: Seo
}

export type ContactGlobal = {
  title: string
  description?: string
  email: string
  phone?: string
  address?: string
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

/** Resolve a Payload media object to an absolute-enough URL for <Image>. */
export function mediaUrl(media?: Media, size?: 'thumbnail' | 'card' | 'hero'): string {
  if (!media) return '/placeholder.svg'
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url as string
  return media.url || '/placeholder.svg'
}
