import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { AIWorkflowPanelBlockData } from '@/lib/payload'

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
            <div className="max-w-lg">
              {eyebrow && <Eyebrow label={eyebrow} />}
              <HighlightedHeading
                heading={heading}
                highlight={highlight}
                color="mint"
                className="mt-4 text-5xl md:text-6xl"
              />
              {paragraph && <p className="mt-6 max-w-md text-base leading-6 text-white">{paragraph}</p>}
              {buttonLabel && buttonHref && (
                <div className="mt-8">
                  <HomeButton label={buttonLabel} href={buttonHref} variant="gradient" />
                </div>
              )}
            </div>

            {improvements && improvements.length > 0 && (
              <div className="w-full max-w-md">
                {listLabel && (
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[1.12px] text-lime">{listLabel}</p>
                )}
                <ul className="flex flex-col">
                  {improvements.map((item, index) => (
                    <li key={item.id ?? index} className="border-b border-white/40 py-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold text-white">{item.title}</span>
                        <span className="relative block h-3 w-[18px] shrink-0 opacity-70">
                          <Image src="/images/home/icons/chevron.svg" alt="" fill />
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-base leading-6 text-white">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className="relative mt-14 flex flex-wrap gap-4">
              {tags.map((tag, index) => (
                <span
                  key={tag.id ?? index}
                  className="rounded-full border border-white/15 px-6 py-4 font-serif text-sm italic text-white"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
