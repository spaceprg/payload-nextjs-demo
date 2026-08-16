import Image from 'next/image'
import type { ReactNode } from 'react'

type HeroBannerProps = {
  title: string
  imageUrl?: string
  children?: ReactNode
  align?: 'center' | 'left'
}

export default function HeroBanner({ title, imageUrl, children, align = 'center' }: HeroBannerProps) {
  return (
    <section className="relative flex h-[420px] w-full items-center overflow-hidden bg-brand-dark pt-24">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          className="object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div
        className={`relative z-10 mx-auto w-full max-w-content px-6 ${
          align === 'left' ? 'text-left' : 'text-center'
        }`}
      >
        <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-gray-100">{children}</div>}
      </div>
    </section>
  )
}
