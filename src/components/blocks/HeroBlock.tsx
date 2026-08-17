import Image from 'next/image'
import CTAButtons from './CTAButtons'
import { mediaUrl } from '@/lib/payload'
import type { HeroBlockData } from '@/lib/payload'

export default function HeroBlock({ eyebrow, heading, text, image, alignment = 'left', buttons }: HeroBlockData) {
  if (!heading) return null

  const isCentered = alignment === 'center'
  const hasImage = Boolean(image)

  return (
    <section className="relative overflow-hidden bg-ink">
      {hasImage && (
        <>
          <Image
            src={mediaUrl(image ?? undefined)}
            alt={image?.alt || ''}
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-ink/70" />
        </>
      )}
      <div
        className={`relative mx-auto flex max-w-content flex-col gap-6 px-6 py-24 md:py-32 ${
          isCentered ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-mint">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-4xl font-medium text-white md:text-5xl">{heading}</h1>
        {text && <p className="max-w-2xl text-lg text-white/80">{text}</p>}
        <CTAButtons buttons={buttons} align={isCentered ? 'center' : 'left'} invert />
      </div>
    </section>
  )
}
