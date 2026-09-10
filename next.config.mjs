import { withPayload } from '@payloadcms/next/withPayload'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let mediaHost
let supabaseHost

if (serverUrl) {
  try {
    mediaHost = new URL(serverUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SERVER_URL must be a valid absolute URL when set.')
  }
}

if (supabaseUrl) {
  try {
    supabaseHost = new URL(supabaseUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid absolute URL when set.')
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Every CMS-driven page now renders in 2 locales, and each `[slug]`
    // detail page fires an extra query to resolve its alternate-locale
    // slug (see src/lib/i18n). Left at Next's defaults, static generation
    // fans out across several parallel workers, each running many pages
    // concurrently — which was enough concurrent Postgres connections/
    // queries to trip Supabase's statement_timeout and fail the build
    // ("canceling statement due to statement timeout"). Forcing a single
    // worker with concurrency 1 serializes all data fetching during build;
    // slower, but reliable. Revisit if the page count grows a lot.
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 1000,
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      ...(mediaHost
        ? [
            {
              protocol: mediaHost.protocol.replace(':', ''),
              hostname: mediaHost.hostname,
              port: mediaHost.port,
            },
          ]
        : []),
      ...(supabaseHost
        ? [
            {
              protocol: supabaseHost.protocol.replace(':', ''),
              hostname: supabaseHost.hostname,
              pathname: '/storage/v1/object/**',
            },
          ]
        : []),
    ],
  },
}

export default withPayload(nextConfig)
