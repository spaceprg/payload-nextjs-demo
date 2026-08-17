import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { SegmentCardsBlockData } from '@/lib/payload'

export default function SegmentCardsBlock({
  eyebrow,
  heading,
  highlight,
  subtext,
  cards,
}: SegmentCardsBlockData) {
  if (!heading || !cards || cards.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
          {subtext && <p className="mt-6 text-base leading-6 text-white/80">{subtext}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={card.id ?? index}
              className="relative flex h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/30 p-6"
            >
              {card.image && (
                <Image
                  src={mediaUrl(card.image)}
                  alt=""
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="relative flex flex-1 flex-col justify-start gap-2 text-white">
                <h3 className="text-2xl font-semibold leading-tight">{card.title}</h3>
                <p className="text-base leading-6">{card.description}</p>
              </div>
              {card.buttonLabel && card.buttonHref && (
                <div className="relative mt-6 shrink-0">
                  <HomeButton label={card.buttonLabel} href={card.buttonHref} variant="solid" className="px-8 py-3.5 text-sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
