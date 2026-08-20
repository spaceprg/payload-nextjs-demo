import type { Insight } from '@/lib/payload'
import InsightCard from './InsightCard'

export default function InsightsGrid({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) {
    return (
      <p className="py-12 text-center text-white/60">
        No insights published yet. Add some in the Payload admin.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  )
}
