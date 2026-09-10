'use client'

import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Lets a CMS detail page (e.g. `services/[slug]`) hand the header's language
 * switcher the *specific* alternate-locale URL for the document currently
 * being viewed — needed because slugs are translatable, so simply swapping
 * the `/sv` prefix on the current pathname is wrong for these pages.
 *
 * Provided once in `[lang]/layout.tsx`, wrapping `<Header/>{children}<Footer/>`.
 * `Header` reads it via `useAlternateHref()`; on every other page (list pages,
 * home, about, contact) no one sets it, so it stays `null` and the header
 * falls back to a plain prefix swap of the current pathname.
 */
const AlternateLinkContext = createContext<{
  href: string | null
  setHref: (href: string | null) => void
} | null>(null)

export function AlternateLinkProvider({ children }: { children: React.ReactNode }) {
  const [href, setHref] = useState<string | null>(null)
  return (
    <AlternateLinkContext.Provider value={{ href, setHref }}>{children}</AlternateLinkContext.Provider>
  )
}

/** Read the alternate-locale href set by the current page, if any. */
export function useAlternateHref(): string | null {
  const ctx = useContext(AlternateLinkContext)
  return ctx?.href ?? null
}

/**
 * Render this from a detail page (a Server Component) to publish the
 * alternate-locale href for the document it's showing. Renders nothing.
 */
export function SetAlternateHref({ href }: { href: string | null }) {
  const ctx = useContext(AlternateLinkContext)

  useEffect(() => {
    ctx?.setHref(href)
    return () => ctx?.setHref(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href])

  return null
}
