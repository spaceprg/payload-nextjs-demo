import type { Block } from 'payload'

export const ServiceMarqueeBlock: Block = {
  slug: 'serviceMarquee',
  labels: { singular: 'Service Marquee', plural: 'Service Marquees' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'Our services' },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'highlight', type: 'text', localized: true, label: 'Highlighted phrase' },
    { name: 'subtext', type: 'textarea', localized: true },
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
