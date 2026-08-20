import VideoTestimonialsSlider from './VideoTestimonialsSlider'
import type { VideoTestimonialsBlockData } from '@/lib/payload'

export default function VideoTestimonialsBlock({
  eyebrow,
  heading,
  highlight,
  mainSpeaker,
  testimonials,
}: VideoTestimonialsBlockData) {
  if (!heading) return null
  if (!mainSpeaker && (!testimonials || testimonials.length === 0)) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <VideoTestimonialsSlider
        eyebrow={eyebrow}
        heading={heading}
        highlight={highlight}
        mainSpeaker={mainSpeaker}
        speakers={testimonials || []}
      />
    </section>
  )
}
