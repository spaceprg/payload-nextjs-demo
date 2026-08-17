import type { StatsBlockData } from '@/lib/payload'

const BACKGROUND_CLASS: Record<string, string> = {
  none: '',
  light: 'bg-white/5',
  brand: 'bg-gradient-to-br from-purple-deep/20 to-gomoblue/20',
}

export default function StatsBlock({ heading, stats, background = 'none' }: StatsBlockData) {
  if (!stats || stats.length === 0) return null

  return (
    <section className={`bg-ink ${BACKGROUND_CLASS[background ?? 'none']}`}>
      <div className="mx-auto max-w-content px-6 py-16">
        {heading && <h2 className="mb-10 text-center text-3xl font-medium text-white">{heading}</h2>}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.id ?? index} className="flex flex-col gap-2">
              <span className="font-serif text-4xl italic text-mint">{stat.value}</span>
              <span className="text-sm text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
