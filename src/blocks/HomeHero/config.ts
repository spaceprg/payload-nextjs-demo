import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  labels: { singular: 'Home Hero', plural: 'Home Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'AI-Powered Growth' },
    { name: 'heading', type: 'text', required: true, localized: true },
    {
      name: 'highlight',
      type: 'text',
      localized: true,
      label: 'Highlighted phrase',
      admin: { description: 'Substring of the heading to render in the accent color/style' },
    },
    { name: 'subtext', type: 'textarea', localized: true },
    { name: 'buttonLabel', type: 'text', localized: true },
    { name: 'buttonHref', type: 'text' },
    { name: 'scrollLabel', type: 'text', localized: true, defaultValue: 'Scroll for more' },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background type',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video (MP4)', value: 'video' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description: 'Used as the background when type is Image, and as the poster frame while the video loads.',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Background video (MP4)',
      filterOptions: { mimeType: { contains: 'video' } },
      admin: {
        description: 'MP4 file, plays muted/looped/autoplay behind the hero content.',
        condition: (_, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
  ],
}

export default HomeHeroBlock
