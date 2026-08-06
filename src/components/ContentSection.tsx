import type { ReactNode } from 'react'

export default function ContentSection({
  title,
  children,
  className = '',
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`mx-auto max-w-content px-6 py-16 ${className}`}>
      {title && <h2 className="mb-6 text-3xl font-bold text-gray-900">{title}</h2>}
      <div className="prose max-w-none text-gray-700">{children}</div>
    </section>
  )
}
