import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'

/**
 * About › "Our mission": a photo on the left and the mission on the right;
 * from lg they sit side by side, vertically centred. Phones and tablets stack
 * the label, then the photo, then the statement — the text block is
 * display:contents below lg, so its label and statement become grid items of
 * their own and CSS order slots the photo between them; in the markup the text
 * comes first, so screen readers meet the heading before the photo.
 *
 * The statement is the company mission word for word, the same line as home's
 * What we do intro. The photo and the text blur-rise into view on scroll.
 * Ported from templates/sections/about/mission.html.
 */
export default function Mission() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} aria-labelledby="mission-title" className="bg-ice-blue px-8 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="contents lg:col-start-2 lg:row-start-1 lg:block">
          <h2
            id="mission-title"
            data-reveal
            className="order-1 font-sans text-sm font-semibold tracking-widest text-vibrant-blue uppercase sm:text-base lg:order-none"
          >
            Our mission
          </h2>
          <p
            data-reveal
            className="order-3 font-space-grotesk text-[1.75rem] leading-[1.2] font-bold tracking-tight text-deep-navy sm:text-4xl sm:leading-[1.2] lg:order-none lg:mt-6"
          >
            To raise a generation of skilled, confident tech talent while helping the institutions and businesses we
            serve grow through dependable technology and services.
          </p>
        </div>

        {/* The frame clips the photo's hover zoom; it also carries the reveal */}
        <div data-reveal className="isolate order-2 -mx-4 overflow-hidden rounded-3xl sm:mx-0 lg:order-none lg:col-start-1 lg:row-start-1">
          <img
            src="/images/about-mission-handshake-1200.webp"
            srcSet="/images/about-mission-handshake-800.webp 800w, /images/about-mission-handshake-1200.webp 1200w"
            sizes="(min-width: 1024px) 544px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
            width="1200"
            height="904"
            loading="lazy"
            alt="Two people shaking hands against a pale grey background"
            className="aspect-4/3 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-safe:hover:scale-108"
          />
        </div>
      </div>
    </section>
  )
}
