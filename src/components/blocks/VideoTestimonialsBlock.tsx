import Image from 'next/image'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { VideoSpeaker, VideoTestimonialsBlockData } from '@/lib/payload'

function SpeakerCard({ speaker, large = false }: { speaker: VideoSpeaker; large?: boolean }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg ${large ? 'h-[300px] md:h-[436px]' : 'h-[260px]'}`}
    >
      {speaker.posterImage && (
        <Image src={mediaUrl(speaker.posterImage)} alt="" fill className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-110 ${large ? 'size-20' : 'size-12'}`}
      >
        <Image src="/images/home/icons/play-1.svg" alt="Play" fill />
      </div>
      <div className="absolute bottom-6 left-6 text-white">
        <p className={large ? 'text-2xl' : 'text-xl'}>{speaker.name}</p>
        <p className="text-xs uppercase tracking-[0.96px] text-white/80">{speaker.role}</p>
      </div>
    </div>
  )
}

export default function VideoTestimonialsBlock({
  eyebrow,
  heading,
  highlight,
  mainSpeaker,
  testimonials,
}: VideoTestimonialsBlockData) {
  if (!heading) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        {eyebrow && <Eyebrow label={eyebrow} />}
        <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 max-w-2xl text-4xl md:text-5xl" />

        {mainSpeaker && (
          <div className="mt-10">
            <SpeakerCard speaker={mainSpeaker} large />
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((speaker, index) => (
              <SpeakerCard key={speaker.id ?? index} speaker={speaker} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
