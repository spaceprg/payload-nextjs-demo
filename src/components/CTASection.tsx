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
    <section className="bg-ink">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 border-t border-white/10 px-6 py-16 text-center">
        <h2 className="text-3xl font-medium text-white">{title}</h2>
        <Link
          href={href}
          className="rounded-full bg-gradient-to-r from-[#8f38f8] via-[#268de5] to-[#2804de] px-9 py-3.5 font-serif text-base italic text-white transition hover:opacity-90"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
