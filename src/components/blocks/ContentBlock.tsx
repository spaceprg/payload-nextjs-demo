import type { SerializedEditorState } from 'lexical'
import RichText from './RichText'
import type { ContentBlockData } from '@/lib/payload'

const ALIGN_CLASS: Record<string, string> = {
  left: '',
  center: 'mx-auto text-center',
  right: 'ml-auto text-right',
}

export default function ContentBlock({ eyebrow, heading, richText, alignment }: ContentBlockData) {
  if (!eyebrow && !heading && !richText) return null

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className={`max-w-3xl ${ALIGN_CLASS[alignment ?? 'left']}`}>
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-mint">{eyebrow}</p>}
          {heading && <h2 className="mb-6 text-3xl font-medium text-white">{heading}</h2>}
          <RichText data={richText as SerializedEditorState | undefined} />
        </div>
      </div>
    </section>
  )
}
