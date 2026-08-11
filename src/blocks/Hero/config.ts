import type { Block } from 'payload'
import { linkFields } from '../../fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow / Subheading' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      admin: { description: 'Optional. Leave blank for a plain background.' },
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: linkFields,
    },
  ],
}

export default HeroBlock
