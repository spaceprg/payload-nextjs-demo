import type { Block, Field } from 'payload'
import { linkFields } from '../../fields/link'

const REQUIRED_COLUMNS: Record<string, number> = {
  '50-50': 2,
  '33-33-33': 3,
  '33-66': 2,
  '66-33': 2,
}

const columnFields: Field[] = [
  { name: 'heading', type: 'text' },
  { name: 'richText', type: 'richText', label: 'Content' },
  { name: 'image', type: 'upload', relationTo: 'media' },
  {
    name: 'altOverride',
    type: 'text',
    label: 'Alt text override',
    admin: { condition: (_, siblingData) => Boolean(siblingData?.image) },
  },
  {
    name: 'buttons',
    type: 'array',
    maxRows: 3,
    labels: { singular: 'Button', plural: 'Buttons' },
    fields: linkFields,
  },
]

export const ColumnsBlock: Block = {
  slug: 'columns',
  labels: { singular: 'Columns Section', plural: 'Columns Sections' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: '50-50',
      options: [
        { label: '50 / 50', value: '50-50' },
        { label: '33 / 33 / 33', value: '33-33-33' },
        { label: '33 / 66', value: '33-66' },
        { label: '66 / 33', value: '66-33' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 3,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: columnFields,
      validate: (value, { siblingData }) => {
        const layout = (siblingData as { layout?: string })?.layout || '50-50'
        const expected = REQUIRED_COLUMNS[layout] ?? 2
        const count = Array.isArray(value) ? value.length : 0
        if (count !== expected) {
          return `The "${layout}" layout needs exactly ${expected} columns (currently ${count}).`
        }
        return true
      },
    },
  ],
}

export default ColumnsBlock
