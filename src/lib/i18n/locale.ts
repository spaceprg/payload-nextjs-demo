import { lang } from 'next/root-params'
import { defaultLocale, isLocale, type Locale } from './config'

/**
 * Resolves the current request's locale from the `[lang]` root route param.
 * Safe to call from any Server Component or server-side utility — no prop
 * drilling required (see `next/root-params`). Not usable in Client Components.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang()
  return isLocale(value) ? value : defaultLocale
}
