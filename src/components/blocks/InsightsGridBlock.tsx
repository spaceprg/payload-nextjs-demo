import Image from 'next/image'
import Link from 'next/link'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { getInsights, mediaUrl } from '@/lib/payload'
import type { InsightsGridBlockData } from '@/lib/payload'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function InsightsGridBlock({
  eyebrow,
  heading,
  highlight,
  subtext,
  buttonLabel,
  buttonHref,
  limit = 3,
}: InsightsGridBlockData) {
  if (!heading) return null

  const insights = (await getInsights()).slice(0, limit ?? 3)
  if (insights.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="cyan" className="mt-4 text-4xl md:text-5xl" />
          {subtext && <p className="mt-6 text-base leading-6 text-white/80">{subtext}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <Link
              key={insight.id}
              href={`/insights/${insight.slug}`}
              className="group relative flex h-[397px] flex-col justify-end overflow-hidden rounded-lg"
            >
              {insight.heroImage && (
                <Image
                  src={mediaUrl(insight.heroImage)}
                  alt=""
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

              <div className="relative flex flex-col gap-6 rounded-b-lg bg-white/10 p-6">
                <p className="text-sm uppercase tracking-[1.12px] text-lime">{insight.category}</p>
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex justify-between text-sm">
                    <span>{formatDate(insight.publishedDate)}</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <p className="text-2xl leading-8">{insight.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {buttonLabel && buttonHref && (
          <div className="mt-12 flex justify-center">
            <HomeButton label={buttonLabel} href={buttonHref} variant="solid" />
          </div>
        )}
      </div>
    </section>
  )
}
