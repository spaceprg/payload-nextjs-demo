import type { Block } from 'payload'

export const OfficesBlock: Block = {
  slug: 'offices',
  labels: { singular: 'Offices Section', plural: 'Offices Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'Our Offices' },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea', localized: true },
    {
      name: 'offices',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Office', plural: 'Offices' },
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text', localized: true },
        { name: 'address', type: 'text', required: true, localized: true },
      ],
    },
  ],
}

export default OfficesBlock
