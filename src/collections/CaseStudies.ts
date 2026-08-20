import { type CollectionConfig, slugField } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Headline / summary' },
    // Not required: this field was added after case studies already existed, so older
    // rows may not have a slug yet. Set one in the admin to enable the detail page link.
    slugField({ required: false }),
    { name: 'client', type: 'text', admin: { description: 'e.g. "Global B2B e-commerce giant" — shown for editorial context only.' } },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Used on the case studies listing page' } },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'stat1Value', type: 'text', required: true, admin: { description: 'e.g. 195%' } },
    { name: 'stat1Label', type: 'text', required: true },
    { name: 'stat2Value', type: 'text', required: true, admin: { description: 'e.g. 400+' } },
    { name: 'stat2Label', type: 'text', required: true },
    { name: 'content', type: 'richText' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Read full case' },
    // Deprecated in favor of the auto-generated `/case-studies/{slug}` link — kept (rather
    // than dropped) so the dev schema push doesn't have to run a destructive column migration.
    { name: 'buttonHref', type: 'text', admin: { hidden: true } },
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

export default CaseStudies
