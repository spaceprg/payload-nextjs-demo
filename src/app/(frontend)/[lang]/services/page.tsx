import type { Metadata } from 'next'
import ServicesGrid from '@/components/ServicesGrid'
import { getServices } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(await getLocale())
  return {
    title: `${dict.common.ourServicesTitle} | GO MO Group`,
    description: dict.common.ourServicesSubtitle,
  }
}

export default async function ServicesPage() {
  const locale = await getLocale()
  const [services, dict] = await Promise.all([getServices(), getDictionary(locale)])

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">{dict.common.ourServicesTitle}</h1>
          <p className="mt-3 text-white/70">{dict.common.ourServicesSubtitle}</p>
        </div>
        <ServicesGrid services={services} />
      </div>
    </div>
  )
}
