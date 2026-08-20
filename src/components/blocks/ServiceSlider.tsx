'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/media'
import type { Service } from '@/lib/payload'

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous services' : 'Next services'}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
    >
      <span className={`relative block h-2.5 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}>
        <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
      </span>
    </button>
  )
}

export default function ServiceSlider({
  eyebrow,
  heading,
  highlight,
  subtext,
  services,
}: {
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  subtext?: string | null
  services: Service[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState({ widthPct: 100, leftPct: 0 })

  const updateProgress = () => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    const widthPct = Math.min(100, (clientWidth / scrollWidth) * 100)
    const maxScroll = scrollWidth - clientWidth
    const leftPct = maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - widthPct) : 0
    setProgress({ widthPct, leftPct })
  }

  useEffect(() => {
    updateProgress()
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      track.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length])

  const seekTo = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    const rect = event.currentTarget.getBoundingClientRect()
    const fraction = (event.clientX - rect.left) / rect.width
    track.scrollTo({ left: fraction * (track.scrollWidth - track.clientWidth), behavior: 'smooth' })
  }

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.firstElementChild as HTMLElement | null)?.clientWidth ?? 320
    const gap = 24
    track.scrollBy({ left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-start">
          <div>{eyebrow && <Eyebrow label={eyebrow} />}</div>
          <div className="flex flex-col gap-6 md:col-span-3">
            <HighlightedHeading heading={heading} highlight={highlight} color="yellow" className="text-4xl md:text-5xl" />
            {subtext && <p className="text-base leading-6 text-white/80">{subtext}</p>}
            {services.length > 1 && (
              <div className="flex gap-4">
                <ArrowButton direction="left" onClick={() => scroll('left')} />
                <ArrowButton direction="right" onClick={() => scroll('right')} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex aspect-[420/443] w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border-2 border-purple-deep bg-black p-6 shadow-[inset_3px_1px_31px_-6px_rgba(189,39,246,0.6)] sm:w-[46%] lg:w-[calc((100%-72px)/3.5)]"
            >
              {service.heroImage && (
                <Image src={mediaUrl(service.heroImage)} alt="" fill className="object-cover opacity-70" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative flex flex-col gap-3">
                <h3 className="font-serif text-xl font-bold italic text-white">{service.title}</h3>

                <p className="max-h-0 overflow-hidden text-sm leading-6 text-white/90 opacity-0 transition-all duration-300 ease-out group-hover:max-h-32 group-hover:opacity-100">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex w-fit items-center gap-2.5 rounded-lg bg-gomoblue px-4 py-3 font-serif text-sm italic text-white transition hover:bg-gomoblue/90"
                >
                  Learn more
                  <span className="relative block h-2.5 w-4">
                    <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center px-6">
          <div onClick={seekTo} className="relative h-1 w-full max-w-xs cursor-pointer rounded-full bg-white/15">
            <div
              className="absolute inset-y-0 rounded-full bg-gomoblue"
              style={{ width: `${progress.widthPct}%`, left: `${progress.leftPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
