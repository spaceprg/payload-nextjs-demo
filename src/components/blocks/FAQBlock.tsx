import type { FAQBlockData } from '@/lib/payload'

export default function FAQBlock({ eyebrow, heading, items }: FAQBlockData) {
  if (!items || items.length === 0) return null

  return (
    <section className="mx-auto max-w-content px-6 py-16">
      {(eyebrow || heading) && (
        <div className="mx-auto mb-10 max-w-2xl text-center">
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>}
          {heading && <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>}
        </div>
      )}
      <div className="mx-auto max-w-3xl divide-y divide-gray-200">
        {items.map((item, index) => (
          <details key={item.id ?? index} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
              {item.question}
              <span className="shrink-0 text-xl text-gray-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
