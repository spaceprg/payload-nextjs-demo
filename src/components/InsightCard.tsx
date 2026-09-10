import Image from 'next/image'
import Link from 'next/link'
import { mediaUrl, type Insight } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref } from '@/lib/i18n/href'
import type { Locale } from '@/lib/i18n/config'

function formatDate(dateStr: string, locale: Locale) {
  return new Date(dateStr).toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function InsightCard({ insight }: { insight: Insight }) {
  const locale = await getLocale()
  const dict = await getDictionary(locale)

  return (
    <Link
      href={localizeHref(`/insights/${insight.slug}`, locale)}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <Image
          src={mediaUrl(insight.heroImage, 'card')}
          alt={insight.heroImage?.alt ?? insight.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-[1.12px] text-lime">{insight.category}</p>
        <div className="mt-2 flex justify-between text-xs text-white/60">
          <span>{formatDate(insight.publishedDate, locale)}</span>
          {insight.readTime && <span>{insight.readTime}</span>}
        </div>
        <h3 className="mt-3 flex-1 text-lg font-semibold text-white">{insight.title}</h3>
        <span className="mt-4 text-sm font-medium text-mint group-hover:underline">{dict.common.readMore} →</span>
      </div>
    </Link>
  )
}
