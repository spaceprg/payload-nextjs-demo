import { type CollectionConfig, slugField } from 'payload'

export const Insights: CollectionConfig = {
  slug: 'insights',
  labels: { singular: 'Insight', plural: 'Insights' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'category', type: 'text', required: true, admin: { description: 'e.g. "Generative AI, SEO"' } },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'readTime', type: 'text', defaultValue: '5 min read' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Used on insight listing cards' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
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

export default Insights
