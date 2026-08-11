import {
  RichText as LexicalRichText,
  LinkJSXConverter,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'

function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }) {
  const { value, relationTo } = linkNode.fields.doc ?? {}
  const slug = typeof value === 'object' && value !== null ? (value as { slug?: string }).slug : undefined

  if (relationTo === 'services' && slug) return `/services/${slug}`
  return '#'
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

/** Renders a Payload/Lexical richText field value using the project's default rich text styling. */
export default function RichText({
  data,
  className = '',
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null

  return <LexicalRichText data={data} converters={converters} className={`richtext ${className}`.trim()} />
}
