import CaseStudySlider from './CaseStudySlider'
import { Eyebrow, HighlightedHeading } from '@/components/home/SectionHeading'
import { getCaseStudies } from '@/lib/payload'
import type { CaseStudySpotlightBlockData } from '@/lib/payload'

export default async function CaseStudySpotlightBlock({
  eyebrow,
  heading,
  highlight,
  limit = 6,
}: CaseStudySpotlightBlockData) {
  if (!heading) return null

  const caseStudies = (await getCaseStudies()).slice(0, limit ?? 6)
  if (caseStudies.length === 0) return null

  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow label={eyebrow} />}
          <HighlightedHeading heading={heading} highlight={highlight} color="mint" className="mt-4 text-4xl md:text-5xl" />
        </div>
      </div>

      <CaseStudySlider caseStudies={caseStudies} />
    </section>
  )
}
