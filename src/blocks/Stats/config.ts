import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats Section', plural: 'Stats Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 250+ or 99%' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Background style',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light gray', value: 'light' },
        { label: 'Brand', value: 'brand' },
      ],
    },
  ],
}

export default StatsBlock
