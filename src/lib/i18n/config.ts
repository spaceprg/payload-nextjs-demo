/**
 * Central list of supported site languages. English is the default and is
 * served at the existing unprefixed URLs; Swedish is served under `/sv/...`
 * (see `src/proxy.ts` for the rewrite that makes English's prefix invisible).
 */
export type Locale = 'en' | 'sv'

export const locales: Locale[] = ['en', 'sv']

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as string[]).includes(value)
}
