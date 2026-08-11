import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content Section', plural: 'Content Sections' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow / Subheading',
      admin: { description: 'Small label shown above the heading' },
    },
    { name: 'heading', type: 'text' },
    { name: 'richText', type: 'richText', label: 'Content' },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}

export default ContentBlock
