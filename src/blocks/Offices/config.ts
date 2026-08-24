import type { Block } from 'payload'

export const OfficesBlock: Block = {
  slug: 'offices',
  labels: { singular: 'Offices Section', plural: 'Offices Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Offices' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea' },
    {
      name: 'offices',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Office', plural: 'Offices' },
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text' },
        { name: 'address', type: 'text', required: true },
      ],
    },
  ],
}

export default OfficesBlock
