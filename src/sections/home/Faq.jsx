import { Fragment, useRef, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'
import { faqs } from '../../data/site'

/**
 * Frequently asked questions — ported from templates/sections/home/faq.html.
 * Questions come from the FAQ data in their order, and the section is hidden
 * until at least one exists.
 *
 * A plain list of questions split by thin rules, in a centred column. All
 * questions start closed and one is open at a time; clicking the open question
 * closes it (single, collapsible — the Radix behaviour of the React original).
 * Each question is a button inside an h3, with aria-expanded and aria-controls
 * pointing at its answer panel; the panel opens by animating its grid row from
 * 0fr to 1fr, and closed panels are inert. The heading's words arrive one by
 * one out of a blur (SectionHeader wordReveal). Answers keep their line breaks.
 */
export default function Faq() {
  const ref = useRef(null)
  useReveal(ref)
  const [open, setOpen] = useState(null)

  if (!faqs.length) return null

  return (
    <section ref={ref} aria-labelledby="faq-title" className="bg-white px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeader
          id="faq-title"
          eyebrow="FAQ"
          title="Questions people ask us"
          intro="Answers to the things people ask us most about our courses and how to join."
          wordReveal
        />

        <ul className="mx-auto mt-12 max-w-3xl sm:mt-14">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <li key={i} data-reveal className="border-b border-deep-navy/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-controls={`faq-panel-${i}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="focus-ring group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-space-grotesk font-bold text-deep-navy"
                  >
                    <span className="text-lg leading-tight underline-offset-4 group-hover:underline sm:text-xl">{faq.question}</span>
                    <svg
                      className={`size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[0.9375rem] leading-relaxed text-deep-navy/80 sm:text-base">
                      {faq.answer.split('\n').map((line, li) => (
                        <Fragment key={li}>
                          {li > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
