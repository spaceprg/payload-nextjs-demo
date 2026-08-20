import Image from 'next/image'
import Link from 'next/link'
import { mediaUrl, type CaseStudy } from '@/lib/payload'

function CardInner({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <div className="relative h-48 w-full overflow-hidden bg-white/5">
        <Image
          src={mediaUrl(caseStudy.backgroundImage, 'card')}
          alt={caseStudy.backgroundImage?.alt ?? caseStudy.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {caseStudy.client && <p className="text-xs uppercase tracking-wide text-white/50">{caseStudy.client}</p>}
        <h3 className="mt-2 text-lg font-semibold text-white">{caseStudy.title}</h3>
        {caseStudy.excerpt && <p className="mt-2 flex-1 text-sm text-white/70">{caseStudy.excerpt}</p>}
        <div className="mt-4 flex gap-6">
          <div>
            <p className="font-serif text-xl text-lime">{caseStudy.stat1Value}</p>
            <p className="text-xs text-white/60">{caseStudy.stat1Label}</p>
          </div>
          <div>
            <p className="font-serif text-xl text-pink">{caseStudy.stat2Value}</p>
            <p className="text-xs text-white/60">{caseStudy.stat2Label}</p>
          </div>
        </div>
        {caseStudy.slug && (
          <span className="mt-4 text-sm font-medium text-mint group-hover:underline">
            {caseStudy.buttonLabel || 'Read full case'} →
          </span>
        )}
      </div>
    </>
  )
}

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const className =
    'group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-white/20'

  if (caseStudy.slug) {
    return (
      <Link href={`/case-studies/${caseStudy.slug}`} className={className}>
        <CardInner caseStudy={caseStudy} />
      </Link>
    )
  }

  return (
    <div className={className}>
      <CardInner caseStudy={caseStudy} />
    </div>
  )
}
