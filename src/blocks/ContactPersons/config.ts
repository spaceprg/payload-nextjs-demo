import type { Block } from 'payload'

export const ContactPersonsBlock: Block = {
  slug: 'contactPersons',
  labels: { singular: 'Contact Persons Section', plural: 'Contact Persons Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Get in touch' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    {
      name: 'persons',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Person', plural: 'People' },
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'reason', type: 'text', label: 'Contact for', admin: { description: 'e.g. "New business" or "Invoice questions"' } },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
      ],
    },
  ],
}

export default ContactPersonsBlock
