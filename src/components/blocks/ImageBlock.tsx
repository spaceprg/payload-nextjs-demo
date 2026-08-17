import Image from 'next/image'
import { mediaUrl } from '@/lib/payload'
import type { ImageBlockData } from '@/lib/payload'

const SIZE_CLASS: Record<string, string> = {
  contained: 'mx-auto max-w-content px-6',
  wide: 'mx-auto max-w-6xl px-6',
  full: 'w-full',
}

const ALIGN_CLASS: Record<string, string> = {
  left: '',
  center: 'mx-auto',
  right: 'ml-auto',
}

export default function ImageBlock({ image, altOverride, caption, alignment, size }: ImageBlockData) {
  if (!image) return null

  const alt = altOverride || image.alt || ''

  return (
    <section className={`bg-ink py-16 ${SIZE_CLASS[size ?? 'contained']}`}>
      <figure
        className={
          size === 'full' ? 'w-full' : `w-full max-w-2xl ${ALIGN_CLASS[alignment ?? 'center']}`
        }
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5">
          <Image src={mediaUrl(image)} alt={alt} fill className="object-cover" />
        </div>
        {caption && <figcaption className="mt-3 text-center text-sm text-white/60">{caption}</figcaption>}
      </figure>
    </section>
  )
}
