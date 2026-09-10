import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import { getCaseStudyBySlug, getCaseStudies, getAlternateSlug, mediaUrl } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref } from '@/lib/i18n/href'
import { SetAlternateHref } from '@/lib/i18n/alternate-link-context'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  return caseStudies.filter((caseStudy) => caseStudy.slug).map((caseStudy) => ({ slug: caseStudy.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)
  if (!caseStudy) return {}

  return {
    title: caseStudy.seo?.metaTitle || `${caseStudy.title} | GO MO Group`,
    description: caseStudy.seo?.metaDescription || caseStudy.excerpt || undefined,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) notFound()

  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const otherLocale = locale === 'en' ? 'sv' : 'en'
  const otherSlug = await getAlternateSlug('case-studies', caseStudy.id, otherLocale)
  const alternateHref = otherSlug
    ? localizeHref(`/case-studies/${otherSlug}`, otherLocale)
    : localizeHref('/case-studies', otherLocale)

  return (
    <>
      <SetAlternateHref href={alternateHref} />
      <HeroBanner title={caseStudy.title} imageUrl={mediaUrl(caseStudy.backgroundImage, 'hero')} align="left">
        {caseStudy.client && <p>{caseStudy.client}</p>}
      </HeroBanner>

      <ContentSection>
        <div className="mb-10 flex gap-10">
          <div>
            <p className="font-serif text-4xl text-lime">{caseStudy.stat1Value}</p>
            <p className="mt-2 text-sm text-white/70">{caseStudy.stat1Label}</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-pink">{caseStudy.stat2Value}</p>
            <p className="mt-2 text-sm text-white/70">{caseStudy.stat2Label}</p>
          </div>
        </div>
        {caseStudy.excerpt && <p className="text-lg text-white/80">{caseStudy.excerpt}</p>}
        <RichText data={caseStudy.content as SerializedEditorState | undefined} className="mt-6" />
      </ContentSection>
      <CTASection title={dict.common.ctaInterestedInResults} />
    </>
  )
}
