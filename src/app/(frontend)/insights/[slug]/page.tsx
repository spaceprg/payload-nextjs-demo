import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ContentSection from '@/components/ContentSection'
import CTASection from '@/components/CTASection'
import RichText from '@/components/blocks/RichText'
import { getInsightBySlug, getInsights, mediaUrl } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateStaticParams() {
  const insights = await getInsights()
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const insight = await getInsightBySlug(slug)
  if (!insight) return {}

  return {
    title: insight.seo?.metaTitle || `${insight.title} | GO MO Group`,
    description: insight.seo?.metaDescription || insight.excerpt || undefined,
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params
  const insight = await getInsightBySlug(slug)

  if (!insight) notFound()

  return (
    <>
      <HeroBanner title={insight.title} imageUrl={mediaUrl(insight.heroImage, 'hero')} align="left">
        <p className="text-sm uppercase tracking-[1.12px] text-mint">{insight.category}</p>
        <p className="mt-2 text-white/70">
          {formatDate(insight.publishedDate)}
          {insight.readTime ? ` · ${insight.readTime}` : ''}
        </p>
      </HeroBanner>

      <ContentSection>
        {insight.excerpt && <p className="text-lg text-white/80">{insight.excerpt}</p>}
        <RichText data={insight.content as SerializedEditorState | undefined} className="mt-6" />
      </ContentSection>
      <CTASection title="Want insights like this in your inbox?" />
    </>
  )
}
