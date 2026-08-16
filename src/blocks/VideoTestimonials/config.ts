import type { Block } from 'payload'

export const VideoTestimonialsBlock: Block = {
  slug: 'videoTestimonials',
  labels: { singular: 'Video Testimonials', plural: 'Video Testimonials Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Behind the work' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    {
      name: 'mainSpeaker',
      type: 'group',
      fields: [
        { name: 'posterImage', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Speaker', plural: 'Speakers' },
      fields: [
        { name: 'posterImage', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
  ],
}

export default VideoTestimonialsBlock
