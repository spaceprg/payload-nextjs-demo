import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { CaseStudies } from './collections/CaseStudies'
import { FormSubmissions } from './collections/FormSubmissions'
import { Insights } from './collections/Insights'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Home } from './globals/Home'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Services, FormSubmissions, CaseStudies, Insights],
  globals: [About, Contact, Home],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // Falls back to a live Ethereal test inbox (logged to the server console) when
  // SMTP_HOST isn't set, so contact-form emails work out of the box in dev.
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'no-reply@gomogroup.com',
    defaultFromName: 'GO MO Group',
    ...(process.env.SMTP_HOST
      ? {
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: process.env.SMTP_USER
              ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
              : undefined,
          },
        }
      : {}),
  }),
  plugins: [
    s3Storage({
      collections: {
        // Supabase's S3-compatible endpoint requires signed requests, so it isn't
        // browser-reachable. Point the public `url` field at Supabase's public
        // object URL instead (requires the bucket's public/private toggle to be "Public").
        media: {
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${encodeURIComponent(process.env.SUPABASE_S3_BUCKET || '')}/${prefix ? `${encodeURIComponent(prefix)}/` : ''}${encodeURIComponent(filename)}`,
        },
      },
      bucket: process.env.SUPABASE_S3_BUCKET || '',
      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT,
        region: process.env.SUPABASE_S3_REGION,
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
})
