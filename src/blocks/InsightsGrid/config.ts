import type { Block } from 'payload'

export const InsightsGridBlock: Block = {
  slug: 'insightsGrid',
  labels: { singular: 'Insights Grid', plural: 'Insights Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Latest insights' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'View all insights' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'readTime', type: 'text', defaultValue: '5 min read' },
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text', defaultValue: '#' },
      ],
    },
  ],
}

export default InsightsGridBlock
