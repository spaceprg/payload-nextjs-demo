import CaseStudySlider from './CaseStudySlider'
import { getCaseStudies } from '@/lib/payload'
import type { CaseStudySpotlightBlockData } from '@/lib/payload'

export default async function CaseStudySpotlightBlock({ eyebrow, limit = 5 }: CaseStudySpotlightBlockData) {
  const caseStudies = (await getCaseStudies()).slice(0, limit ?? 5)
  if (caseStudies.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <CaseStudySlider eyebrow={eyebrow} caseStudies={caseStudies} />
    </section>
  )
}
