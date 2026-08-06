import Link from 'next/link'

export default function CTASection({
  title = 'Ready to start your project?',
  buttonLabel = 'Contact Us',
  href = '/contact',
}: {
  title?: string
  buttonLabel?: string
  href?: string
}) {
  return (
    <section className="bg-brand">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <Link
          href={href}
          className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand transition hover:bg-gray-100"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
