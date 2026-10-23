import LinkButton from '../../components/LinkButton'
import ScrollText from '../../components/ScrollText'
import Typewriter from '../../components/Typewriter'

/**
 * Home hero — ported from templates/sections/home/hero.html.
 * The copy lives here on purpose (fixed marketing copy, not site data).
 * The photo fills the section at every size and slides up under the glass
 * navbar by the header's height (-mt-16 below lg; -mt-23 from lg).
 *
 * White text at every size over a photo that stays clear: on desktop the text
 * sits on the photo's dark left side with no overlay; on phones a navy fade
 * rises from the bottom behind it.
 *
 * Entrance on load (motion-safe skips it for reduced motion):
 *   0ms        the navbar card with the logo and menu button, and this photo, fade in
 *   300–750ms  the headline comes in word by word out of a blur (ScrollText),
 *              the rotating word last
 *   800–920ms  the paragraph, then the link, rise in
 *   850–950ms  the rest of the navbar: "Join our community", then the links pill
 *
 * After the entrance, the last headline word keeps rotating through
 * Confidence / Projects / Careers (Typewriter, spring-green). Known
 * limitation carried over from the original: no pause button, so it misses
 * WCAG 2.2.2. Screen readers always get "Build Real Confidence.".
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      style={{
        '--hero-gutter': 'calc(3.5rem + max(0rem, (100vw - 95rem) / 2))',
        '--hero-heading-column': 'calc(50.5vw - var(--hero-gutter) - 1rem)',
        '--hero-column': 'calc(40vw - var(--hero-gutter) - 1rem)',
      }}
      className="relative isolate -mt-16 flex min-h-svh flex-col justify-end pt-16 lg:-mt-23 lg:pt-23 lg:aspect-video lg:max-h-[max(100svh,34rem)] lg:min-h-0 lg:w-full lg:flex-row lg:items-center lg:justify-start"
    >
      <div className="px-2 sm:px-6 lg:w-full lg:px-0">
        <div className="mx-auto max-w-7xl px-3 pb-8 sm:px-4 sm:pb-12 lg:mx-0 lg:max-w-none lg:py-0 lg:ps-(--hero-gutter)">
          <div className="max-w-2xl lg:max-w-(--hero-heading-column)">
            <ScrollText
              as="h1"
              id="hero-title"
              delay={300}
              cloak
              className="text-[length:min(2.25rem,calc((100vw-2.5rem)/8.7))] leading-[1.05] font-bold tracking-tight text-white max-sm:[@media(min-height:48rem)]:text-[2.75rem] sm:text-6xl lg:text-[length:min(5.25rem,calc(var(--hero-heading-column)/8.7))]"
            >
              <span className="block whitespace-nowrap max-sm:[@media(min-height:48rem)]:whitespace-normal">
                Master Tech Skills.
              </span>
              <span className="block">
                Build Real{' '}
                <Typewriter
                  words={['Confidence.', 'Projects.', 'Careers.']}
                  options={{ startDelay: 720, repeatDelay: 2000, fixedWidth: true }}
                />
              </span>
            </ScrollText>
            <div className="lg:max-w-[min(32rem,var(--hero-column))]">
              <p
                style={{ animationDelay: '800ms' }}
                className="mt-4 motion-safe:animate-rise-in text-sm leading-relaxed text-white sm:mt-5 sm:text-lg lg:text-base xl:text-lg"
              >
                Practical training and real mentorship that turn what you learn into lasting skill and open doors to
                employment, entrepreneurship and innovation.
              </p>
              <div style={{ animationDelay: '920ms' }} className="mt-6 motion-safe:animate-rise-in lg:mt-8">
                <LinkButton label="Explore courses" url="/programs" dark />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden motion-safe:animate-fade-in">
        <img
          src="/images/hero-mentoring-code-1672.webp"
          srcSet="/images/hero-mentoring-code-1000.webp 1000w, /images/hero-mentoring-code-1672.webp 1672w"
          sizes="(min-width: 1024px) 100vw, max(100vw, 178vh)"
          width="1672"
          height="941"
          alt="A mentor points with a pen at code on a computer screen while a learner beside them listens, in an office at dusk"
          fetchPriority="high"
          className="size-full object-cover object-[81%_40%] md:object-[85%_40%] lg:object-top"
        />
        {/* Below lg: a navy fade rising from the bottom behind the text, clear by 78% up so their faces stay clear */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-deep-navy/85 via-deep-navy/65 via-45% to-transparent to-78% lg:hidden"
        ></div>
      </div>
    </section>
  )
}
