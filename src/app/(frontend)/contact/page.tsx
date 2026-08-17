import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { getContact } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  return {
    title: contact?.seo?.metaTitle || 'Contact | GO MO Group',
    description: contact?.seo?.metaDescription || 'Get in touch with GO MO Group.',
  }
}

export default async function ContactPage() {
  const contact = await getContact()

  return (
    <div className="bg-ink">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-medium text-white">
            {contact?.title || 'Contact Us'}
          </h1>
          <p className="mt-4 text-white/70">
            {contact?.description || "We'd love to hear about your project. Reach out any time."}
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-white">Email:</dt>
              <dd className="text-white/70">{contact?.email || 'hello@example.com'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-white">Phone:</dt>
              <dd className="text-white/70">{contact?.phone || '+46 000 000 000'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-white">Address:</dt>
              <dd className="text-white/70">{contact?.address || 'Stockholm, Sweden'}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
