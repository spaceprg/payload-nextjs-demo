import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContact } from '@/lib/payload'
import './globals.css'

export const metadata: Metadata = {
  title: 'Demo Company',
  description: 'A demo website built with Next.js and Payload CMS.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = await getContact()

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} />
      </body>
    </html>
  )
}
