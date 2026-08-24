import Image from 'next/image'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { mediaUrl } from '@/lib/payload'
import type { ContactPersonItem, ContactPersonsBlockData } from '@/lib/payload'

function PersonCard({ person }: { person: ContactPersonItem }) {
  const { photo, name, role, reason, email, phone } = person

  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
      {photo && (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white/10">
          <Image src={mediaUrl(photo)} alt={photo.alt || name} fill className="object-cover" />
        </div>
      )}
      <div className="min-w-0">
        {reason && <p className="text-xs font-medium uppercase tracking-[1.04px] text-mint">{reason}</p>}
        <p className="mt-1 font-medium text-white">{name}</p>
        <p className="text-sm text-white/60">{role}</p>
        <div className="mt-2 flex flex-col gap-0.5 text-sm">
          {email && (
            <a href={`mailto:${email}`} className="text-white/80 hover:text-mint">
              {email}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="text-white/80 hover:text-mint">
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactPersonsBlock({ eyebrow, heading, highlight, persons }: ContactPersonsBlockData) {
  if (!heading || !persons || persons.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {persons.map((person, index) => (
            <PersonCard key={person.id ?? index} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}
