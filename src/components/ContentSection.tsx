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
    <section className={`bg-ink ${className}`}>
      <div className="mx-auto max-w-content px-6 py-16">
        {title && <h2 className="mb-6 text-3xl font-medium text-white">{title}</h2>}
        <div className="max-w-none text-white/80">{children}</div>
      </div>
    </section>
  )
}
