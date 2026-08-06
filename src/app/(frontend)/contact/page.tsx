import type { Metadata } from 'next'
import { getContact } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  return {
    title: contact?.seo?.metaTitle || 'Contact | Demo Company',
    description: contact?.seo?.metaDescription || 'Get in touch with Demo Company.',
  }
}

export default async function ContactPage() {
  const contact = await getContact()

  return (
    <div className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {contact?.title || 'Contact Us'}
        </h1>
        <p className="mt-4 text-gray-600">
          {contact?.description || "We'd love to hear about your project. Reach out any time."}
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex gap-2">
            <dt className="font-medium text-gray-900">Email:</dt>
            <dd className="text-gray-600">{contact?.email || 'hello@example.com'}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-gray-900">Phone:</dt>
            <dd className="text-gray-600">{contact?.phone || '+46 000 000 000'}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-gray-900">Address:</dt>
            <dd className="text-gray-600">{contact?.address || 'Stockholm, Sweden'}</dd>
          </div>
        </dl>
      </div>

      {/* Static placeholder — no backend submission wired up */}
      <form className="space-y-4 rounded-xl border border-gray-200 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Message</label>
          <textarea rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="How can we help?" />
        </div>
        <button
          type="button"
          className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Send Message
        </button>
        <p className="text-xs text-gray-400">
          Placeholder form — not wired to a backend submission handler.
        </p>
      </form>
    </div>
  )
}
