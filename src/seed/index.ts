/**
 * One-off dummy-content seed script.
 * Run with: npx tsx src/seed/index.ts
 * (requires DATABASE_URI / PAYLOAD_SECRET to already be set in .env)
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const services = [
    {
      title: 'Web Development',
      slug: 'web-development',
      shortDescription:
        'Modern websites and web applications built using latest technologies.',
    },
    {
      title: 'Digital Consulting',
      slug: 'digital-consulting',
      shortDescription:
        'Helping businesses improve their digital strategy and processes.',
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'Creating intuitive and engaging digital experiences.',
    },
  ]

  console.log('Seeding services... (add a heroImage to each via the admin UI)')
  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
    })
    if (existing.docs.length === 0) {
      console.log(`  creating "${service.title}" — remember to attach a heroImage`)
    } else {
      console.log(`  "${service.title}" already exists, skipping`)
    }
  }

  await payload.updateGlobal({
    slug: 'about',
    data: {
      title: 'About Demo Digital Agency',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Demo Digital Agency partners with businesses to design, build, and grow modern digital products.',
                },
              ],
            },
          ],
        },
      },
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      title: 'Contact Us',
      description: "We'd love to hear about your project.",
      email: 'hello@example.com',
      phone: '+46 000 000 000',
      address: 'Stockholm, Sweden',
    },
  })

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
