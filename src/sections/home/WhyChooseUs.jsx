import { useRef, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'

const REASONS = [
  {
    title: 'Taught by builders',
    description: 'We build software for real businesses, so you learn from people who do the work every day, not just teach it.',
  },
  {
    title: 'Skills employers want',
    description: 'Our courses focus on practical, in-demand skills that open doors to jobs, freelancing and starting your own thing.',
  },
  {
    title: 'Mentorship, not just lessons',
    description: "You get guidance and honest feedback from people who've been where you are, all the way through your course.",
  },
  {
    title: 'Learn by doing',
    description: 'You build real projects as you go, so you finish with work you can show, not just notes.',
  },
]

/**
 * One reason in the accordion — ported from templates/components/reason-card.html.
 * The title is a button inside the h3, with aria-expanded and aria-controls
 * pointing at its panel. One reason is always open, so the open one's button
 * is aria-disabled rather than closing everything. The panel opens by
 * animating its grid row from 0fr to 1fr; closed panels are inert. The open
 * reason gets a vibrant-blue bar on the list's left rule. On hover/focus the
 * title grows slightly from its left edge instead of changing colour.
 */
function ReasonCard({ index, title, description, open, onOpen }) {
  const isOpen = open === index
  return (
    <li data-reveal className="relative">
      <span
        className={`absolute inset-y-0 -left-0.5 w-0.5 origin-top bg-vibrant-blue transition-transform duration-300 motion-reduce:transition-none ${isOpen ? '' : 'scale-y-0'}`}
        aria-hidden="true"
      ></span>

      <h3>
        <button
          type="button"
          id={`reason-button-${index}`}
          aria-controls={`reason-panel-${index}`}
          aria-expanded={isOpen}
          aria-disabled={isOpen}
          onClick={() => onOpen(index)}
          className="focus-ring group block w-full py-5 pl-6 text-left font-space-grotesk font-bold text-deep-navy"
        >
          <span className="block origin-left text-lg leading-tight transition-transform duration-300 group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none sm:text-xl">
            {title}
          </span>
        </button>
      </h3>

      <div
        id={`reason-panel-${index}`}
        role="region"
        aria-labelledby={`reason-button-${index}`}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="pr-4 pb-6 pl-6 text-[0.9375rem] leading-relaxed text-deep-navy/80 sm:text-base">{description}</p>
        </div>
      </div>
    </li>
  )
}

/**
 * "Why choose us": heading and intro centred above an accordion of reasons on
 * the left and a photo on the right. Clicking a reason opens it; one is always
 * open, starting with the first. Copy is fixed marketing copy, kept here like
 * the hero's. Ported from templates/sections/home/why-choose-us.html.
 */
export default function WhyChooseUs() {
  const ref = useRef(null)
  useReveal(ref)
  const [open, setOpen] = useState(0)

  return (
    <section ref={ref} aria-labelledby="why-choose-us-title" className="bg-white px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeader
          id="why-choose-us-title"
          eyebrow="Why choose us"
          title="Real experience in every class"
          intro="We don't just teach tech. We build it, and we bring that experience into every class."
        />

        <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* The frame clips the photo's hover zoom; it also carries the reveal */}
          <div data-reveal className="isolate overflow-hidden rounded-2xl lg:col-start-2 lg:row-start-1">
            <img
              src="/images/why-choose-us-pointing-840.webp"
              srcSet="/images/why-choose-us-pointing-700.webp 700w, /images/why-choose-us-pointing-840.webp 840w"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width="840"
              height="1200"
              loading="lazy"
              decoding="async"
              alt="A person in a blue sleeve points at a line of code on a monitor while typing on the keyboard"
              className="aspect-4/3 w-full bg-ice-blue object-cover object-[center_25%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:aspect-video lg:aspect-4/3 motion-safe:hover:scale-108"
            />
          </div>

          <ul className="border-l-2 border-deep-navy/10 lg:col-start-1 lg:row-start-1">
            {REASONS.map((reason, i) => (
              <ReasonCard key={reason.title} index={i} {...reason} open={open} onOpen={setOpen} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
