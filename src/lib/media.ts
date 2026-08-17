// Client-safe media helpers. Kept separate from lib/payload.ts, which imports the
// server-only Payload SDK — importing that from a Client Component drags Node-only
// dependencies (db drivers, fs, etc.) into the browser bundle.

export type Media = {
  id: string
  alt: string
  url?: string
  mimeType?: string
  sizes?: {
    thumbnail?: { url?: string }
    card?: { url?: string }
    hero?: { url?: string }
  }
}

/** Resolve a Payload media object to an absolute-enough URL for <Image>. */
export function mediaUrl(media?: Media, size?: 'thumbnail' | 'card' | 'hero'): string {
  if (!media) return '/placeholder.svg'
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url as string
  return media.url || '/placeholder.svg'
}
