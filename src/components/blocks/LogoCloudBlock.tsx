import Image from 'next/image'
import { mediaUrl } from '@/lib/payload'
import type { LogoItem, LogoCloudBlockData } from '@/lib/payload'

function Logo({ logo }: { logo: LogoItem }) {
  const { image, altOverride, url } = logo
  if (!image) return null

  const content = (
    <div className="relative h-10 w-28 grayscale transition hover:grayscale-0">
      <Image src={mediaUrl(image)} alt={altOverride || image.alt || ''} fill className="object-contain" />
    </div>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

export default function LogoCloudBlock({ heading, logos }: LogoCloudBlockData) {
  if (!logos || logos.length === 0) return null

  return (
    <section className="mx-auto max-w-content px-6 py-16">
      {heading && <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-gray-500">{heading}</p>}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((logo, index) => (
          <Logo key={logo.id ?? index} logo={logo} />
        ))}
      </div>
    </section>
  )
}
