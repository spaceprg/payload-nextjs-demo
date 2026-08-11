import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials Section', plural: 'Testimonials Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow / Subheading' },
    { name: 'heading', type: 'text' },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Testimonial', plural: 'Testimonials' },
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'authorName', type: 'text', required: true },
        { name: 'authorRole', type: 'text', label: 'Role / Company' },
        { name: 'authorImage', type: 'upload', relationTo: 'media', label: 'Author photo' },
      ],
    },
  ],
}

export default TestimonialsBlock
