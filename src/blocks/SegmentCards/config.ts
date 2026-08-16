import type { Block } from 'payload'

export const SegmentCardsBlock: Block = {
  slug: 'segmentCards',
  labels: { singular: 'Segment Cards', plural: 'Segment Cards Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'What Sets Us Apart' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Read more' },
        { name: 'buttonHref', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}

export default SegmentCardsBlock
