import type { GlobalConfig } from 'payload'
import { layoutBlocks } from '../blocks'

export const About: GlobalConfig = {
  slug: 'about',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', localized: true },
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
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
      ],
    },
  ],
}

export default About
