import type { GlobalConfig } from 'payload'
import { linkFields } from '../fields/link'

const SOCIAL_PLATFORMS = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'Instagram', value: 'instagram' },
]

export const FooterSettings: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Options',
  admin: {
    group: 'Theme Options',
    description: 'Site-wide footer: logo, tagline, menu columns, social links, and legal links.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Shown in the footer. Leave blank to use the default GO MO Group logo mark.' },
    },
    { name: 'logoAltText', type: 'text', localized: true, defaultValue: 'GO MO Group' },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short brand line shown under the footer logo.' },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Footer CTA Button',
      fields: linkFields,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Menu Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          fields: linkFields,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      fields: [
        { name: 'platform', type: 'select', required: true, options: SOCIAL_PLATFORMS },
        { name: 'url', type: 'text', required: true, admin: { description: 'Same URL is used for every language.' } },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      labels: { singular: 'Legal Link', plural: 'Legal Links' },
      fields: linkFields,
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      defaultValue: 'Copyright © {year} GO MO Group',
      admin: { description: 'Use {year} as a placeholder — it is replaced with the current year automatically.' },
    },
  ],
}

export default FooterSettings
