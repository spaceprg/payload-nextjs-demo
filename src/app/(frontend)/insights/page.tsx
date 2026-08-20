import type { Metadata } from 'next'
import InsightsGrid from '@/components/InsightsGrid'
import { getInsights } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Insights | GO MO Group',
  description: 'Industry-specific insights on AI-infused B2B marketing.',
}

export default async function InsightsPage() {
  const insights = await getInsights()

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">Insights</h1>
          <p className="mt-3 text-white/70">Industry-specific insights on AI-infused B2B marketing.</p>
        </div>
        <InsightsGrid insights={insights} />
      </div>
    </div>
  )
}
