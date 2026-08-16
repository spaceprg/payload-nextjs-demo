import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { CaseStudySpotlightBlockData } from '@/lib/payload'

export default function CaseStudySpotlightBlock({
  eyebrow,
  heading,
  highlight,
  cardText,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  buttonLabel,
  buttonHref,
  backgroundImage,
}: CaseStudySpotlightBlockData) {
  if (!heading) return null

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {backgroundImage && (
        <Image src={mediaUrl(backgroundImage)} alt="" fill className="object-cover blur-[2px]" />
      )}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
        </div>

        <div className="mt-16 flex max-w-3xl flex-col overflow-hidden rounded-lg md:flex-row">
          {(stat1Value || stat2Value) && (
            <div className="flex shrink-0 flex-col justify-center gap-8 bg-white/10 px-6 py-8 md:w-[250px]">
              {stat1Value && (
                <div>
                  <p className="font-serif text-5xl text-lime">{stat1Value}</p>
                  <p className="mt-2 text-base text-white">{stat1Label}</p>
                </div>
              )}
              {stat2Value && (
                <div>
                  <p className="font-serif text-5xl text-pink">{stat2Value}</p>
                  <p className="mt-2 text-base text-white">{stat2Label}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-1 flex-col justify-between gap-8 bg-purple px-8 py-8">
            {cardText && <p className="text-2xl leading-8 text-white">{cardText}</p>}
            {buttonLabel && buttonHref && (
              <div>
                <HomeButton label={buttonLabel} href={buttonHref} variant="outline" className="self-start" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
