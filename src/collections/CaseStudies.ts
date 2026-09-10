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
    // Shown as the big slide headline on the homepage case study slider.
    { name: 'title', type: 'text', required: true, localized: true, label: 'Headline / summary' },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase in title', admin: { description: 'A substring of the title to italicize/color — e.g. "digital experiences".' } },
    // Not required: this field was added after case studies already existed, so older
    // rows may not have a slug yet. Set one in the admin to enable the detail page link.
    slugField({ localized: true, required: false }),
    { name: 'client', type: 'text', localized: true, admin: { description: 'e.g. "Global B2B e-commerce giant" — shown for editorial context only.' } },
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Used on the case studies listing page' } },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'stat1Value', type: 'text', required: true, localized: true, admin: { description: 'e.g. 195%' } },
    { name: 'stat1Label', type: 'text', required: true, localized: true },
    { name: 'stat2Value', type: 'text', required: true, localized: true, admin: { description: 'e.g. 400+' } },
    { name: 'stat2Label', type: 'text', required: true, localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Read full case' },
    // Deprecated in favor of the auto-generated `/case-studies/{slug}` link — kept (rather
    // than dropped) so the dev schema push doesn't have to run a destructive column migration.
    { name: 'buttonHref', type: 'text', admin: { hidden: true } },
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

export default CaseStudies
