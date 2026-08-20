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
    { name: 'buttonHref', type: 'text', defaultValue: '/insights' },
    {
      name: 'limit',
      type: 'number',
      label: 'Max insights to show',
      defaultValue: 3,
      admin: { description: 'Cards are pulled live from the Insights collection, newest first.' },
    },
    // Deprecated in favor of the Insights collection (cards are now pulled live) — kept
    // (rather than dropped) so the dev schema push doesn't have to run a destructive table migration.
    {
      name: 'cards',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'category', type: 'text' },
        { name: 'date', type: 'text' },
        { name: 'readTime', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}

export default InsightsGridBlock
