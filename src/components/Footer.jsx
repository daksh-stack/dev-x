import { Link } from 'react-router-dom'
import ArrowFillButton from './ArrowFillButton'
import ScrollText from './ScrollText'
import SocialIcon from './SocialIcon'
import { courses, courseUrl, siteSettings, socialLinks, whatsappChatUrl } from '../data/site'

/**
 * Closing CTA + site footer, on every page except Contact (the original
 * suppresses it there). Ported from templates/partials/footer.html.
 *
 * The photo sits behind the CTA and runs on under the white footer card, whose
 * rounded top corners rise over its lower edge. The text is centred at every
 * size, over a soft navy glow (without it the paragraph measures only ~3:1).
 *
 * The CTA button opens a WhatsApp chat (number in site settings). With no
 * number set it links to the Contact page instead, so the section never ends
 * without an action. The round arrow goes back to the top of the page (#main,
 * the same target as the skip link). The <html> element carries
 * motion-safe:scroll-smooth (index.html), so it glides up unless the visitor
 * asks for reduced motion.
 *
 * Footer card: logo and social icons on the left; Explore and Courses (from
 * the course list) on the right from lg. Social icons show only when their
 * address is filled in.
 */
export default function Footer() {
  const chatUrl = whatsappChatUrl(siteSettings)
  const socials = socialLinks(siteSettings)
  const year = new Date().getFullYear()

  return (
    <div className="bg-deep-navy">
      {/* Photo area: the CTA plus the strip the footer card overlaps */}
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/cta-mouse-1451.webp"
          alt=""
          width="1451"
          height="1084"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-[38%_50%] md:object-center"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-b from-transparent to-deep-navy"></div>

        <section aria-labelledby="cta-title" className="pt-28 pb-28 text-center sm:px-6 md:pt-32 md:pb-30">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
            <div className="relative mx-auto w-fit">
              {/* The glow: a soft navy ellipse behind the text only */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[180%] w-[150%] -translate-x-1/2 -translate-y-1/2 bg-radial-[closest-side] from-deep-navy/75 via-deep-navy/55 via-70% to-transparent"
              ></div>
              <ScrollText
                as="h2"
                id="cta-title"
                className="text-[1.75rem] leading-[1.2] font-bold tracking-tight text-white sm:text-4xl"
              >
                Have questions?
              </ScrollText>
              <p className="mx-auto mt-5 max-w-xl text-base text-balance text-white sm:text-lg">
                Not sure which course is right for you? Our team is happy to talk it through and help you choose.
              </p>
              {/* The button's own focus ring is vibrant-blue, too faint on this dark background; white here */}
              <div className="mt-9 flex justify-center [&>a]:focus-visible:outline-white">
                {chatUrl ? (
                  <ArrowFillButton label="Chat with us on WhatsApp" url={chatUrl} newTab />
                ) : (
                  <ArrowFillButton label="Contact us" url="/contact" />
                )}
              </div>
            </div>

            <a
              href="#main"
              className="mx-auto mt-16 flex size-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-deep-navy focus-visible:bg-white focus-visible:text-deep-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none md:mt-36"
            >
              <span className="sr-only">Back to top</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className="size-4"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      <div className="relative -mt-24 sm:px-6">
        <footer className="mx-auto max-w-[90rem] rounded-t-[2rem] bg-white px-6 pt-12 pb-8 sm:px-10 sm:pt-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div>
              {/* Same lockup as the navbar, a size up */}
              <Link
                to="/"
                className="focus-ring inline-flex items-center rounded-lg"
                style={{ '--mark-height': '2.25rem', '--wordmark-height': '0.9rem' }}
              >
                <img src="/images/logo-mark.svg" alt="TechSquarers home" width="140" height="108" className="h-(--mark-height) w-auto" />
                <img
                  src="/images/logo-wordmark.svg"
                  alt=""
                  width="153"
                  height="15"
                  className="ml-[calc(var(--mark-height)*0.313)] h-(--wordmark-height) w-auto"
                />
              </Link>

              {socials.length > 0 && (
                <ul className="mt-8 flex gap-2">
                  {socials.map(({ icon, label, url }) => (
                    <li key={icon}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener"
                        className="focus-ring flex size-11 items-center justify-center rounded-full text-deep-navy transition-colors hover:bg-ice-blue hover:text-vibrant-blue"
                      >
                        <span className="sr-only">TechSquarers on {label}</span>
                        <SocialIcon icon={icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-16 lg:gap-24">
              <nav aria-labelledby="footer-explore">
                <h2 id="footer-explore" className="text-xs font-semibold tracking-widest text-deep-navy/70 uppercase">
                  Explore
                </h2>
                <ul className="mt-4">
                  <li>
                    <Link to="/" className="focus-ring footer-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="focus-ring footer-link">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs" className="focus-ring footer-link">
                      Programs
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="focus-ring footer-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {courses.length > 0 && (
                <nav aria-labelledby="footer-courses">
                  <h2 id="footer-courses" className="text-xs font-semibold tracking-widest text-deep-navy/70 uppercase">
                    Courses
                  </h2>
                  <ul className="mt-4">
                    {courses.map((course) => (
                      <li key={course.slug}>
                        <Link to={courseUrl(course)} className="focus-ring footer-link">
                          {course.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>

          <p className="mt-12 border-t border-ice-blue pt-6 text-sm text-deep-navy/70">
            &copy; {year} TechSquarers. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
