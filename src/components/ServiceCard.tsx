import Image from 'next/image'
import Link from 'next/link'
import { mediaUrl, type Service } from '@/lib/payload'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <Image
          src={mediaUrl(service.heroImage, 'card')}
          alt={service.heroImage?.alt ?? service.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/70">{service.shortDescription}</p>
        <span className="mt-4 text-sm font-medium text-mint group-hover:underline">
          Read More →
        </span>
      </div>
    </Link>
  )
}
