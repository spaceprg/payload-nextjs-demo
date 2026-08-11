import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: { singular: 'Image Section', plural: 'Image Sections' },
  fields: [
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
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'contained',
      label: 'Width',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full width', value: 'full' },
      ],
    },
  ],
}

export default ImageBlock
