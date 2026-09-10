import ContactForm from '@/components/ContactForm'
import type { ContactGlobal } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'

export default async function ContactFormSection({ contact }: { contact: ContactGlobal | null }) {
  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const t = dict.contactPage

  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-medium text-white">{contact?.title || t.defaultTitle}</h2>
          <p className="mt-4 text-white/70">{contact?.description || t.defaultDescription}</p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-white">{t.emailLabel}</dt>
              <dd className="text-white/70">{contact?.email || t.defaultEmail}</dd>
            </div>
            {contact?.phone && (
              <div className="flex gap-2">
                <dt className="font-medium text-white">{t.phoneLabel}</dt>
                <dd className="text-white/70">{contact.phone}</dd>
              </div>
            )}
            {contact?.address && (
              <div className="flex gap-2">
                <dt className="font-medium text-white">{t.addressLabel}</dt>
                <dd className="text-white/70">{contact.address}</dd>
              </div>
            )}
          </dl>
        </div>

        <ContactForm dictionary={dict} />
      </div>
    </section>
  )
}
