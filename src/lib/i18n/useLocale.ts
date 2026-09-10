'use client'

import { usePathname } from 'next/navigation'
import type { Locale } from './config'

/** Client-side equivalent of `getLocale()`, derived from the current URL. */
export function useLocale(): Locale {
  const pathname = usePathname()
  return pathname === '/sv' || pathname.startsWith('/sv/') ? 'sv' : 'en'
}
