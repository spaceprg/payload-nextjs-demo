import type { Block } from 'payload'
import { linkFields } from '../../fields/link'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA / Button Section', plural: 'CTA / Button Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'text', type: 'textarea' },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [
        ...linkFields,
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

export default CTABlock
