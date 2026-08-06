import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { Contact } from './globals/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Services],
  globals: [About, Contact],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp: undefined, // set in next.config via withPayload; sharp resolved automatically
})
