import type { Block } from 'payload'

export const SegmentCardsBlock: Block = {
  slug: 'segmentCards',
  labels: { singular: 'Segment Cards', plural: 'Segment Cards Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'What Sets Us Apart' },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea', localized: true },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Read more' },
        { name: 'buttonHref', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}

export default SegmentCardsBlock
