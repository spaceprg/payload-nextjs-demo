import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'text' },
    {
      name: 'notificationEmail',
      type: 'email',
      label: 'Form submissions recipient',
      admin: {
        description: 'Contact form submissions from the website (contact page + footer form) are emailed to this address.',
      },
    },
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

export default Contact
