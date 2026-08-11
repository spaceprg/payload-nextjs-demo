import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import PageBuilder from '@/components/blocks/PageBuilder'
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

  const hasLayout = service.layout && service.layout.length > 0

  return (
    <>
      <HeroBanner title={service.title} imageUrl={mediaUrl(service.heroImage, 'hero')} align="left" />
      {hasLayout ? (
        <PageBuilder blocks={service.layout} />
      ) : (
        <>
          <ContentSection>
            <p className="text-lg text-gray-700">{service.shortDescription}</p>
            <RichText data={service.content as SerializedEditorState | undefined} className="mt-6" />
          </ContentSection>
          <CTASection title="Interested in this service?" />
        </>
      )}
    </>
  )
}
