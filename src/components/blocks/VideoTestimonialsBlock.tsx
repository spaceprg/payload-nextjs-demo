import VideoTestimonialsSlider from './VideoTestimonialsSlider'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import type { VideoTestimonialsBlockData } from '@/lib/payload'

export default function VideoTestimonialsBlock({
  eyebrow,
  heading,
  highlight,
  mainSpeaker,
  testimonials,
}: VideoTestimonialsBlockData) {
  if (!heading) return null

  const speakers = [
    ...(mainSpeaker ? [{ ...mainSpeaker, large: true }] : []),
    ...(testimonials || []),
  ]
  if (speakers.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        {eyebrow && <Eyebrow label={eyebrow} />}
        <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 max-w-2xl text-4xl md:text-5xl" />
      </div>

      <div className="mt-10">
        <VideoTestimonialsSlider speakers={speakers} />
      </div>
    </section>
  )
}
