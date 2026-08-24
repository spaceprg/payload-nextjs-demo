import ContactForm from '@/components/ContactForm'
import type { ContactGlobal } from '@/lib/payload'

export default function ContactFormSection({ contact }: { contact: ContactGlobal | null }) {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-medium text-white">{contact?.title || 'Contact Us'}</h2>
          <p className="mt-4 text-white/70">
            {contact?.description || "We'd love to hear about your project. Reach out any time."}
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-white">Email:</dt>
              <dd className="text-white/70">{contact?.email || 'hello@example.com'}</dd>
            </div>
            {contact?.phone && (
              <div className="flex gap-2">
                <dt className="font-medium text-white">Phone:</dt>
                <dd className="text-white/70">{contact.phone}</dd>
              </div>
            )}
            {contact?.address && (
              <div className="flex gap-2">
                <dt className="font-medium text-white">Address:</dt>
                <dd className="text-white/70">{contact.address}</dd>
              </div>
            )}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
