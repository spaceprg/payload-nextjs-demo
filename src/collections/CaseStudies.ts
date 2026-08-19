import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Headline / summary' },
    { name: 'client', type: 'text', admin: { description: 'e.g. "Global B2B e-commerce giant" — shown for editorial context only.' } },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'stat1Value', type: 'text', required: true, admin: { description: 'e.g. 195%' } },
    { name: 'stat1Label', type: 'text', required: true },
    { name: 'stat2Value', type: 'text', required: true, admin: { description: 'e.g. 400+' } },
    { name: 'stat2Label', type: 'text', required: true },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Read full case' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
  ],
}

export default CaseStudies
