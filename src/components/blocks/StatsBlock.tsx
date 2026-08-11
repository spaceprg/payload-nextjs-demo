import type { StatsBlockData } from '@/lib/payload'

const BACKGROUND_CLASS: Record<string, string> = {
  none: '',
  light: 'bg-gray-50',
  brand: 'bg-brand',
}

const INVERTED_BACKGROUNDS = new Set(['brand'])

export default function StatsBlock({ heading, stats, background = 'none' }: StatsBlockData) {
  if (!stats || stats.length === 0) return null

  const inverted = INVERTED_BACKGROUNDS.has(background ?? 'none')

  return (
    <section className={BACKGROUND_CLASS[background ?? 'none']}>
      <div className="mx-auto max-w-content px-6 py-16">
        {heading && (
          <h2 className={`mb-10 text-center text-3xl font-bold ${inverted ? 'text-white' : 'text-gray-900'}`}>
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.id ?? index} className="flex flex-col gap-2">
              <span className={`text-4xl font-bold ${inverted ? 'text-white' : 'text-brand'}`}>{stat.value}</span>
              <span className={`text-sm ${inverted ? 'text-white/80' : 'text-gray-600'}`}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
