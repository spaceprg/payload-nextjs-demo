import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, label: 'Eyebrow / Subheading' },
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Question', plural: 'Questions' },
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
}

export default FAQBlock
