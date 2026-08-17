import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import AIWorkflowAccordion from './AIWorkflowAccordion'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { AIWorkflowPanelBlockData } from '@/lib/payload'

const BULLET_COLORS = ['bg-mint', 'bg-purple', 'bg-lime', 'bg-cyan', 'bg-pink', 'bg-rose', 'bg-turquoise']

/** Deterministic pseudo-random pick so the color matches between server and client render. */
function bulletColorFor(text: string, index: number) {
  const hash = Array.from(text).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return BULLET_COLORS[(hash + index) % BULLET_COLORS.length]
}

export default function AIWorkflowPanelBlock({
  eyebrow,
  heading,
  highlight,
  paragraph,
  listLabel,
  improvements,
  tags,
  buttonLabel,
  buttonHref,
  backgroundImage,
}: AIWorkflowPanelBlockData) {
  if (!heading) return null

  const track = tags && tags.length > 0 ? [...tags, ...tags] : []

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 p-8 md:p-16">
          {backgroundImage && (
            <Image src={mediaUrl(backgroundImage)} alt="" fill className="object-cover" />
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(109deg, rgba(142, 56, 248, 0.25) 1%, rgba(0, 2, 42, 0.6) 62%)',
            }}
          />

          <div className="relative flex flex-col gap-10 md:flex-row md:justify-between">
            <div className="max-w-sm shrink-0">
              {eyebrow && <Eyebrow label={eyebrow} />}
              <HighlightedHeading
                heading={heading}
                highlight={highlight}
                color="mint"
                className="mt-4 text-5xl md:text-6xl"
              />
              {buttonLabel && buttonHref && (
                <div className="mt-8">
                  <HomeButton label={buttonLabel} href={buttonHref} variant="gradient" />
                </div>
              )}
            </div>

            <div className="w-full max-w-md">
              {paragraph && <p className="mb-8 text-base leading-6 text-white">{paragraph}</p>}
              {improvements && improvements.length > 0 && (
                <AIWorkflowAccordion listLabel={listLabel} improvements={improvements} />
              )}
            </div>
          </div>

          {track.length > 0 && (
            <div className="relative mt-14 overflow-hidden">
              <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
                {track.map((tag, index) => (
                  <span
                    key={`${tag.id ?? tag.label}-${index}`}
                    className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/15 px-6 py-4 font-serif text-sm italic text-white"
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${bulletColorFor(tag.label, index)}`} aria-hidden />
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
