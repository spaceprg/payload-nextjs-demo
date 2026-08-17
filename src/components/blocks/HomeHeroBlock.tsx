import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import { HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { HomeHeroBlockData } from '@/lib/payload'

export default function HomeHeroBlock({
  eyebrow,
  heading,
  highlight,
  subtext,
  buttonLabel,
  buttonHref,
  scrollLabel,
  backgroundType = 'image',
  backgroundImage,
  backgroundVideo,
}: HomeHeroBlockData) {
  if (!heading) return null

  // A video file can end up in either field depending on which the editor picked, so
  // resolve the actual video source rather than trusting `backgroundType` alone.
  const videoSource =
    backgroundType === 'video' && backgroundVideo
      ? backgroundVideo
      : backgroundImage?.mimeType?.startsWith('video')
        ? backgroundImage
        : null
  const posterImage = backgroundImage?.mimeType?.startsWith('video') ? undefined : backgroundImage

  return (
    <section className="relative overflow-hidden bg-ink pt-40 pb-24 md:pt-48 md:pb-32">
      {videoSource ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage ? mediaUrl(posterImage) : undefined}
        >
          <source src={mediaUrl(videoSource)} type="video/mp4" />
        </video>
      ) : posterImage ? (
        <Image
          src={mediaUrl(posterImage)}
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
      ) : (
        <div
          className="absolute inset-0 opacity-60 blur-3xl"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 15%, rgba(189,39,246,0.55), transparent 45%), radial-gradient(circle at 30% 60%, rgba(3,12,244,0.5), transparent 45%), radial-gradient(circle at 90% 70%, rgba(255,40,188,0.4), transparent 40%)',
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

      <div className="relative mx-auto max-w-content px-6">
        {eyebrow && (
          <p className="mb-6 text-sm font-medium uppercase tracking-[1.12px] text-white">{eyebrow}</p>
        )}
        <HighlightedHeading
          as="h1"
          heading={heading}
          highlight={highlight}
          color="pink"
          className="max-w-4xl text-5xl md:text-6xl lg:text-[80px] lg:leading-[1.1]"
        />
        {(subtext || (buttonLabel && buttonHref)) && (
          <div className="mt-8 flex md:justify-end">
            <div className="md:w-[380px]">
              {subtext && <p className="text-base leading-6 text-white/90">{subtext}</p>}
              {buttonLabel && buttonHref && (
                <div className="mt-6">
                  <HomeButton label={buttonLabel} href={buttonHref} variant="gradient" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {scrollLabel && (
        <div className="relative mt-20 flex flex-col items-center gap-3 text-white/80">
          <span className="relative flex h-7 w-4 justify-center rounded-full border border-white/40 pt-1.5" aria-hidden>
            <span className="size-1.5 animate-scroll-dot rounded-full bg-white" />
          </span>
          <p className="text-xs font-medium uppercase tracking-[1px]">{scrollLabel}</p>
        </div>
      )}
    </section>
  )
}
