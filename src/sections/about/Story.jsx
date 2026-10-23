import { useRef } from 'react'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'

/**
 * About › "Our story": text only — a centred header, then a few paragraphs in
 * a narrow column. The copy is fixed marketing copy, kept here like the home
 * section intros. The header and each paragraph blur-rise into view on scroll.
 * Ported from templates/sections/about/story.html.
 */
export default function Story() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} aria-labelledby="story-title" className="px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          id="story-title"
          eyebrow="Our story"
          title="We built TechSquarers because learning technology shouldn't feel this difficult"
        />

        <div className="mt-8 space-y-5 text-base leading-relaxed text-pretty text-deep-navy/80 sm:mt-10 sm:text-lg">
          <p data-reveal>TechSquarers was founded in 2026 with a clear belief: most online learning is broken.</p>
          <p data-reveal>
            Too many people trying to get into tech get stuck in tutorials. They watch hours of videos, then freeze
            when they face a real project or a bug they can't search their way out of. Learning feels scattered, lonely
            and passive.
          </p>
          <p data-reveal>
            We built TechSquarers to fix that, with structure, mentorship and accountability in one place. No more
            jumping between random playlists and half-finished courses.
          </p>
          <p data-reveal>And because we build software for real businesses too, you learn from people who do the work every day.</p>
        </div>
      </div>
    </section>
  )
}
