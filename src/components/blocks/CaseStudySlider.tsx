'use client'

import Image from 'next/image'
import { useRef } from 'react'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/media'
import type { CaseStudy } from '@/lib/payload'

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous case study' : 'Next case study'}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
    >
      <span className={`relative block h-2.5 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}>
        <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
      </span>
    </button>
  )
}

// The background image, title, description and stats all belong to the case study itself,
// so this whole card changes per slide — only the section eyebrow and the nav arrows
// (rendered once in the slider below, overlaid on top) stay constant across slides.
function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="relative h-full w-full shrink-0 snap-start overflow-hidden">
      <Image src={mediaUrl(caseStudy.backgroundImage)} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/50" />

      <div className="absolute left-6 top-10 max-w-md pr-6 md:left-12 md:max-w-2xl">
        <HighlightedHeading
          heading={caseStudy.title}
          highlight={caseStudy.highlight}
          color="mint"
          className="line-clamp-3 text-2xl !leading-8 md:text-[48px] md:!leading-[56px]"
        />
      </div>

      <div className="absolute bottom-0 right-0 flex w-[90%] max-w-[480px]">
        <div className="flex shrink-0 flex-col justify-center gap-4 bg-white/10 px-6 py-6 sm:w-[190px]">
          <div>
            <p className="font-serif text-3xl text-lime">{caseStudy.stat1Value}</p>
            <p className="mt-1 text-sm text-white">{caseStudy.stat1Label}</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-pink">{caseStudy.stat2Value}</p>
            <p className="mt-1 text-sm text-white">{caseStudy.stat2Label}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 bg-purple px-6 py-6">
          {(caseStudy.excerpt || caseStudy.title) && (
            <p className="line-clamp-4 text-sm leading-6 text-white">{caseStudy.excerpt || caseStudy.title}</p>
          )}
          {caseStudy.buttonLabel && caseStudy.slug && (
            <HomeButton
              label={caseStudy.buttonLabel}
              href={`/case-studies/${caseStudy.slug}`}
              variant="outline"
              className="self-start"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudySlider({
  eyebrow,
  caseStudies,
}: {
  eyebrow?: string | null
  caseStudies: CaseStudy[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.firstElementChild as HTMLElement | null)?.clientWidth ?? track.clientWidth
    track.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  if (caseStudies.length === 0) return null

  return (
    <div className="relative h-[380px] sm:h-[440px] lg:h-[500px]">
      {eyebrow && (
        <div className="pointer-events-none absolute left-6 top-8 z-10 md:left-12 md:top-10">
          <Eyebrow label={eyebrow} />
        </div>
      )}

      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>

      {caseStudies.length > 1 && (
        <div className="pointer-events-none absolute inset-x-6 bottom-8 z-10 flex md:inset-x-12">
          <div className="pointer-events-auto flex gap-4">
            <ArrowButton direction="left" onClick={() => scroll('left')} />
            <ArrowButton direction="right" onClick={() => scroll('right')} />
          </div>
        </div>
      )}
    </div>
  )
}
