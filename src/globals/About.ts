import type { GlobalConfig } from 'payload'
import { layoutBlocks } from '../blocks'

export const About: GlobalConfig = {
  slug: 'about',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Builder',
      blocks: layoutBlocks,
      admin: {
        description:
          'Build the page below by adding, reordering, and configuring sections. When this has at least one section, it replaces the content above.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}

export default About
