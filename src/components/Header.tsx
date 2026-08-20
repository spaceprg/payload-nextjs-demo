'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Solutions', href: '/services' },
  { label: 'Services', href: '/services' },
  { label: 'GEO', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Case', href: '/case-studies' },
  { label: 'About Us', href: '/about' },
]

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      className={`inset-x-0 top-0 z-50 transition-colors duration-150 ease-out ${
        scrolled ? 'fixed bg-ink/80 backdrop-blur' : 'absolute bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-8 rounded-full bg-white/20 py-3 pl-8 pr-6">
          <Link href="/" className="relative h-6 w-[94px] shrink-0">
            <Image src="/images/home/nav/logo.svg" alt="GO MO Group" fill className="object-contain object-left" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white transition hover:text-mint ${
                  isActive(link.href) ? 'text-mint' : ''
                }`}
              >
                {link.label}
                {link.label !== 'Insights' && <ChevronDown />}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/contact"
          className="hidden shrink-0 rounded-full bg-gomoblue px-9 py-3.5 font-serif text-base italic text-white transition hover:bg-gomoblue/90 lg:inline-flex"
        >
          Contact Us
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
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
              key={link.label}
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
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-gomoblue px-6 py-3 font-serif text-sm italic text-white"
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  )
}
