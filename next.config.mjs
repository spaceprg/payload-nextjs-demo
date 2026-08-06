import { withPayload } from '@payloadcms/next/withPayload'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
let mediaHost

if (serverUrl) {
  try {
    mediaHost = new URL(serverUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SERVER_URL must be a valid absolute URL when set.')
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
    ],
  },
}

export default withPayload(nextConfig)
