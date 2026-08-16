import type { Metadata } from 'next'
import { Nunito_Sans, Merriweather } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContact } from '@/lib/payload'
import './globals.css'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = await getContact()

  return (
    <html lang="en" className={`${nunitoSans.variable} ${merriweather.variable}`}>
      <body className="relative flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} />
      </body>
    </html>
  )
}
