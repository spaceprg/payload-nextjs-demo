import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
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
