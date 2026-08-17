import Image from 'next/image'
import type { SerializedEditorState } from 'lexical'
import RichText from './RichText'
import CTAButtons from './CTAButtons'
import { mediaUrl } from '@/lib/payload'
import type { ImageContentBlockData } from '@/lib/payload'

const BACKGROUND_CLASS: Record<string, string> = {
  none: '',
  light: 'bg-white/5',
  brand: 'bg-gradient-to-br from-purple-deep/20 to-gomoblue/20',
  dark: 'bg-black/40',
}

export default function ImageContentBlock({
  imagePosition = 'left',
  image,
  altOverride,
  eyebrow,
  heading,
  richText,
  buttons,
  background = 'none',
}: ImageContentBlockData) {
  if (!image) return null

  const imageOnRight = imagePosition === 'right'

  return (
    <section className={`bg-ink ${BACKGROUND_CLASS[background ?? 'none']}`}>
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5 ${imageOnRight ? 'md:order-2' : ''}`}>
          <Image src={mediaUrl(image)} alt={altOverride || image.alt || ''} fill className="object-cover" />
        </div>
        <div className={imageOnRight ? 'md:order-1' : ''}>
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-mint">{eyebrow}</p>}
          {heading && <h2 className="mb-6 text-3xl font-medium text-white">{heading}</h2>}
          <RichText data={richText as SerializedEditorState | undefined} />
          <div className="mt-6">
            <CTAButtons buttons={buttons} invert />
          </div>
        </div>
      </div>
    </section>
  )
}
