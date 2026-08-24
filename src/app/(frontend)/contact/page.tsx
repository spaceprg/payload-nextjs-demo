import type { Metadata } from 'next'
import PageBuilder from '@/components/blocks/PageBuilder'
import ContactFormSection from '@/components/ContactFormSection'
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
  const hasLayout = contact?.layout && contact.layout.length > 0

  return (
    <>
      {hasLayout ? (
        <PageBuilder blocks={contact!.layout} />
      ) : (
        <div className="bg-ink pt-32">
          <div className="mx-auto max-w-content px-6">
            <h1 className="text-4xl font-medium text-white md:text-5xl">{contact?.title || 'Contact Us'}</h1>
          </div>
        </div>
      )}
      <ContactFormSection contact={contact} />
    </>
  )
}
