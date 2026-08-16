import type { Block } from 'payload'

export const AIWorkflowPanelBlock: Block = {
  slug: 'aiWorkflowPanel',
  labels: { singular: 'AI Workflow Panel', plural: 'AI Workflow Panels' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Built to fit' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'paragraph', type: 'textarea' },
    { name: 'listLabel', type: 'text', defaultValue: 'What we help you improve' },
    {
      name: 'improvements',
      type: 'array',
      labels: { singular: 'Improvement', plural: 'Improvements' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Book a discovery call' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

export default AIWorkflowPanelBlock
