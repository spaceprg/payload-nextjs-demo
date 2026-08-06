import Link from 'next/link'
import type { ContactGlobal } from '@/lib/payload'

export default function Footer({ contact }: { contact?: ContactGlobal | null }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-content gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-brand">Demo Company</p>
          <p className="mt-2 text-sm text-gray-600">
            Building modern digital solutions with technology and innovation.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-brand">Home</Link></li>
            <li><Link href="/services" className="hover:text-brand">Services</Link></li>
            <li><Link href="/about" className="hover:text-brand">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>{contact?.email ?? 'hello@example.com'}</li>
            <li>{contact?.phone ?? '+46 000 000 000'}</li>
            <li>{contact?.address ?? 'Stockholm, Sweden'}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {year} Demo Company. All rights reserved.
      </div>
    </footer>
  )
}
