import type { Metadata } from 'next'
import { Nunito_Sans, Merriweather } from 'next/font/google'
import { lang } from 'next/root-params'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContact } from '@/lib/payload'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { isLocale, defaultLocale, locales } from '@/lib/i18n/config'
import { AlternateLinkProvider } from '@/lib/i18n/alternate-link-context'
import '../globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GO MO Group',
  description: 'Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era.',
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const rawLang = await lang()
  const locale = isLocale(rawLang) ? rawLang : defaultLocale
  const [contact, dictionary] = await Promise.all([getContact(), getDictionary(locale)])

  return (
    <html lang={locale} className={`${nunitoSans.variable} ${merriweather.variable}`}>
      <body className="relative flex min-h-screen flex-col bg-ink font-sans text-white antialiased">
        <AlternateLinkProvider>
          <Header dictionary={dictionary} />
          <main className="flex-1">{children}</main>
          <Footer contact={contact} dictionary={dictionary} />
        </AlternateLinkProvider>
      </body>
    </html>
  )
}
