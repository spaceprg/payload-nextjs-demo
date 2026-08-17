import Image from 'next/image'
import { mediaUrl } from '@/lib/payload'
import type { TestimonialItem, TestimonialsBlockData } from '@/lib/payload'

function Testimonial({ testimonial }: { testimonial: TestimonialItem }) {
  const { quote, authorName, authorRole, authorImage } = testimonial

  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-xl border border-white/10 bg-white/5 p-8">
      <blockquote className="text-white/80">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3">
        {authorImage && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
            <Image src={mediaUrl(authorImage)} alt={authorImage.alt || authorName} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{authorName}</p>
          {authorRole && <p className="text-sm text-white/60">{authorRole}</p>}
        </div>
      </figcaption>
    </figure>
  )
}

export default function TestimonialsBlock({ eyebrow, heading, testimonials }: TestimonialsBlockData) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        {(eyebrow || heading) && (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-mint">{eyebrow}</p>}
            {heading && <h2 className="text-3xl font-medium text-white">{heading}</h2>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={testimonial.id ?? index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
