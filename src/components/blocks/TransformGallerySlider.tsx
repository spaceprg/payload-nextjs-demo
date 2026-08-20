'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { mediaUrl } from '@/lib/media'
import type { Media } from '@/lib/media'

// Bento-style tile sizes cycling per index, matching the Figma gallery's irregular row.
const TILE_SIZES = [
  'h-[169px] w-[340px]',
  'h-[307px] w-[250px]',
  'h-[260px] w-[210px]',
  'h-[217px] w-[250px]',
  'h-[169px] w-[340px]',
]

const AUTO_SCROLL_SPEED_PX_PER_SEC = 40

export default function TransformGallerySlider({ images }: { images: Media[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const canLoop = images.length > 1
  // Render the set twice so scrolling past the first copy lands seamlessly on an identical second copy.
  const loopedImages = canLoop ? [...images, ...images] : images

  useEffect(() => {
    if (!canLoop) return
    const track = trackRef.current
    if (!track) return

    let frameId: number
    let lastTime: number | null = null

    const step = (time: number) => {
      if (lastTime === null) lastTime = time
      const delta = time - lastTime
      lastTime = time

      if (!isPausedRef.current) {
        const halfWidth = track.scrollWidth / 2
        track.scrollLeft += (AUTO_SCROLL_SPEED_PX_PER_SEC * delta) / 1000
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth
        }
      }
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [canLoop])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    isDraggingRef.current = true
    isPausedRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const track = trackRef.current
    if (!track) return
    let next = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current)
    if (canLoop) {
      const halfWidth = track.scrollWidth / 2
      next = ((next % halfWidth) + halfWidth) % halfWidth
    }
    track.scrollLeft = next
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    isDraggingRef.current = false
    isPausedRef.current = false
    track?.releasePointerCapture(event.pointerId)
  }

  if (images.length === 0) return null

  return (
    <div className="mt-16 w-full">
      <div
        ref={trackRef}
        onMouseEnter={() => {
          isPausedRef.current = true
        }}
        onMouseLeave={() => {
          isPausedRef.current = false
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
        className="flex cursor-grab items-start gap-4 overflow-x-auto px-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopedImages.map((image, index) => (
          <div
            key={`${image.id ?? 'img'}-${index}`}
            className={`relative shrink-0 select-none overflow-hidden rounded-lg border border-white/10 ${TILE_SIZES[index % TILE_SIZES.length]}`}
          >
            <Image src={mediaUrl(image)} alt="" fill className="pointer-events-none object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
