'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/media'
import type { VideoSpeaker } from '@/lib/payload'

function youtubeEmbedId(url?: string | null): string | null {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return match ? match[1] : null
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous videos' : 'Next videos'}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
    >
      <span className={`relative block h-2.5 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}>
        <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
      </span>
    </button>
  )
}

function SpeakerCard({
  speaker,
  size = 'small',
  onPlay,
}: {
  speaker: VideoSpeaker
  size?: 'large' | 'small'
  onPlay: () => void
}) {
  const hasVideo = Boolean(youtubeEmbedId(speaker.youtubeUrl))
  const isLarge = size === 'large'

  return (
    <button
      type="button"
      onClick={hasVideo ? onPlay : undefined}
      disabled={!hasVideo}
      draggable={false}
      className={`group relative w-full select-none overflow-hidden rounded-lg text-left ${
        isLarge ? 'aspect-[822/436]' : 'aspect-[405/260] shrink-0 snap-start sm:w-[calc((100%-48px)/3)]'
      } ${hasVideo ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {speaker.posterImage && (
        <Image
          src={mediaUrl(speaker.posterImage)}
          alt=""
          fill
          draggable={false}
          className="pointer-events-none object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />

      {hasVideo && isLarge && (
        <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-110">
          <Image src="/images/home/icons/play-1.svg" alt="" fill />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
        <div className="text-white">
          <p className={isLarge ? 'text-2xl' : 'text-xl'}>{speaker.name}</p>
          <p className="text-xs uppercase tracking-[0.96px] text-white/80">{speaker.role}</p>
        </div>
        {hasVideo && !isLarge && (
          <div className="relative size-11 shrink-0 transition group-hover:scale-110">
            <Image src="/images/home/icons/play-1.svg" alt="" fill />
          </div>
        )}
      </div>
    </button>
  )
}

function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white transition hover:bg-white/20"
      >
        ×
      </button>
      <div className="aspect-video w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="size-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video testimonial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default function VideoTestimonialsSlider({
  eyebrow,
  heading,
  highlight,
  mainSpeaker,
  speakers,
}: {
  eyebrow?: string | null
  heading: string
  highlight?: string | null
  mainSpeaker?: VideoSpeaker | null
  speakers: VideoSpeaker[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const wasDraggedRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.firstElementChild as HTMLElement | null)?.clientWidth ?? 320
    const gap = 24
    track.scrollBy({ left: direction === 'left' ? -3 * (cardWidth + gap) : 3 * (cardWidth + gap), behavior: 'smooth' })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    isDraggingRef.current = true
    wasDraggedRef.current = false
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const track = trackRef.current
    if (!track) return
    const delta = event.clientX - dragStartXRef.current
    if (Math.abs(delta) > 5) wasDraggedRef.current = true
    track.scrollLeft = dragStartScrollLeftRef.current - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    trackRef.current?.releasePointerCapture(event.pointerId)
  }

  const handleClickCapture = (event: React.MouseEvent) => {
    if (wasDraggedRef.current) {
      event.preventDefault()
      event.stopPropagation()
      wasDraggedRef.current = false
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-center">
          {mainSpeaker && (
            <div className="md:col-span-2">
              <SpeakerCard
                speaker={mainSpeaker}
                size="large"
                onPlay={() => setActiveVideoId(youtubeEmbedId(mainSpeaker.youtubeUrl))}
              />
            </div>
          )}

          <div className="flex flex-col gap-6 md:col-span-1">
            {eyebrow && <Eyebrow label={eyebrow} />}
            <HighlightedHeading heading={heading} highlight={highlight} color="pink" className="text-4xl md:text-[42px]" />
            {speakers.length > 0 && (
              <div className="flex gap-4">
                <ArrowButton direction="left" onClick={() => scroll('left')} />
                <ArrowButton direction="right" onClick={() => scroll('right')} />
              </div>
            )}
          </div>
        </div>
      </div>

      {speakers.length > 0 && (
        <div className="relative mx-auto mt-14 max-w-content">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent md:w-28" />
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={handleClickCapture}
            onDragStart={(event) => event.preventDefault()}
            className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={speaker.id ?? index}
                speaker={speaker}
                onPlay={() => setActiveVideoId(youtubeEmbedId(speaker.youtubeUrl))}
              />
            ))}
          </div>
        </div>
      )}

      {activeVideoId && <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />}
    </div>
  )
}
