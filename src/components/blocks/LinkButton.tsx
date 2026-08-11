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
  primary: 'rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark',
  secondary:
    'rounded-full border border-brand px-8 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white',
  // Used on brand/dark-colored section backgrounds, where the default styles above
  // would blend into the background.
  primaryInverted:
    'rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand transition hover:bg-gray-100',
  secondaryInverted:
    'rounded-full border border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand',
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
