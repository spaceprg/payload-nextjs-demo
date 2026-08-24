import type { Solution } from '@/lib/payload'
import SolutionCard from './SolutionCard'

export default function SolutionsGrid({ solutions }: { solutions: Solution[] }) {
  if (solutions.length === 0) {
    return (
      <p className="py-12 text-center text-white/60">
        No solutions published yet. Add some in the Payload admin.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <SolutionCard key={solution.id} solution={solution} />
      ))}
    </div>
  )
}
