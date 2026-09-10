import type { Locale } from './config'

// http(s):, mailto:, tel:, and bare #anchor links are left untouched.
const EXTERNAL_OR_SPECIAL = /^([a-z][a-z0-9+.-]*:|#)/i

/**
 * Prefixes an internal path with the Swedish locale segment when needed.
 * Leaves external links, anchors, mailto/tel links, and already-prefixed
 * paths untouched. Pure string logic — safe to import from both Server and
 * Client Components.
 */
export function localizeHref(href: string | null | undefined, locale: Locale): string {
  if (!href) return href || '#'
  if (locale !== 'sv') return href
  if (EXTERNAL_OR_SPECIAL.test(href)) return href
  if (!href.startsWith('/')) return href
  if (href === '/sv' || href.startsWith('/sv/')) return href
  return `/sv${href}`
}
