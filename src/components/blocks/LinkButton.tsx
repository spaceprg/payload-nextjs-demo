import Link from 'next/link'
import type { LinkField } from '@/lib/payload'

/** Resolves a `linkFields` value (internal reference or custom URL) to an href. */
export function resolveLinkHref(link: LinkField): string {
  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference
    const slug = typeof value === 'object' && value !== null ? value.slug : undefined
    if (relationTo === 'services' && slug) return `/services/${slug}`
  }
  return link.url || '#'
}

const STYLES = {
  primary: 'rounded-full bg-gomoblue px-8 py-3 font-serif text-sm italic text-white transition hover:bg-gomoblue/90',
  secondary:
    'rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10',
  // Used for emphasis on hero/CTA-style sections.
  primaryInverted:
    'rounded-full bg-gradient-to-r from-[#8f38f8] via-[#268de5] to-[#2804de] px-8 py-3 font-serif text-sm italic text-white transition hover:opacity-90',
  secondaryInverted:
    'rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10',
}

export default function LinkButton({
  link,
  variant = 'primary',
  invert = false,
}: {
  link: LinkField
  variant?: 'primary' | 'secondary'
  invert?: boolean
}) {
  if (!link?.label) return null

  const href = resolveLinkHref(link)
  const style = link.style ?? variant
  const className = invert
    ? STYLES[style === 'secondary' ? 'secondaryInverted' : 'primaryInverted']
    : STYLES[style === 'secondary' ? 'secondary' : 'primary']

  return (
    <Link
      href={href}
      target={link.newTab ? '_blank' : undefined}
      rel={link.newTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {link.label}
    </Link>
  )
}
