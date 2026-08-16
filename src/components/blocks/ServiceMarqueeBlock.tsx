import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { getServices, mediaUrl } from '@/lib/payload'
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

  const track = [...services, ...services]

  return (
    <section className="overflow-hidden bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="yellow" className="mt-4 text-4xl md:text-5xl" />
          {subtext && <p className="mt-6 text-base leading-6 text-white/80">{subtext}</p>}
        </div>
      </div>

      <div className="mt-14 flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {track.map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            className="relative flex h-[300px] w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border-2 border-purple-deep bg-black p-6 shadow-[inset_3px_1px_31px_-6px_rgba(189,39,246,0.6)]"
          >
            {service.heroImage && (
              <Image
                src={mediaUrl(service.heroImage)}
                alt=""
                fill
                className="object-cover opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <h3 className="relative font-serif text-xl font-bold italic text-white">{service.title}</h3>
            <Link
              href={`/services/${service.slug}`}
              className="relative inline-flex w-fit items-center gap-2.5 rounded-lg bg-gomoblue px-4 py-3 font-serif text-sm italic text-white transition hover:bg-gomoblue/90"
            >
              Learn more
              <span className="relative block h-2.5 w-4">
                <Image src="/images/home/icons/arrow-right.svg" alt="" fill />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
