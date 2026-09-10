import Image from 'next/image'
import Link from 'next/link'
import { mediaUrl, type Solution } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref } from '@/lib/i18n/href'

export default async function SolutionCard({ solution }: { solution: Solution }) {
  const locale = await getLocale()
  const dict = await getDictionary(locale)

  return (
    <Link
      href={localizeHref(`/solutions/${solution.slug}`, locale)}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <Image
          src={mediaUrl(solution.heroImage, 'card')}
          alt={solution.heroImage?.alt ?? solution.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{solution.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/70">{solution.shortDescription}</p>
        <span className="mt-4 text-sm font-medium text-mint group-hover:underline">
          {dict.common.readMore} →
        </span>
      </div>
    </Link>
  )
}
