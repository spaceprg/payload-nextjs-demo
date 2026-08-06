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
