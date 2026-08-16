import Image from 'next/image'
import Link from 'next/link'
import type { ContactGlobal } from '@/lib/payload'

const FOOTER_COLUMNS: { heading: string; links: string[] }[] = [
  { heading: 'About', links: ['About us', 'Insights', 'Career', 'Brand Guidelines'] },
  { heading: 'Solutions', links: ['B2B Enterprise', 'B2B SaaS/Tech', 'B2B SME', 'Generative AI'] },
  {
    heading: 'Services',
    links: ['GEO', 'Generative AI', 'SEO', 'SEM/SEA', 'B2B Lead Generation', 'Website Development', 'Website Design'],
  },
  {
    heading: 'Case',
    links: [
      'Industrial Manufacturing (B2B E-Commerce)',
      'FKAB (B2B SME)',
      'Industrial Manufacturing (Enterprise)',
      'Atlas Copco',
      'All Cases',
    ],
  },
]

const OFFICES = [
  { city: 'Gothenburg', address: 'Lennart Torstenssonsgatan 8, 412 56 Göteborg', pin: 'a', rotate: 'rotate-45' },
  { city: 'London', address: '60 St Martins Lane, Covent Garden, London, WC2N 4JS', pin: 'b', rotate: 'rotate-[135deg]' },
  { city: 'Pune', address: 'WeWork, Fourth Floor, Raheja Woods, Kalyani Nagar, Pune, Maharashtra 411006', pin: 'b', rotate: 'rotate-90' },
  { city: 'Stockholm', address: 'Upplandsgatan 7, 111 23 Stockholm', pin: 'b', rotate: '-rotate-[135deg]' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer({ contact }: { contact?: ContactGlobal | null }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl">
          <Image src="/images/home/footer/bg.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:grid-cols-2 md:p-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[1.12px] text-white">Get Future-Ready</p>
              <h2 className="mt-6 text-5xl leading-tight text-white md:text-6xl">
                <span className="font-medium">{`Let's build `}</span>
                <span className="font-serif italic text-purple">{`what's next `}</span>
                <br />
                <span className="font-medium">for </span>
                <span className="font-serif italic text-mint">your growth.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-6 text-white/70">
                Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era.
              </p>
              <div className="relative mt-8 hidden h-32 w-56 overflow-hidden rounded-lg border border-white/10 shadow-lg md:block">
                <Image src="/images/home/footer/product-mockup.png" alt="Product preview" fill className="object-cover" />
              </div>
            </div>

            {/* Static placeholder — not wired to a backend submission handler */}
            <form className="flex flex-col gap-5 rounded-lg bg-white/10 p-6 md:p-10">
              <div>
                <label className="mb-1 block text-sm text-white/70">Choose your service *</label>
                <input className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-white/70">Full name *</label>
                  <input className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/70">Business *</label>
                  <input className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/70">E-mail *</label>
                  <input type="email" className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/70">Contact *</label>
                  <input className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Your Message *</label>
                <input className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60" />
              </div>
              <button
                type="button"
                className="mt-2 self-start rounded-full bg-gomoblue px-9 py-3.5 font-serif text-base italic text-white transition hover:bg-gomoblue/90"
              >
                Start building
              </button>
            </form>
          </div>

          <div className="relative grid grid-cols-1 gap-8 border-t border-white/10 p-8 sm:grid-cols-2 md:p-16 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-sm uppercase tracking-[1.12px] text-white/70">{column.heading}</p>
                <ul className="mt-4 flex flex-col gap-3.5 text-base text-white">
                  {column.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative grid grid-cols-1 gap-4 border-t border-white/10 p-8 sm:grid-cols-2 md:p-16 lg:grid-cols-4">
            {OFFICES.map((office) => (
              <div key={office.city} className="flex flex-col justify-between gap-4 rounded-lg border border-purple-deep p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-turquoise">{office.city}</p>
                  <span className="relative block size-8 shrink-0">
                    <Image src={`/images/home/icons/pin-circle-${office.pin}.svg`} alt="" fill />
                    <span className={`absolute left-1/2 top-1/2 block h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white ${office.rotate}`} />
                  </span>
                </div>
                <p className="text-sm text-white/70">{office.address}</p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-4 border-t border-white/10 px-8 py-6 text-sm text-white md:flex-row md:justify-between md:px-16">
            <p>{`Copyright © ${year} GO MO Group`}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="#" className="hover:text-mint">Privacy Policy</Link>
              <span className="text-white/30">|</span>
              <Link href="#" className="hover:text-mint">Cookie Policy</Link>
              <span className="text-white/30">|</span>
              <Link href="/agent" className="hover:text-mint">AI Agent Information</Link>
            </div>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-xs font-semibold transition hover:border-white/50"
                >
                  {social.label === 'X' ? 'X' : 'in'}
                </Link>
              ))}
              <Link href="#" aria-label="More" className="relative block size-8">
                <Image src="/images/home/icons/social-3.svg" alt="" fill />
              </Link>
            </div>
          </div>
        </div>

        {contact?.email && (
          <p className="mt-6 text-center text-sm text-white/50">
            {contact.email}
            {contact.phone ? ` · ${contact.phone}` : ''}
            {contact.address ? ` · ${contact.address}` : ''}
          </p>
        )}
      </div>
    </footer>
  )
}
