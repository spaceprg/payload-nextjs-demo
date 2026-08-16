import Image from 'next/image'
import HomeButton from '@/components/home/HomeButton'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { TransformSplitBlockData } from '@/lib/payload'

export default function TransformSplitBlock({
  eyebrow,
  heading,
  highlight,
  paragraph,
  buttonLabel,
  buttonHref,
  galleryImages,
}: TransformSplitBlockData) {
  if (!heading) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div>
            {eyebrow && <Eyebrow label={eyebrow} />}
            <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
          </div>
          <div className="flex flex-col gap-6">
            {paragraph && <p className="text-base leading-6 text-white/80">{paragraph}</p>}
            {buttonLabel && buttonHref && (
              <div>
                <HomeButton label={buttonLabel} href={buttonHref} variant="solid" />
              </div>
            )}
          </div>
        </div>

        {galleryImages && galleryImages.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-5">
            {galleryImages.map((item, index) => (
              <div
                key={item.id ?? index}
                className={`relative overflow-hidden rounded-lg border border-white/10 ${
                  index === 0 || index === galleryImages.length - 1 ? 'aspect-[4/5]' : 'aspect-square'
                }`}
              >
                <Image src={mediaUrl(item.image)} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
