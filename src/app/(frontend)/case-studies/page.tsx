import type { Metadata } from 'next'
import CaseStudiesGrid from '@/components/CaseStudiesGrid'
import { getCaseStudies } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Case Studies | GO MO Group',
  description: 'Real results from real B2B growth engagements.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">Case Studies</h1>
          <p className="mt-3 text-white/70">Real results from real B2B growth engagements.</p>
        </div>
        <CaseStudiesGrid caseStudies={caseStudies} />
      </div>
    </div>
  )
}
