'use client'

import Image from 'next/image'
import { useRef } from 'react'
import HomeButton from '@/components/home/HomeButton'
import { mediaUrl } from '@/lib/media'
import type { CaseStudy } from '@/lib/payload'

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous case study' : 'Next case study'}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
    >
      <span className={`relative block h-2.5 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}>
        <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
      </span>
    </button>
  )
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="w-[92%] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[85%] lg:w-[900px]">
      <div className="relative flex flex-col overflow-hidden rounded-lg md:flex-row">
        <Image src={mediaUrl(caseStudy.backgroundImage)} alt="" fill className="object-cover blur-[2px]" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative flex shrink-0 flex-col justify-center gap-8 bg-white/10 px-6 py-8 md:w-[250px]">
          <div>
            <p className="font-serif text-5xl text-lime">{caseStudy.stat1Value}</p>
            <p className="mt-2 text-base text-white">{caseStudy.stat1Label}</p>
          </div>
          <div>
            <p className="font-serif text-5xl text-pink">{caseStudy.stat2Value}</p>
            <p className="mt-2 text-base text-white">{caseStudy.stat2Label}</p>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-between gap-8 bg-purple px-8 py-8">
          <p className="text-2xl leading-8 text-white">{caseStudy.title}</p>
          {caseStudy.buttonLabel && caseStudy.slug && (
            <div>
              <HomeButton
                label={caseStudy.buttonLabel}
                href={`/case-studies/${caseStudy.slug}`}
                variant="outline"
                className="self-start"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudySlider({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstElementChild?.clientWidth ?? 900
    track.scrollBy({ left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24, behavior: 'smooth' })
  }

  if (caseStudies.length === 0) return null

  return (
    <div className="mt-16">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>

      {caseStudies.length > 1 && (
        <div className="mt-8 flex gap-4 px-6">
          <ArrowButton direction="left" onClick={() => scroll('left')} />
          <ArrowButton direction="right" onClick={() => scroll('right')} />
        </div>
      )}
    </div>
  )
}
