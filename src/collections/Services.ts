import { type CollectionConfig, slugField } from 'payload'
import { layoutBlocks } from '../blocks'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Used on service listing cards' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
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

export default Services
