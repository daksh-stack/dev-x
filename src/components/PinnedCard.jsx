/**
 * A card pinned to the page — the white note with a pin on top and a coloured
 * panel inside — for the "What we do" section.
 * Ported 1:1 from templates/components/pinned-card.html (Django original).
 *
 * Props:
 *   number       "01" | "02" | "03" (aria-hidden — pillars are offers, not steps)
 *   title        e.g. "Training"
 *   description  card copy
 *   position     its grid cell from md (see WhatWeDo.jsx for how the stagger works)
 *   rotate       the tilt, gentler on phones than from md
 *   theme        "light" (ice-blue panel) or "dark" (deep-navy panel)
 *
 * data-pin marks it for WhatWeDo's pinned-path logic, which draws the dashed
 * line through each card's centre. Hover lifts the card — motion-safe only.
 */
export default function PinnedCard({ number, title, description, position = '', rotate = '', theme = 'light' }) {
  const dark = theme === 'dark'
  return (
    <div
      data-pin
      className={`relative w-full max-w-sm self-start justify-self-center transition-transform duration-300 motion-reduce:transition-none motion-safe:hover:z-30 motion-safe:hover:scale-105 md:max-w-72 lg:w-[280px] lg:max-w-none ${rotate} ${position}`}
    >
      <div className="rounded-[25px] border border-deep-navy/5 bg-white p-2 shadow-xl shadow-black/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="mx-auto mb-6 size-8 text-deep-navy"
        >
          <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
        </svg>
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px] ${
            dark ? 'border-deep-navy bg-deep-navy' : 'border-deep-navy/10 bg-ice-blue'
          }`}
        >
          <span
            aria-hidden="true"
            className={`mb-5 font-space-grotesk text-4xl font-medium ${dark ? 'text-ice-blue' : 'text-deep-navy'}`}
          >
            {number}
          </span>
          <h3 className={`mb-2.5 text-lg leading-tight font-bold sm:text-xl ${dark ? 'text-white' : 'text-deep-navy'}`}>
            {title}
          </h3>
          <p className={`text-[0.9375rem] leading-relaxed sm:text-base ${dark ? 'text-white/80' : 'text-deep-navy/80'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
