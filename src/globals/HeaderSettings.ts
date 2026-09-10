import type { GlobalConfig } from 'payload'
import { linkFields } from '../fields/link'

export const HeaderSettings: GlobalConfig = {
  slug: 'header',
  label: 'Header Options',
  admin: {
    group: 'Theme Options',
    description: 'Site-wide header: logo, navigation menu, and the contact button.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Shown in the site header. Leave blank to use the default GO MO Group logo.' },
    },
    { name: 'logoAltText', type: 'text', localized: true, defaultValue: 'GO MO Group' },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Menu Items',
      labels: { singular: 'Menu Item', plural: 'Menu Items' },
      fields: linkFields,
      admin: { description: 'Main navigation links shown in the header, in order.' },
    },
    {
      name: 'contactButton',
      type: 'group',
      label: 'Header Contact Button',
      fields: linkFields,
    },
  ],
}

export default HeaderSettings
