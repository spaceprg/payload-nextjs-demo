import Link from 'next/link'

type HomeButtonVariant = 'solid' | 'gradient' | 'outline'

const VARIANT_CLASS: Record<HomeButtonVariant, string> = {
  solid: 'bg-gomoblue text-white hover:bg-gomoblue/90',
  gradient:
    'bg-gradient-to-r from-purple-deep via-[#268de5] to-[#2804de] text-white hover:opacity-90',
  outline: 'border border-gomoblue bg-white text-gomoblue hover:bg-gomoblue/5',
}

export default function HomeButton({
  label,
  href,
  variant = 'solid',
  newTab = false,
  className = '',
}: {
  label: string
  href: string
  variant?: HomeButtonVariant
  newTab?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-9 py-3.5 font-serif text-base italic transition ${VARIANT_CLASS[variant]} ${className}`}
    >
      {label}
    </Link>
  )
}
