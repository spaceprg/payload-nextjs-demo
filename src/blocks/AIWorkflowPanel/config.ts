import type { Block } from 'payload'

export const AIWorkflowPanelBlock: Block = {
  slug: 'aiWorkflowPanel',
  labels: { singular: 'AI Workflow Panel', plural: 'AI Workflow Panels' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'Built to fit' },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase' },
    { name: 'paragraph', type: 'textarea', localized: true },
    { name: 'listLabel', type: 'text', localized: true, defaultValue: 'What we help you improve' },
    {
      name: 'improvements',
      type: 'array',
      labels: { singular: 'Improvement', plural: 'Improvements' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Book a discovery call' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

export default AIWorkflowPanelBlock
