import type { Block } from 'payload'

export const ProofBarBlock: Block = {
  slug: 'proofBar',
  labels: { singular: 'Proof Bar', plural: 'Proof Bars' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'Proof, not promises' },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: { description: 'Optional. Leave blank to use the default decorative glow.' },
    },
    {
      name: 'logos',
      type: 'array',
      labels: { singular: 'Logo', plural: 'Logos' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
      label: 'Caption next to the logos',
      defaultValue: 'Join 120+ B2B teams already growing with GO MO Group',
    },
    {
      name: 'captionSubtext',
      type: 'text',
      localized: true,
      defaultValue: 'Trusted by industrial, SaaS & enterprise brands worldwide',
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 195% or 400+' } },
        { name: 'description', type: 'text', required: true, localized: true },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'yellow',
          options: [
            { label: 'Yellow', value: 'yellow' },
            { label: 'Rose', value: 'rose' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Purple', value: 'purple' },
          ],
        },
      ],
    },
  ],
}

export default ProofBarBlock
