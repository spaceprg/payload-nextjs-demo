import CTAButtons from './CTAButtons'
import type { CTABlockData } from '@/lib/payload'

export default function CTABlock({ heading, text, alignment = 'center', buttons }: CTABlockData) {
  if (!heading && !text && (!buttons || buttons.length === 0)) return null

  const isCentered = alignment !== 'left'

  return (
    <section className="bg-brand">
      <div
        className={`mx-auto flex max-w-content flex-col gap-6 px-6 py-16 ${
          isCentered ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        {heading && <h2 className="text-3xl font-bold text-white">{heading}</h2>}
        {text && <p className="max-w-2xl text-white/90">{text}</p>}
        <CTAButtons buttons={buttons} align={isCentered ? 'center' : 'left'} invert />
      </div>
    </section>
  )
}
