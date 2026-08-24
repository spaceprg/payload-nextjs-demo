import Image from 'next/image'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import type { OfficesBlockData } from '@/lib/payload'

// Cycles through the same pin-icon/rotation combinations the footer uses, so
// office cards look consistent wherever they appear on the site.
const PIN_STYLES = [
  { pin: 'a', rotate: 'rotate-45' },
  { pin: 'b', rotate: 'rotate-90' },
  { pin: 'b', rotate: 'rotate-[135deg]' },
  { pin: 'b', rotate: '-rotate-[135deg]' },
]

export default function OfficesBlock({ eyebrow, heading, highlight, subtext, offices }: OfficesBlockData) {
  if (!heading || !offices || offices.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
          {subtext && <p className="mt-6 text-base leading-6 text-white/80">{subtext}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office, index) => {
            const style = PIN_STYLES[index % PIN_STYLES.length]
            return (
              <div
                key={office.id ?? index}
                className="flex flex-col justify-between gap-6 rounded-lg border border-purple-deep p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-turquoise">{office.city}</p>
                    {office.country && <p className="text-xs text-white/50">{office.country}</p>}
                  </div>
                  <span className="relative block size-8 shrink-0">
                    <Image src={`/images/home/icons/pin-circle-${style.pin}.svg`} alt="" fill />
                    <span
                      className={`absolute left-1/2 top-1/2 block h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white ${style.rotate}`}
                    />
                  </span>
                </div>
                <p className="text-sm text-white/70">{office.address}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
