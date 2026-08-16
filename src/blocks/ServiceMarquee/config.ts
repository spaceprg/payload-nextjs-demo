import type { Block } from 'payload'

export const ServiceMarqueeBlock: Block = {
  slug: 'serviceMarquee',
  labels: { singular: 'Service Marquee', plural: 'Service Marquees' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our services' },
    { name: 'heading', type: 'text', required: true },
    { name: 'highlight', type: 'text', label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea' },
    {
      name: 'limit',
      type: 'number',
      label: 'Max services to show',
      defaultValue: 12,
      admin: { description: 'Cards are pulled live from the Services collection.' },
    },
  ],
}

export default ServiceMarqueeBlock
