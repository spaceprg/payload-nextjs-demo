import type { Block } from 'payload'

export const TransformSplitBlock: Block = {
  slug: 'transformSplit',
  labels: { singular: 'Transform Split', plural: 'Transform Splits' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Beyond Boundaries' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'paragraph', type: 'textarea' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Read more' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
    {
      name: 'galleryImages',
      type: 'array',
      labels: { singular: 'Image', plural: 'Images' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}

export default TransformSplitBlock
