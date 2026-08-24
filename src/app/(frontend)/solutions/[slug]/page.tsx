import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import PageBuilder from '@/components/blocks/PageBuilder'
import { getSolutionBySlug, getSolutions, mediaUrl } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const solutions = await getSolutions()
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  if (!solution) return {}

  return {
    title: solution.seo?.metaTitle || `${solution.title} | GO MO Group`,
    description: solution.seo?.metaDescription || solution.shortDescription,
  }
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  if (!solution) notFound()

  const hasLayout = solution.layout && solution.layout.length > 0

  if (hasLayout) {
    return <PageBuilder blocks={solution.layout} />
  }

  return (
    <>
      <HeroBanner title={solution.title} imageUrl={mediaUrl(solution.heroImage, 'hero')} align="left" />
      <ContentSection>
        <p className="text-lg text-white/80">{solution.shortDescription}</p>
        <RichText data={solution.content as SerializedEditorState | undefined} className="mt-6" />
      </ContentSection>
      <CTASection title="Interested in this solution?" />
    </>
  )
}
