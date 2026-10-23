import { useRef } from 'react'
import CopyButton from '../../components/CopyButton'
import ScrollText from '../../components/ScrollText'
import SocialIcon from '../../components/SocialIcon'
import useReveal from '../../hooks/useReveal'
import { phoneHref, siteSettings, socialLinks } from '../../data/site'

/**
 * Contact › how to reach us — ported from templates/sections/contact/details.html.
 * A framed column (hairline borders left and right from lg) holds three rows,
 * split by full-width hairlines: the section header, the contact boxes (Email
 * and Phone, side by side from md), then "Find us online" on a faded dot grid.
 *
 * The page has no banner, so the header's "Contact us" is the page's h1. The
 * section pulls up under the sticky navbar (-mt/pt by the bar's height) so the
 * glow runs behind the bar.
 *
 * Email, phone and the social links all come from site settings. Each box shows
 * only once its value is filled in, and the social row only once a link is.
 * Everything blur-rises into view on scroll.
 */
export default function Details() {
  const ref = useRef(null)
  useReveal(ref)

  const email = siteSettings.email
  const phone = siteSettings.phoneNumber
  const socials = socialLinks(siteSettings)
  const hasBoxes = email || phone

  return (
    <section ref={ref} aria-labelledby="contact-details-title" className="relative isolate -mt-16 overflow-hidden bg-white pt-16 lg:-mt-23 lg:pt-23">
      {/* Faint navy glow at the top left */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 contain-strict">
        <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-deep-navy/.06)_0,--theme(--color-deep-navy/.02)_50%,--theme(--color-deep-navy/.01)_80%)]"></div>
        <div className="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-deep-navy/.04)_0,--theme(--color-deep-navy/.01)_80%,transparent_100%)]"></div>
        <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-deep-navy/.04)_0,--theme(--color-deep-navy/.01)_80%,transparent_100%)]"></div>
      </div>

      <div className="mx-auto max-w-6xl border-deep-navy/10 lg:border-x">
        <div className="px-8 py-20 sm:py-24">
          <div className="max-w-4xl text-left sm:mx-auto sm:text-center">
            <ScrollText
              as="h1"
              id="contact-details-title"
              delay={150}
              cloak
              className="text-[length:min(2.25rem,calc((100vw-2.5rem)/8.7))] leading-[1.05] font-bold tracking-tight text-balance text-deep-navy max-sm:[@media(min-height:48rem)]:text-[2.75rem] sm:text-6xl lg:text-[length:min(5.25rem,calc((50.5vw-4.5rem-max(0rem,(100vw-95rem)/2))/8.7))]"
            >
              Contact us
            </ScrollText>
            <p data-reveal className="mt-5 max-w-2xl text-base leading-relaxed text-deep-navy/80 sm:mx-auto sm:mt-6 sm:text-lg">
              Reach the TechSquarers team by email or phone.
            </p>
          </div>
        </div>

        {hasBoxes && (
          <>
            <div aria-hidden="true" className="absolute inset-x-0 border-t border-deep-navy/10"></div>
            <div className={`mx-auto grid max-w-4xl border-deep-navy/10 min-[56rem]:border-x ${email && phone ? 'md:grid-cols-2' : ''}`}>
              {email && (
                <div data-reveal className={`flex flex-col border-deep-navy/10 ${phone ? 'border-b md:border-r md:border-b-0' : ''}`}>
                  <div className="flex items-center gap-3 border-b border-deep-navy/10 bg-ice-blue/40 px-8 py-4">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-deep-navy/70">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <h3 className="text-lg leading-tight font-bold text-deep-navy sm:text-xl">Email</h3>
                  </div>
                  <div className="flex grow items-center gap-2 px-8 py-12">
                    <a href={`mailto:${email}`} className="focus-ring min-w-0 text-base font-medium break-all text-deep-navy underline-offset-4 hover:text-vibrant-blue hover:underline sm:text-lg">
                      {email}
                    </a>
                    <CopyButton value={email} label="Copy email address" />
                  </div>
                  <p className="border-t border-deep-navy/10 px-8 py-4 text-sm text-deep-navy/70">Write to us about courses, enrolment or anything else.</p>
                </div>
              )}

              {phone && (
                <div data-reveal className="flex flex-col">
                  <div className="flex items-center gap-3 border-b border-deep-navy/10 bg-ice-blue/40 px-8 py-4">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-deep-navy/70">
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                    <h3 className="text-lg leading-tight font-bold text-deep-navy sm:text-xl">Phone</h3>
                  </div>
                  <div className="flex grow items-center gap-2 px-8 py-12">
                    <a href={phoneHref(siteSettings)} className="focus-ring text-base font-medium whitespace-nowrap text-deep-navy underline-offset-4 hover:text-vibrant-blue hover:underline sm:text-lg">
                      {phone}
                    </a>
                    <CopyButton value={phone} label="Copy phone number" />
                  </div>
                  <p className="border-t border-deep-navy/10 px-8 py-4 text-sm text-deep-navy/70">Call us to talk through a course or anything else.</p>
                </div>
              )}
            </div>
          </>
        )}

        {socials.length > 0 && (
          <>
            <div aria-hidden="true" className="absolute inset-x-0 border-t border-deep-navy/10"></div>
            <div className="relative flex min-h-80 items-center justify-center px-8 py-16">
              {/* Dot grid, fading out from the middle */}
              <div aria-hidden="true" className="bg-dot-grid absolute inset-0"></div>

              <div className="relative space-y-6">
                <h2 id="contact-social-title" data-reveal className="text-center text-[1.75rem] leading-[1.2] font-bold tracking-tight text-deep-navy sm:text-4xl">
                  Find us online
                </h2>
                <ul data-reveal aria-labelledby="contact-social-title" className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  {socials.map(({ icon, label, url }) => (
                    <li key={icon}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener"
                        className="focus-ring flex items-center gap-2 rounded-full border border-deep-navy/15 bg-white px-4 py-2.5 text-sm font-medium text-deep-navy transition-colors hover:border-vibrant-blue hover:text-vibrant-blue"
                      >
                        <SocialIcon icon={icon} />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
