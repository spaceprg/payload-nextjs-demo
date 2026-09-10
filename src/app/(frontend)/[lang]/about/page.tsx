import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import PageBuilder from '@/components/blocks/PageBuilder'
import { getAbout, mediaUrl } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return {
    title: about?.seo?.metaTitle || 'About | GO MO Group',
    description: about?.seo?.metaDescription || 'Learn more about GO MO Group.',
  }
}

export default async function AboutPage() {
  const about = await getAbout()
  const dict = await getDictionary(await getLocale())
  const title = about?.title || dict.common.aboutFallbackTitle
  const hasLayout = about?.layout && about.layout.length > 0

  if (hasLayout) {
    return <PageBuilder blocks={about!.layout} />
  }

  return (
    <>
      <HeroBanner title={title} imageUrl={mediaUrl(about?.heroImage)} />
      <ContentSection>
        <RichText data={about?.content as SerializedEditorState | undefined} />
      </ContentSection>
      <CTASection title={dict.common.ctaWantToWorkWithUs} />
    </>
  )
}
