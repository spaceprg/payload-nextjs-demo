import ServiceSlider from './ServiceSlider'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { getServices } from '@/lib/payload'
import type { ServiceMarqueeBlockData } from '@/lib/payload'

export default async function ServiceMarqueeBlock({
  eyebrow,
  heading,
  highlight,
  subtext,
  limit = 12,
}: ServiceMarqueeBlockData) {
  if (!heading) return null

  const services = (await getServices()).slice(0, limit ?? 12)
  if (services.length === 0) return null

  return (
    <section className="overflow-hidden bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="yellow" className="mt-4 text-4xl md:text-5xl" />
          {subtext && <p className="mt-6 text-base leading-6 text-white/80">{subtext}</p>}
        </div>
      </div>

      <div className="mt-14">
        <ServiceSlider services={services} />
      </div>
    </section>
  )
}
