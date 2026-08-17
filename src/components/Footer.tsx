import Image from 'next/image'
import Link from 'next/link'
import FooterContactForm from './FooterContactForm'
import type { ContactGlobal } from '@/lib/payload'

const FOOTER_COLUMNS: { heading: string; links: string[] }[] = [
  { heading: 'About', links: ['About us', 'Insights', 'Career', 'Brand Guidelines'] },
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
  { heading: 'Solutions', links: ['B2B Enterprise', 'B2B SaaS/Tech', 'B2B SME', 'Generative AI'] },
  {
    heading: 'Services',
    links: ['GEO', 'Generative AI', 'SEO', 'SEM/SEA', 'B2B Lead Generation', 'Website Development', 'Website Design'],
  },
]

// 2x2 grid order matches the design: Gothenburg/Pune on top, London/Stockholm below.
const OFFICES = [
  { city: 'Gothenburg', address: 'Lennart Torstenssonsgatan 8, 412 56 Göteborg', pin: 'a', rotate: 'rotate-45' },
  { city: 'Pune', address: 'WeWork, Fourth Floor, Raheja Woods, Kalyani Nagar, Pune, Maharashtra 411006', pin: 'b', rotate: 'rotate-90' },
  { city: 'London', address: '60 St Martins Lane, Covent Garden, London, WC2N 4JS', pin: 'b', rotate: 'rotate-[135deg]' },
  { city: 'Stockholm', address: 'Upplandsgatan 7, 111 23 Stockholm', pin: 'b', rotate: '-rotate-[135deg]' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#', icon: '/images/home/icons/social-mask-2.png' },
  { label: 'Facebook', href: '#', icon: '/images/home/icons/social-mask-1.png' },
  { label: 'YouTube', href: '#', icon: '/images/home/icons/social-frame.svg' },
]

export default function Footer({ contact }: { contact?: ContactGlobal | null }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink">
      <div className="relative overflow-hidden">
        <Image src="/images/home/footer/bg.png" alt="" fill className="object-cover object-right" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto max-w-content px-6 py-16">
          {/* Get Future-Ready */}
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
            </div>

            <FooterContactForm />
          </div>

          {/* Footer panel: brand/offices (left) + nav columns (right) */}
          <div className="relative mx-8 mb-8 rounded-2xl bg-white/10 p-8 md:mx-16 md:mb-16 md:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <div>
                <div className="relative h-[60px] w-[221px] max-w-full">
                  <Image src="/images/home/footer/logo-mark.svg" alt="GO MO Group" fill className="object-contain object-left" />
                </div>
                <p className="mt-6 max-w-sm text-base leading-6 text-white/70">
                  Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-fit rounded-full bg-gradient-to-r from-[#8f38f8] via-[#268de5] to-[#2804de] px-9 py-3.5 font-serif text-base italic text-white transition hover:opacity-90"
                >
                  Start building
                </Link>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="flex flex-col justify-between gap-6 rounded-lg border border-purple-deep p-4">
                      <div className="flex items-center justify-between gap-2">
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
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
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
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-6 text-sm text-white md:flex-row md:justify-between">
              <p>{`Copyright © ${year} GO MO Group`}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="#" className="hover:text-mint">Privacy Policy</Link>
                <span className="text-white/30">|</span>
                <Link href="#" className="hover:text-mint">Cookie Policy</Link>
                <span className="text-white/30">|</span>
                <Link href="/agent" className="hover:text-mint">AI Agent Information</Link>
              </div>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <Link key={social.label} href={social.href} aria-label={social.label} className="relative block size-8 shrink-0">
                    <Image src={social.icon} alt="" fill />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {contact?.email && (
        <div className="mx-auto max-w-content px-6 pb-6 pt-6">
          <p className="text-center text-sm text-white/50">
            {contact.email}
            {contact.phone ? ` · ${contact.phone}` : ''}
            {contact.address ? ` · ${contact.address}` : ''}
          </p>
        </div>
      )}
    </footer>
  )
}
