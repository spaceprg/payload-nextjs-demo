import Image from 'next/image'
import type { SerializedEditorState } from 'lexical'
import RichText from './RichText'
import CTAButtons from './CTAButtons'
import { mediaUrl } from '@/lib/payload'
import type { ColumnItem, ColumnsBlockData, ColumnsLayout } from '@/lib/payload'

const GRID_CLASS: Record<ColumnsLayout, string> = {
  '50-50': 'md:grid-cols-2',
  '33-33-33': 'md:grid-cols-3',
  '33-66': 'md:grid-cols-3',
  '66-33': 'md:grid-cols-3',
}

const COLUMN_SPAN: Record<ColumnsLayout, string[]> = {
  '50-50': ['', ''],
  '33-33-33': ['', '', ''],
  '33-66': ['', 'md:col-span-2'],
  '66-33': ['md:col-span-2', ''],
}

function Column({ column }: { column: ColumnItem }) {
  const { heading, richText, image, altOverride, buttons } = column

  if (!heading && !richText && !image && (!buttons || buttons.length === 0)) return null

  return (
    <div className="flex flex-col gap-4">
      {image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5">
          <Image src={mediaUrl(image)} alt={altOverride || image.alt || ''} fill className="object-cover" />
        </div>
      )}
      {heading && <h3 className="text-xl font-medium text-white">{heading}</h3>}
      <RichText data={richText as SerializedEditorState | undefined} />
      <CTAButtons buttons={buttons} />
    </div>
  )
}

export default function ColumnsBlock({ layout, columns }: ColumnsBlockData) {
  if (!columns || columns.length === 0) return null

  const spans = COLUMN_SPAN[layout] ?? []

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className={`grid grid-cols-1 gap-10 ${GRID_CLASS[layout] ?? 'md:grid-cols-2'}`}>
          {columns.map((column, index) => (
            <div key={column.id ?? index} className={spans[index] ?? ''}>
              <Column column={column} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
