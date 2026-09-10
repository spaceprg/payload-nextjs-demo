import type { GlobalConfig } from 'payload'
import { layoutBlocks } from '../blocks'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Builder',
      blocks: layoutBlocks,
      admin: {
        description:
          'Build the homepage below by adding, reordering, and configuring sections. When this has at least one section, it replaces the default homepage content.',
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

export default Home
