import type { Block } from 'payload'

export const LogoCloudBlock: Block = {
  slug: 'logoCloud',
  labels: { singular: 'Logo Cloud Section', plural: 'Logo Cloud Sections' },
  fields: [
    { name: 'heading', type: 'text', admin: { description: 'e.g. "Trusted by teams at"' } },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Logo', plural: 'Logos' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'altOverride',
          type: 'text',
          label: 'Alt text override',
          admin: { description: "Leave blank to use the image's own alt text" },
        },
        { name: 'url', type: 'text', label: 'Link (optional)' },
      ],
    },
  ],
}

export default LogoCloudBlock
