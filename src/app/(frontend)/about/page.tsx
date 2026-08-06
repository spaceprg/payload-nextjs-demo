import type { Metadata } from 'next'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import { getAbout, mediaUrl } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  return {
    title: about?.seo?.metaTitle || 'About | Demo Company',
    description: about?.seo?.metaDescription || 'Learn more about Demo Company.',
  }
}

export default async function AboutPage() {
  const about = await getAbout()
  const title = about?.title || 'About Demo Digital Agency'

  return (
    <>
      <HeroBanner title={title} imageUrl={mediaUrl(about?.heroImage)} />
      <ContentSection>
        {/* Replace with a rich text renderer once About content is added in the admin */}
        <p>
          Demo Digital Agency partners with businesses to design, build, and grow modern
          digital products. Since our founding, we&apos;ve focused on clean engineering,
          thoughtful design, and long-term partnerships with the clients we serve.
        </p>
      </ContentSection>
      <CTASection title="Want to work with us?" />
    </>
  )
}
