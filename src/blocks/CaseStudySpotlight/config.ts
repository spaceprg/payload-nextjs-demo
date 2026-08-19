import type { Block } from 'payload'

export const CaseStudySpotlightBlock: Block = {
  slug: 'caseStudySpotlight',
  labels: { singular: 'Case Study Spotlight', plural: 'Case Study Spotlights' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Case studies' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    {
      name: 'limit',
      type: 'number',
      label: 'Max case studies to show',
      defaultValue: 6,
      admin: { description: 'Cards are pulled live from the Case Studies collection, newest first.' },
    },
  ],
}

export default CaseStudySpotlightBlock
