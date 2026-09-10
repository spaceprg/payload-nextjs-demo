import type { Metadata } from 'next'
import CaseStudiesGrid from '@/components/CaseStudiesGrid'
import { getCaseStudies } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(await getLocale())
  return {
    title: `${dict.common.caseStudiesTitle} | GO MO Group`,
    description: dict.common.caseStudiesSubtitle,
  }
}

export default async function CaseStudiesPage() {
  const locale = await getLocale()
  const [caseStudies, dict] = await Promise.all([getCaseStudies(), getDictionary(locale)])

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">{dict.common.caseStudiesTitle}</h1>
          <p className="mt-3 text-white/70">{dict.common.caseStudiesSubtitle}</p>
        </div>
        <CaseStudiesGrid caseStudies={caseStudies} />
      </div>
    </div>
  )
}
