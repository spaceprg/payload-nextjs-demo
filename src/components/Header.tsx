'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/i18n/useLocale'
import { localizeHref } from '@/lib/i18n/href'
import { useAlternateHref } from '@/lib/i18n/alternate-link-context'
import { mediaUrl } from '@/lib/media'
import type { Dictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/lib/i18n/config'
import type { HeaderSettingsGlobal, LinkField } from '@/lib/payload'

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Strips a leading `/sv` prefix, if present, e.g. `/sv/about` -> `/about`. */
function stripSvPrefix(pathname: string): string {
  if (pathname === '/sv') return '/'
  if (pathname.startsWith('/sv/')) return pathname.slice(3)
  return pathname
}

/**
 * Client-safe equivalent of `resolveLinkHref` (src/components/blocks/LinkButton.tsx),
 * which can't be used here directly since it depends on the server-only
 * `next/root-params`. `Header` already knows its locale via `useLocale()`.
 */
function resolveNavHref(link: LinkField, locale: Locale): string {
  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference
    const slug = typeof value === 'object' && value !== null ? value.slug : undefined
    if (relationTo === 'services' && slug) return localizeHref(`/services/${slug}`, locale)
  }
  return localizeHref(link.url || '#', locale)
}

export default function Header({
  dictionary,
  settings,
}: {
  dictionary: Dictionary
  settings: HeaderSettingsGlobal | null
}) {
  const pathname = usePathname()
  const locale = useLocale()
  const alternateHref = useAlternateHref()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Falls back to the site's original nav/CTA/logo if Theme Options → Header
  // Options hasn't been configured yet, so the header never renders empty.
  const navItems: { label: string; href: string }[] =
    settings?.navItems && settings.navItems.length > 0
      ? settings.navItems.map((item) => ({ label: item.label, href: resolveNavHref(item, locale) }))
      : [
          { label: dictionary.nav.solutions, href: localizeHref('/solutions', locale) },
          { label: dictionary.nav.services, href: localizeHref('/services', locale) },
          { label: dictionary.nav.geo, href: localizeHref('/services', locale) },
          { label: dictionary.nav.insights, href: localizeHref('/insights', locale) },
          { label: dictionary.nav.caseStudies, href: localizeHref('/case-studies', locale) },
          { label: dictionary.nav.about, href: localizeHref('/about', locale) },
        ]

  const contactButton = settings?.contactButton?.label
    ? { label: settings.contactButton.label, href: resolveNavHref(settings.contactButton, locale) }
    : { label: dictionary.nav.contactCta, href: localizeHref('/contact', locale) }

  const logoSrc = settings?.logo ? mediaUrl(settings.logo) : '/images/home/nav/logo.svg'
  const logoAlt = settings?.logoAltText || 'GO MO Group'

  const isActive = (href: string) =>
    href === (locale === 'sv' ? '/sv' : '/') ? pathname === href : pathname.startsWith(href)

  // For most pages, switching language is just swapping the `/sv` prefix on
  // the current path. Detail pages with translated slugs publish the exact
  // alternate URL via `AlternateLinkContext` (see services/[slug]/page.tsx
  // and friends) — that takes priority when present.
  const otherLocale: Locale = locale === 'en' ? 'sv' : 'en'
  const defaultOtherHref = locale === 'en' ? `/sv${pathname === '/' ? '' : pathname}` : stripSvPrefix(pathname)
  const otherLocaleHref = alternateHref ?? defaultOtherHref

  return (
    <header
      className={`inset-x-0 top-0 z-50 transition-colors duration-150 ease-out ${
        scrolled ? 'fixed bg-ink/80 backdrop-blur' : 'absolute bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-8 rounded-full bg-white/20 py-3 pl-8 pr-6">
          <Link href={localizeHref('/', locale)} className="relative h-6 w-[94px] shrink-0">
            <Image src={logoSrc} alt={logoAlt} fill className="object-contain object-left" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((link, index) => (
              <Link
                key={`${link.label}-${index}`}
                href={link.href}
                className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white transition hover:text-mint ${
                  isActive(link.href) ? 'text-mint' : ''
                }`}
              >
                {link.label}
                <ChevronDown />
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <Link
            href={otherLocaleHref}
            className="text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:text-mint"
          >
            {dictionary.languageSwitcher[otherLocale]}
          </Link>
          <Link
            href={contactButton.href}
            className="rounded-full bg-gomoblue px-9 py-3.5 font-serif text-base italic text-white transition hover:bg-gomoblue/90"
          >
            {contactButton.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={dictionary.nav.toggleMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-ink px-6 py-4 lg:hidden">
          {navItems.map((link, index) => (
            <Link
              key={`${link.label}-${index}`}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide ${
                isActive(link.href) ? 'bg-white/10 text-mint' : 'text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={otherLocaleHref}
            onClick={() => setMenuOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-white/70 hover:bg-white/5"
          >
            {dictionary.languageSwitcher[otherLocale]}
          </Link>
          <Link
            href={contactButton.href}
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-gomoblue px-6 py-3 font-serif text-sm italic text-white"
          >
            {contactButton.label}
          </Link>
        </nav>
      )}
    </header>
  )
}
