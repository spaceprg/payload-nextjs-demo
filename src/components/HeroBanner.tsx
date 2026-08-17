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
    <section className="relative flex h-[420px] w-full items-center overflow-hidden bg-ink pt-24">
      {imageUrl ? (
        <Image src={imageUrl} alt="" fill priority className="object-cover opacity-50" />
      ) : (
        <div
          className="absolute inset-0 opacity-60 blur-3xl"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 15%, rgba(189,39,246,0.5), transparent 45%), radial-gradient(circle at 20% 80%, rgba(3,12,244,0.45), transparent 45%)',
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div
        className={`relative z-10 mx-auto w-full max-w-content px-6 ${
          align === 'left' ? 'text-left' : 'text-center'
        }`}
      >
        <h1 className="text-4xl font-medium text-white md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-white/80">{children}</div>}
      </div>
    </section>
  )
}
