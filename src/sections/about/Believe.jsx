import { useRef } from 'react'
import SectionHeader from '../../components/SectionHeader'
import ValueCard from '../../components/ValueCard'
import useReveal from '../../hooks/useReveal'

const VALUES = [
  { title: 'Active learning', description: 'Learning should be active, not passive.' },
  { title: 'Feedback first', description: 'Feedback and accountability matter more than more content.' },
  { title: 'Real projects', description: 'Real projects beat theory every time.' },
  { title: 'Mentorship for all', description: 'Mentorship should be accessible, not reserved for the privileged few.' },
]

/**
 * About › "What we believe": a centred header, then the four values as
 * ValueCards. One column on phones, two from sm, all four in a row from lg.
 * The header and each value blur-rise into view on scroll.
 * Ported from templates/sections/about/believe.html.
 */
export default function Believe() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} aria-labelledby="believe-title" className="px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeader
          id="believe-title"
          eyebrow="What we believe"
          title="Principles over more content"
          intro="The ideas behind how we teach, mentor and build."
        />

        <ul className="-mx-4 mt-12 grid gap-4 sm:mx-0 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {VALUES.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </ul>
      </div>
    </section>
  )
}
