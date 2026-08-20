import type { CaseStudy } from '@/lib/payload'
import CaseStudyCard from './CaseStudyCard'

export default function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) {
    return (
      <p className="py-12 text-center text-white/60">
        No case studies published yet. Add some in the Payload admin.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </div>
  )
}
