import type { Block } from 'payload'

export const CaseStudySpotlightBlock: Block = {
  slug: 'caseStudySpotlight',
  labels: { singular: 'Case Study Spotlight', plural: 'Case Study Spotlights' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Case studies' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'cardText', type: 'textarea', label: 'Case study summary' },
    { name: 'stat1Value', type: 'text', admin: { description: 'e.g. 195%' } },
    { name: 'stat1Label', type: 'text' },
    { name: 'stat2Value', type: 'text', admin: { description: 'e.g. 400+' } },
    { name: 'stat2Label', type: 'text' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Read full case' },
    { name: 'buttonHref', type: 'text', defaultValue: '#' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

export default CaseStudySpotlightBlock
