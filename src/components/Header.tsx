'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/i18n/useLocale'
import { localizeHref } from '@/lib/i18n/href'
import { useAlternateHref } from '@/lib/i18n/alternate-link-context'
import type { Dictionary } from '@/lib/i18n/getDictionary'
import type { Locale } from '@/lib/i18n/config'

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

export default function Header({ dictionary }: { dictionary: Dictionary }) {
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

  const NAV_LINKS = [
    { label: dictionary.nav.solutions, href: '/solutions', chevron: true },
    { label: dictionary.nav.services, href: '/services', chevron: true },
    { label: dictionary.nav.geo, href: '/services', chevron: true },
    { label: dictionary.nav.insights, href: '/insights', chevron: false },
    { label: dictionary.nav.caseStudies, href: '/case-studies', chevron: true },
    { label: dictionary.nav.about, href: '/about', chevron: true },
  ]

  const isActive = (href: string) => {
    const target = localizeHref(href, locale)
    return target === (locale === 'sv' ? '/sv' : '/') ? pathname === target : pathname.startsWith(target)
  }

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
            <Image src="/images/home/nav/logo.svg" alt="GO MO Group" fill className="object-contain object-left" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label + link.href}
                href={localizeHref(link.href, locale)}
                className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white transition hover:text-mint ${
                  isActive(link.href) ? 'text-mint' : ''
                }`}
              >
                {link.label}
                {link.chevron && <ChevronDown />}
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
            href={localizeHref('/contact', locale)}
            className="rounded-full bg-gomoblue px-9 py-3.5 font-serif text-base italic text-white transition hover:bg-gomoblue/90"
          >
            {dictionary.nav.contactCta}
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label + link.href}
              href={localizeHref(link.href, locale)}
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
            href={localizeHref('/contact', locale)}
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-gomoblue px-6 py-3 font-serif text-sm italic text-white"
          >
            {dictionary.nav.contactCta}
          </Link>
        </nav>
      )}
    </header>
  )
}
