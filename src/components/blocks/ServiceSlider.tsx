'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
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

export default function ServiceSlider({ services }: { services: Service[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstElementChild?.clientWidth ?? 320
    track.scrollBy({ left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="group relative flex h-[300px] w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border-2 border-purple-deep bg-black p-6 shadow-[inset_3px_1px_31px_-6px_rgba(189,39,246,0.6)]"
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

      <div className="mt-8 flex justify-center gap-4 px-6">
        <ArrowButton direction="left" onClick={() => scroll('left')} />
        <ArrowButton direction="right" onClick={() => scroll('right')} />
      </div>
    </div>
  )
}
