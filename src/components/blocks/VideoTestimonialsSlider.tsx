'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
  large,
  onPlay,
}: {
  speaker: VideoSpeaker
  large?: boolean
  onPlay: () => void
}) {
  const hasVideo = Boolean(youtubeEmbedId(speaker.youtubeUrl))

  return (
    <button
      type="button"
      onClick={hasVideo ? onPlay : undefined}
      disabled={!hasVideo}
      className={`group relative w-full overflow-hidden rounded-lg text-left ${
        large ? 'aspect-[822/436]' : 'aspect-[405/260] shrink-0 snap-start sm:w-[calc((100%-48px)/3)]'
      } ${hasVideo ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {speaker.posterImage && (
        <Image src={mediaUrl(speaker.posterImage)} alt="" fill className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
      {hasVideo && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-110 ${large ? 'size-20' : 'size-12'}`}
        >
          <Image src="/images/home/icons/play-1.svg" alt="Play" fill />
        </div>
      )}
      <div className="absolute bottom-6 left-6 text-white">
        <p className={large ? 'text-2xl' : 'text-xl'}>{speaker.name}</p>
        <p className="text-xs uppercase tracking-[0.96px] text-white/80">{speaker.role}</p>
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
  mainSpeaker,
  speakers,
}: {
  mainSpeaker?: VideoSpeaker | null
  speakers: VideoSpeaker[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstElementChild?.clientWidth ?? 320
    const gap = 24
    track.scrollBy({ left: direction === 'left' ? -3 * (cardWidth + gap) : 3 * (cardWidth + gap), behavior: 'smooth' })
  }

  return (
    <div>
      {mainSpeaker && (
        <div className="mx-auto mb-6 max-w-[822px] px-6">
          <SpeakerCard speaker={mainSpeaker} large onPlay={() => setActiveVideoId(youtubeEmbedId(mainSpeaker.youtubeUrl))} />
        </div>
      )}

      {speakers.length > 0 && (
        <>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={speaker.id ?? index}
                speaker={speaker}
                onPlay={() => setActiveVideoId(youtubeEmbedId(speaker.youtubeUrl))}
              />
            ))}
          </div>

          {speakers.length > 3 && (
            <div className="mt-8 flex justify-center gap-4 px-6">
              <ArrowButton direction="left" onClick={() => scroll('left')} />
              <ArrowButton direction="right" onClick={() => scroll('right')} />
            </div>
          )}
        </>
      )}

      {activeVideoId && <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />}
    </div>
  )
}
