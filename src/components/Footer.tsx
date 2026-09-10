import Image from 'next/image'
import Link from 'next/link'
import FooterContactForm from './FooterContactForm'
import { resolveLinkHref } from './blocks/LinkButton'
import { mediaUrl } from '@/lib/media'
import type { ContactGlobal, FooterSettingsGlobal, LinkField, SocialPlatform } from '@/lib/payload'
import { getLocale } from '@/lib/i18n/locale'
import { localizeHref } from '@/lib/i18n/href'
import type { Dictionary } from '@/lib/i18n/getDictionary'

// 2x2 grid order matches the design: Gothenburg/Pune on top, London/Stockholm below.
// Not part of Theme Options — see the `offices` page-builder block (used on
// About/Contact) for the CMS-editable equivalent.
const OFFICES = [
  { city: 'Gothenburg', address: 'Lennart Torstenssonsgatan 8, 412 56 Göteborg', pin: 'a', rotate: 'rotate-45' },
  { city: 'Pune', address: 'WeWork, Fourth Floor, Raheja Woods, Kalyani Nagar, Pune, Maharashtra 411006', pin: 'b', rotate: 'rotate-90' },
  { city: 'London', address: '60 St Martins Lane, Covent Garden, London, WC2N 4JS', pin: 'b', rotate: 'rotate-[135deg]' },
  { city: 'Stockholm', address: 'Upplandsgatan 7, 111 23 Stockholm', pin: 'b', rotate: '-rotate-[135deg]' },
]

const SOCIAL_ICON: Record<SocialPlatform, string> = {
  linkedin: '/images/home/icons/social-mask-2.png',
  facebook: '/images/home/icons/social-mask-1.png',
  youtube: '/images/home/icons/social-frame.svg',
  x: '/images/home/icons/social-3.svg',
  instagram: '/images/home/icons/social-3.svg',
}

const SOCIAL_LABEL: Record<SocialPlatform, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  youtube: 'YouTube',
  x: 'X (Twitter)',
  instagram: 'Instagram',
}

async function resolveLink(link: LinkField | null | undefined, fallbackHref: string) {
  return link?.label ? { label: link.label, href: await resolveLinkHref(link) } : { label: null, href: fallbackHref }
}

export default async function Footer({
  contact,
  dictionary,
  settings,
}: {
  contact?: ContactGlobal | null
  dictionary: Dictionary
  settings: FooterSettingsGlobal | null
}) {
  const year = new Date().getFullYear()
  const locale = await getLocale()

  const logoSrc = settings?.logo ? mediaUrl(settings.logo) : '/images/home/footer/logo-mark.svg'
  const logoAlt = settings?.logoAltText || 'GO MO Group'
  const tagline = settings?.tagline || dictionary.footer.tagline
  const copyrightText = (settings?.copyrightText || dictionary.footer.copyright).replace('{year}', String(year))

  const ctaButton = await resolveLink(settings?.ctaButton, localizeHref('/contact', locale))
  const ctaLabel = ctaButton.label || dictionary.footer.startBuilding

  // Falls back to the site's original nav columns if Theme Options → Footer
  // Options hasn't been configured yet.
  const columns =
    settings?.columns && settings.columns.length > 0
      ? await Promise.all(
          settings.columns.map(async (column) => ({
            heading: column.heading,
            links: await Promise.all(
              (column.links || []).filter((l) => l.label).map(async (l) => ({ label: l.label, href: await resolveLinkHref(l) })),
            ),
          })),
        )
      : Object.values(dictionary.footer.columns).map((column) => ({
          heading: column.heading,
          links: column.links.map((label) => ({ label, href: null as string | null })),
        }))

  const legalLinksSource = settings?.legalLinks && settings.legalLinks.length > 0 ? settings.legalLinks : null
  const legalLinks = legalLinksSource
    ? await Promise.all(legalLinksSource.filter((l) => l.label).map(async (l) => ({ label: l.label, href: await resolveLinkHref(l) })))
    : [
        { label: dictionary.footer.privacyPolicy, href: '#' },
        { label: dictionary.footer.cookiePolicy, href: '#' },
        { label: dictionary.footer.aiAgentInfo, href: localizeHref('/agent', locale) },
      ]

  const socialLinks =
    settings?.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks.filter((s) => s.url)
      : (['linkedin', 'facebook', 'youtube'] as SocialPlatform[]).map((platform) => ({ id: platform, platform, url: '#' }))

  return (
    <footer className="bg-ink">
      <div className="relative overflow-hidden">
        <Image src="/images/home/footer/bg.png" alt="" fill className="object-cover object-right" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto max-w-content px-6 py-16">
          {/* Get Future-Ready */}
          <div className="relative grid grid-cols-1 gap-12 p-8 md:grid-cols-2 md:p-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[1.12px] text-white">{dictionary.footer.getFutureReady}</p>
              <h2 className="mt-6 text-5xl leading-tight text-white md:text-6xl">
                <span className="font-medium">{dictionary.footer.headingLine1}</span>
                <span className="font-serif italic text-purple">{dictionary.footer.headingHighlight1}</span>
                <br />
                <span className="font-medium">{dictionary.footer.headingLine2}</span>
                <span className="font-serif italic text-mint">{dictionary.footer.headingHighlight2}</span>
              </h2>
            </div>

            <FooterContactForm dictionary={dictionary} />
          </div>

          {/* Footer panel: brand/offices (left) + nav columns (right) */}
          <div className="relative mx-8 mb-8 rounded-2xl bg-white/10 p-8 md:mx-16 md:mb-16 md:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <div>
                <div className="relative h-[60px] w-[221px] max-w-full">
                  <Image src={logoSrc} alt={logoAlt} fill className="object-contain object-left" />
                </div>
                <p className="mt-6 max-w-sm text-base leading-6 text-white/70">{tagline}</p>
                <Link
                  href={ctaButton.href}
                  className="mt-6 inline-flex w-fit rounded-full bg-gradient-to-r from-[#8f38f8] via-[#268de5] to-[#2804de] px-9 py-3.5 font-serif text-base italic text-white transition hover:opacity-90"
                >
                  {ctaLabel}
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
                {columns.map((column) => (
                  <div key={column.heading}>
                    <p className="text-sm uppercase tracking-[1.12px] text-white/70">{column.heading}</p>
                    <ul className="mt-4 flex flex-col gap-3.5 text-base text-white">
                      {column.links.map((link, index) =>
                        link.href ? (
                          <li key={link.label ?? index}>
                            <Link href={link.href} className="hover:text-mint">
                              {link.label}
                            </Link>
                          </li>
                        ) : (
                          <li key={link.label ?? index}>{link.label}</li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/15 pt-6 text-sm text-white md:flex-row md:justify-between">
              <p>{copyrightText}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {legalLinks.map((link, index) => (
                  <span key={link.label ?? index} className="flex items-center gap-4">
                    {index > 0 && <span className="text-white/30">|</span>}
                    <Link href={link.href} className="hover:text-mint">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <Link
                    key={social.id ?? social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABEL[social.platform]}
                    className="relative block size-8 shrink-0"
                  >
                    <Image src={SOCIAL_ICON[social.platform]} alt="" fill />
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
