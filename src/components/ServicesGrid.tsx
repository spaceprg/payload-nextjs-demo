import type { Service } from '@/lib/payload'
import ServiceCard from './ServiceCard'

export default function ServicesGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        No services published yet. Add some in the Payload admin.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
