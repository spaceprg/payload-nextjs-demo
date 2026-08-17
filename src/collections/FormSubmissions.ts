import type { CollectionConfig } from 'payload'
import { sendFormSubmissionEmail } from './hooks/sendFormSubmissionEmail'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form Submission', plural: 'Form Submissions' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'formSource', 'emailStatus', 'createdAt'],
    description: 'Contact form submissions from the website. Each one emails the address set on the Contact global.',
  },
  access: {
    // The public contact forms submit without being logged in.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'business', type: 'text' },
    { name: 'service', type: 'text', label: 'Service interest' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'formSource',
      type: 'select',
      label: 'Submitted from',
      defaultValue: 'contact-page',
      options: [
        { label: 'Contact page', value: 'contact-page' },
        { label: 'Footer form', value: 'footer-form' },
      ],
    },
    {
      name: 'emailStatus',
      type: 'select',
      defaultValue: 'pending',
      admin: { readOnly: true, position: 'sidebar' },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
  hooks: {
    afterChange: [sendFormSubmissionEmail],
  },
}

export default FormSubmissions
