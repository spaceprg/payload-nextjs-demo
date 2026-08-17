import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import PageBuilder from '@/components/blocks/PageBuilder'
import { getAbout, mediaUrl } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return {
    title: about?.seo?.metaTitle || 'About | GO MO Group',
    description: about?.seo?.metaDescription || 'Learn more about GO MO Group.',
  }
}

export default async function AboutPage() {
  const about = await getAbout()
  const title = about?.title || 'About GO MO Group'
  const hasLayout = about?.layout && about.layout.length > 0

  return (
    <>
      <HeroBanner title={title} imageUrl={mediaUrl(about?.heroImage)} />
      {hasLayout ? (
        <PageBuilder blocks={about.layout} />
      ) : (
        <>
          <ContentSection>
            <RichText data={about?.content as SerializedEditorState | undefined} />
          </ContentSection>
          <CTASection title="Want to work with us?" />
        </>
      )}
    </>
  )
}
