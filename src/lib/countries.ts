import type { Locale } from './i18n/config'

// A representative list rather than the full ISO-3166 set, covering the
// markets GO MO Group's contact form is realistically filled out from.
// Kept as a stable, locale-independent `code` so the *value* submitted with
// the form doesn't change with the visitor's language — only the label shown
// in the dropdown is translated.
const COUNTRY_LIST: { code: string; en: string; sv: string }[] = [
  { code: 'Sweden', en: 'Sweden', sv: 'Sverige' },
  { code: 'United Kingdom', en: 'United Kingdom', sv: 'Storbritannien' },
  { code: 'India', en: 'India', sv: 'Indien' },
  { code: 'United States', en: 'United States', sv: 'USA' },
  { code: 'Germany', en: 'Germany', sv: 'Tyskland' },
  { code: 'Norway', en: 'Norway', sv: 'Norge' },
  { code: 'Denmark', en: 'Denmark', sv: 'Danmark' },
  { code: 'Finland', en: 'Finland', sv: 'Finland' },
  { code: 'Netherlands', en: 'Netherlands', sv: 'Nederländerna' },
  { code: 'France', en: 'France', sv: 'Frankrike' },
  { code: 'Spain', en: 'Spain', sv: 'Spanien' },
  { code: 'Italy', en: 'Italy', sv: 'Italien' },
  { code: 'Switzerland', en: 'Switzerland', sv: 'Schweiz' },
  { code: 'Austria', en: 'Austria', sv: 'Österrike' },
  { code: 'Belgium', en: 'Belgium', sv: 'Belgien' },
  { code: 'Ireland', en: 'Ireland', sv: 'Irland' },
  { code: 'Poland', en: 'Poland', sv: 'Polen' },
  { code: 'Portugal', en: 'Portugal', sv: 'Portugal' },
  { code: 'Canada', en: 'Canada', sv: 'Kanada' },
  { code: 'Australia', en: 'Australia', sv: 'Australien' },
  { code: 'Singapore', en: 'Singapore', sv: 'Singapore' },
  { code: 'United Arab Emirates', en: 'United Arab Emirates', sv: 'Förenade Arabemiraten' },
  { code: 'Saudi Arabia', en: 'Saudi Arabia', sv: 'Saudiarabien' },
  { code: 'Japan', en: 'Japan', sv: 'Japan' },
  { code: 'China', en: 'China', sv: 'Kina' },
  { code: 'South Korea', en: 'South Korea', sv: 'Sydkorea' },
  { code: 'Brazil', en: 'Brazil', sv: 'Brasilien' },
  { code: 'Mexico', en: 'Mexico', sv: 'Mexiko' },
  { code: 'South Africa', en: 'South Africa', sv: 'Sydafrika' },
  { code: 'Other', en: 'Other', sv: 'Annat' },
]

/** English country names — kept for any legacy caller that hasn't gone through `getCountries()` yet. */
export const COUNTRIES = COUNTRY_LIST.map((country) => country.en)

/** Returns `{ code, label }` pairs, with `label` translated for the given locale. The submitted value is always `code` (stable across locales). */
export function getCountries(locale: Locale): { code: string; label: string }[] {
  return COUNTRY_LIST.map(({ code, ...labels }) => ({ code, label: labels[locale] }))
}
