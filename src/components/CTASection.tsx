import Link from 'next/link'
import { getLocale } from '@/lib/i18n/locale'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref } from '@/lib/i18n/href'

export default async function CTASection({
  title,
  buttonLabel,
  href = '/contact',
}: {
  title?: string
  buttonLabel?: string
  href?: string
}) {
  const locale = await getLocale()
  const dict = await getDictionary(locale)
  const resolvedTitle = title ?? dict.common.ctaReadyToStartProject
  const resolvedButtonLabel = buttonLabel ?? dict.common.contactUsButton
  const resolvedHref = localizeHref(href, locale)

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 border-t border-white/10 px-6 py-16 text-center">
        <h2 className="text-3xl font-medium text-white">{resolvedTitle}</h2>
        <Link
          href={resolvedHref}
          className="rounded-full bg-gradient-to-r from-[#8f38f8] via-[#268de5] to-[#2804de] px-9 py-3.5 font-serif text-base italic text-white transition hover:opacity-90"
        >
          {resolvedButtonLabel}
        </Link>
      </div>
    </section>
  )
}
