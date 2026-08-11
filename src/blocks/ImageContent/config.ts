import type { Block } from 'payload'
import { linkFields } from '../../fields/link'

export const ImageContentBlock: Block = {
  slug: 'imageContent',
  labels: { singular: 'Image + Content Section', plural: 'Image + Content Sections' },
  fields: [
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Image left', value: 'left' },
        { label: 'Image right', value: 'right' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'altOverride',
      type: 'text',
      label: 'Alt text override',
      admin: { description: "Leave blank to use the image's own alt text" },
    },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow / Subheading' },
    { name: 'heading', type: 'text' },
    { name: 'richText', type: 'richText', label: 'Content' },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: linkFields,
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
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}

export default ImageContentBlock
