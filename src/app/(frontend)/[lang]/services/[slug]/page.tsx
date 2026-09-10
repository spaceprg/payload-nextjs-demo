import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import PageBuilder from '@/components/blocks/PageBuilder'
import { getServiceBySlug, getServices, getAlternateSlug, mediaUrl } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref } from '@/lib/i18n/href'
import { SetAlternateHref } from '@/lib/i18n/alternate-link-context'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: service.seo?.metaTitle || `${service.title} | GO MO Group`,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const otherLocale = locale === 'en' ? 'sv' : 'en'
  const otherSlug = await getAlternateSlug('services', service.id, otherLocale)
  const alternateHref = otherSlug
    ? localizeHref(`/services/${otherSlug}`, otherLocale)
    : localizeHref('/services', otherLocale)

  const hasLayout = service.layout && service.layout.length > 0

  return (
    <>
      <SetAlternateHref href={alternateHref} />
      <HeroBanner title={service.title} imageUrl={mediaUrl(service.heroImage, 'hero')} align="left" />
      {hasLayout ? (
        <PageBuilder blocks={service.layout} />
      ) : (
        <>
          <ContentSection>
            <p className="text-lg text-white/80">{service.shortDescription}</p>
            <RichText data={service.content as SerializedEditorState | undefined} className="mt-6" />
          </ContentSection>
          <CTASection title={dict.common.ctaInterestedInService} />
        </>
      )}
    </>
  )
}
