import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import { getServiceBySlug, getServices, mediaUrl } from '@/lib/payload'

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
    title: service.seo?.metaTitle || `${service.title} | Demo Company`,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  return (
    <>
      <HeroBanner title={service.title} imageUrl={mediaUrl(service.heroImage, 'hero')} align="left" />
      <ContentSection>
        {/* Swap in a rich text renderer (e.g. @payloadcms/richtext-lexical/react)
            once real content is added in the admin panel. */}
        <p>{service.shortDescription}</p>
      </ContentSection>
      <CTASection title="Interested in this service?" />
    </>
  )
}
