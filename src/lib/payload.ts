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

export type Service = {
  id: string
  title: string
  slug: string
  shortDescription: string
  heroImage: Media
  content?: unknown
  seo?: Seo
}

export type AboutGlobal = {
  title: string
  heroImage?: Media
  content?: unknown
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
