import type { Metadata } from 'next'
import SolutionsGrid from '@/components/SolutionsGrid'
import { getSolutions } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Solutions | GO MO Group',
  description: 'Explore the solutions offered by GO MO Group.',
}

export default async function SolutionsPage() {
  const solutions = await getSolutions()

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">Our Solutions</h1>
          <p className="mt-3 text-white/70">
            Tailored solutions to help your business grow, in one place.
          </p>
        </div>
        <SolutionsGrid solutions={solutions} />
      </div>
    </div>
  )
}
