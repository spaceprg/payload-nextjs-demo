import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

// NOTE: this Next.js version renamed the `middleware` file convention to
// `proxy` (see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
// Do not reintroduce a `middleware.ts` — it is deprecated and won't run.

/**
 * English is the default locale and is served at the existing unprefixed
 * URLs (e.g. `/services`); Swedish is served under `/sv/...`. Every page
 * actually lives under `app/(frontend)/[lang]/...`, so an unprefixed request
 * is rewritten (invisibly — the browser URL bar is untouched) to `/en/...`.
 * A `/sv/...` request already matches `[lang]=sv` and passes through as-is.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocalePrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  if (hasLocalePrefix) return

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!api|admin|_next/static|_next/image|media|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
