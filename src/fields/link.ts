import type { Field } from 'payload'

/**
 * Reusable "link" fields: an internal reference (to a known collection) or a
 * custom URL, plus a label and new-tab toggle. Spread into any `array` or
 * `group` field that needs one or more buttons/links (CTA, Columns, ImageContent…).
 *
 * `relationTo` is an array so more linkable collections (e.g. a future
 * `pages` collection) can be added later without changing every block that uses this.
 */
export const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'custom',
    options: [
      { label: 'Internal link', value: 'reference' },
      { label: 'Custom URL', value: 'custom' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    name: 'reference',
    type: 'relationship',
    relationTo: ['services'],
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'reference',
      description: 'Page to link to',
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type !== 'reference',
      description: 'e.g. /contact or https://example.com',
    },
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Open in new tab',
    defaultValue: false,
  },
]

export default linkFields
