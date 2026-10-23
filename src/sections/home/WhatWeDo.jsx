import { useEffect, useRef } from 'react'
import PinnedCard from '../../components/PinnedCard'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'

/**
 * "What we do" — the three pillars from the company mission, as cards pinned
 * to a ruled page and joined by a moving dashed line.
 * Ported from templates/sections/home/what-we-do.html + static/js/pinned-path.js.
 *
 * Layout — a grid at every size:
 *  - phones: one column, cards stacked and centred
 *  - from md: staggered — Training rows 1-2, Mentoring rows 2-3, Building rows 3-4
 *  - from lg: rows of 330px steps, columns 15% | 280px | rest | 280px | 15%
 * Tilt is 2° on phones and 4° from md, alternating.
 *
 * The dashed line is drawn from wherever the cards actually are and redrawn
 * whenever the layout resizes: straight segments from card centre to card
 * centre. With no JavaScript it is simply empty; the cards are unaffected.
 *
 * Scrolling in, the heading and promise line blur-rise into view (useReveal).
 * The cards and the dashed line don't: the line reached the cards before they
 * had risen in, which looked broken in the original, so the diagram simply shows.
 */
export default function WhatWeDo() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const path = pathRef.current
    const svg = svgRef.current
    if (!container || !path || !svg) return

    const draw = () => {
      const box = container.getBoundingClientRect()
      const centres = [...container.querySelectorAll('[data-pin]')].map((card) => {
        const r = card.getBoundingClientRect()
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
      })
      if (centres.length < 2) return
      const d = centres.map((c, i) => `${i ? 'L' : 'M'} ${c.x} ${c.y}`).join(' ')
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
      path.setAttribute('d', d)
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(container)
    document.fonts?.ready.then(draw)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} aria-labelledby="what-we-do-title" className="relative overflow-x-clip bg-white px-8 py-20 sm:py-24">
      {/* Ruled lines, then a white fade over each half so they only show toward the middle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mt-1 bg-[linear-gradient(var(--color-deep-navy)_1px,transparent_1px)] bg-[length:100%_32px] opacity-[0.08]"
      ></div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-white to-transparent"></div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-white to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <SectionHeader
          id="what-we-do-title"
          eyebrow="What we do"
          title="Growing tech talent and the businesses that need it"
          intro="To raise a generation of skilled, confident tech talent while helping the institutions and businesses we serve grow through dependable technology and services."
        />

        <div
          ref={containerRef}
          className="relative mx-auto mt-14 grid w-full max-w-[1000px] gap-y-10 sm:mt-16 md:grid-cols-2 md:auto-rows-fr md:gap-x-8 md:gap-y-6 lg:grid-cols-[15%_280px_1fr_280px_15%] lg:grid-rows-[200px_200px_auto] lg:gap-x-0 lg:gap-y-0"
        >
          <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full text-deep-navy/25">
            <path
              ref={pathRef}
              className="pinned-path"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
          </svg>

          <PinnedCard
            number="01"
            title="Training"
            theme="light"
            rotate="rotate-2 md:rotate-4"
            position="md:col-start-1 md:row-[1/span_2] lg:col-start-2 lg:row-[1/span_1]"
            description="Equipping people with practical, in-demand technical skills that open doors to employment, entrepreneurship, and innovation."
          />
          <PinnedCard
            number="02"
            title="Mentoring"
            theme="dark"
            rotate="-rotate-2 md:-rotate-4"
            position="md:col-start-2 md:row-[2/span_2] lg:col-start-4 lg:row-[2/span_1]"
            description="Walking alongside learners and professionals with guidance, real-world insight, and support that turns knowledge into lasting competence and confidence."
          />
          <PinnedCard
            number="03"
            title="Building"
            theme="light"
            rotate="rotate-2 md:rotate-4"
            position="md:col-start-1 md:row-[3/span_2] lg:col-start-2 lg:row-[3/span_1]"
            description="Delivering reliable, high-quality tech solutions and products that solve real problems for the organisations and businesses we serve."
          />
        </div>
      </div>
    </section>
  )
}
