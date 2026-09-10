import type { Metadata } from 'next'
import SolutionsGrid from '@/components/SolutionsGrid'
import { getSolutions } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(await getLocale())
  return {
    title: `${dict.common.ourSolutionsTitle} | GO MO Group`,
    description: dict.common.ourSolutionsSubtitle,
  }
}

export default async function SolutionsPage() {
  const locale = await getLocale()
  const [solutions, dict] = await Promise.all([getSolutions(), getDictionary(locale)])

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium text-white">{dict.common.ourSolutionsTitle}</h1>
          <p className="mt-3 text-white/70">{dict.common.ourSolutionsSubtitle}</p>
        </div>
        <SolutionsGrid solutions={solutions} />
      </div>
    </div>
  )
}
