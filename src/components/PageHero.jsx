import { useRef } from 'react'
import Breadcrumb from './Breadcrumb'
import ScrollText from './ScrollText'
import useReveal from '../hooks/useReveal'

/**
 * Shared header for inner pages: a large centred title with an optional
 * breadcrumb under it. Ported from templates/components/page-hero.html.
 *
 * Two looks:
 * - Light (no `image`, the course pages): white with the dot grid
 *   (bg-dot-grid in index.css), fading out from the middle.
 * - Photo (`image` set: Programs, About): a short banner — the photo covers
 *   the band under a deep-navy wash and the title turns white.
 *
 * In both looks the title is the same size as the home hero headline at every
 * width. Like the home hero, it tucks under the sticky navbar (-mt / pt match
 * the header height, 4rem below lg, 5.75rem from lg).
 *
 * Motion: the title's words rise out of a blur one after another as the page
 * loads (ScrollText, cloaked), then the breadcrumb blur-rises in (useReveal).
 *
 * Props: title, crumbs, image, imageSmall, imageAlt, imagePosition.
 */
export default function PageHero({ title, crumbs, image, imageSmall, imageAlt = '', imagePosition = 'object-center' }) {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      aria-labelledby="page-hero-title"
      className={`relative isolate -mt-16 overflow-hidden pt-16 lg:-mt-23 lg:pt-23 ${image ? 'bg-deep-navy' : 'bg-white'}`}
    >
      {image ? (
        <>
          <picture>
            {imageSmall && <source media="(max-width: 767px)" srcSet={imageSmall} />}
            <img
              src={image}
              alt={imageAlt}
              fetchPriority="high"
              className={`absolute inset-0 -z-20 size-full object-cover ${imagePosition}`}
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-deep-navy/70"></div>
        </>
      ) : (
        <div aria-hidden="true" className="bg-dot-grid absolute inset-0 -z-10"></div>
      )}

      {/* The photo banner is shorter than the light header: ~224px on phones, 288px from sm, 348px from lg, navbar included */}
      <div
        className={`mx-auto flex max-w-[90rem] flex-col items-center justify-center px-8 text-center ${
          image ? 'min-h-40 py-10 sm:min-h-56 sm:py-14 lg:min-h-64 lg:py-16' : 'min-h-52 py-12 sm:min-h-80 sm:py-20 lg:min-h-96 lg:py-24'
        }`}
      >
        <ScrollText
          as="h1"
          id="page-hero-title"
          delay={150}
          cloak
          className={`max-w-4xl text-[length:min(2.25rem,calc((100vw-2.5rem)/8.7))] leading-[1.05] font-bold tracking-tight text-balance max-sm:[@media(min-height:48rem)]:text-[2.75rem] sm:text-6xl lg:text-[length:min(5.25rem,calc((50.5vw-4.5rem-max(0rem,(100vw-95rem)/2))/8.7))] ${
            image ? 'text-white' : 'text-deep-navy'
          }`}
        >
          {title}
        </ScrollText>
        {crumbs && (
          <div data-reveal className="mt-3 sm:mt-5 lg:mt-7">
            <Breadcrumb crumbs={crumbs} centered />
          </div>
        )}
      </div>
    </section>
  )
}
