import Image from 'next/image'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { ProofBarBlockData } from '@/lib/payload'

const STAT_COLOR: Record<string, string> = {
  yellow: 'text-lime',
  rose: 'text-rose',
  cyan: 'text-cyan',
  purple: 'text-purple-deep',
}

export default function ProofBarBlock({
  eyebrow,
  heading,
  highlight,
  backgroundImage,
  logos,
  caption,
  captionSubtext,
  stats,
}: ProofBarBlockData) {
  if (!heading) return null

  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-20">
      {backgroundImage ? (
        <Image src={mediaUrl(backgroundImage)} alt="" fill className="object-cover opacity-40" />
      ) : (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-60 blur-3xl"
          style={{
            backgroundImage: 'linear-gradient(226deg, rgba(255,40,188,0.55) 22%, rgba(0,0,0,0) 73%)',
          }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
      <div className="relative mx-auto max-w-content px-6">
        {eyebrow && <Eyebrow label={eyebrow} />}
        <HighlightedHeading
          heading={heading}
          highlight={highlight}
          color="mint"
          className="mt-4 max-w-2xl text-4xl md:text-5xl"
        />

        {logos && logos.length > 0 && (
          <>
            <div className="mt-16 border-t border-white/15" />
            <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row">
              <div className="flex flex-wrap items-center gap-8 opacity-80">
                {logos.map((logo, index) => (
                  <div key={logo.id ?? index} className="relative h-6 w-24">
                    <Image
                      src={mediaUrl(logo.image)}
                      alt={logo.image?.alt || ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              {caption && (
                <p className="max-w-sm text-right text-sm leading-6 text-white md:text-left">
                  <span className="font-bold">{caption}</span>
                  {captionSubtext && <span className="block text-white/70">{captionSubtext}</span>}
                </p>
              )}
            </div>
            <div className="border-t border-white/15" />
          </>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-y-10 pt-12 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.id ?? index} className="flex flex-col gap-1 pr-6">
                <span className={`font-serif text-5xl font-bold italic ${STAT_COLOR[stat.color ?? 'yellow']}`}>
                  {stat.value}
                </span>
                <p className="text-sm leading-6 text-white/80">{stat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
