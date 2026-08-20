import ServiceSlider from './ServiceSlider'
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
      <ServiceSlider eyebrow={eyebrow} heading={heading} highlight={highlight} subtext={subtext} services={services} />
    </section>
  )
}
