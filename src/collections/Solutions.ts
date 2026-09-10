import { type CollectionConfig, slugField } from 'payload'
import { layoutBlocks } from '../blocks'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: { singular: 'Solution', plural: 'Solutions' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField({ localized: true }),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Used on solution listing cards' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
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

export default Solutions
