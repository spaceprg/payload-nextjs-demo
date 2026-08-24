import type { Block } from 'payload'

export const CaseStudySpotlightBlock: Block = {
  slug: 'caseStudySpotlight',
  labels: { singular: 'Case Study Spotlight', plural: 'Case Study Spotlights' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Case studies' },
    // Deprecated: the slide headline now comes from each Case Study's own title/highlight
    // fields. Kept (rather than dropped) so the dev schema push doesn't run a destructive
    // column migration.
    { name: 'heading', type: 'text', admin: { hidden: true } },
    { name: 'highlight', type: 'text', admin: { hidden: true } },
    {
      name: 'limit',
      type: 'number',
      label: 'Max case studies to show',
      defaultValue: 5,
      admin: { description: 'Cards are pulled live from the Case Studies collection, newest first.' },
    },
  ],
}

export default CaseStudySpotlightBlock
