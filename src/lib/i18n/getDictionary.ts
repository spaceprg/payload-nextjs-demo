import type { Locale } from './config'
import en from './dictionaries/en'

export type Dictionary = typeof en

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  sv: () => import('./dictionaries/sv').then((m) => m.default),
}

/** Loads the UI-chrome dictionary (nav, footer, form labels, …) for a locale. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
