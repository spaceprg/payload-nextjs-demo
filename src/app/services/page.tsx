import type { Metadata } from 'next'
import ServicesGrid from '@/components/ServicesGrid'
import { getServices } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Services | Demo Company',
  description: 'Explore the services offered by Demo Company.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
        <p className="mt-3 text-gray-600">
          Everything we offer to help your business grow, in one place.
        </p>
      </div>
      <ServicesGrid services={services} />
    </div>
  )
}
