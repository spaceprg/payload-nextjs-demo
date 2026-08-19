'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { mediaUrl } from '@/lib/media'
import type { Media } from '@/lib/media'

// Bento-style tile sizes cycling per index, matching the Figma gallery's irregular row.
const TILE_SIZES = [
  'h-[169px] w-[300px]',
  'h-[307px] w-[217px]',
  'h-[260px] w-[183px]',
  'h-[217px] w-[217px]',
  'h-[169px] w-[300px]',
]

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous images' : 'Next images'}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
    >
      <span className={`relative block h-2.5 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}>
        <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
      </span>
    </button>
  )
}

export default function TransformGallerySlider({ images }: { images: Media[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  if (images.length === 0) return null

  return (
    <div className="mt-16">
      <div
        ref={trackRef}
        className="flex items-start gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image.id ?? index}
            className={`relative shrink-0 overflow-hidden rounded-lg border border-white/10 ${TILE_SIZES[index % TILE_SIZES.length]}`}
          >
            <Image src={mediaUrl(image)} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <ArrowButton direction="left" onClick={() => scroll('left')} />
        <ArrowButton direction="right" onClick={() => scroll('right')} />
      </div>
    </div>
  )
}
