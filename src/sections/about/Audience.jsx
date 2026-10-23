import { useRef } from 'react'
import SectionHeader from '../../components/SectionHeader'
import ValueCard from '../../components/ValueCard'
import useReveal from '../../hooks/useReveal'

const AUDIENCES = [
  { title: 'Students', description: 'Students who want more than just theory.' },
  { title: 'Career switchers', description: 'Career switchers looking for a practical path into tech.' },
  { title: 'Self-taught learners', description: 'Self-taught learners stuck in tutorial loops.' },
  { title: 'Anyone serious about tech', description: 'Anyone serious about building a job-ready career in tech.' },
]

/**
 * About › "Who it's for": the header on the left, the four audiences in a 2×2
 * grid on the right — ValueCards with the dark (deep-navy) panel. On ice-blue,
 * so the About page alternates white and ice-blue sections. The header is
 * left-aligned at every width because it sits beside the grid.
 * Ported from templates/sections/about/audience.html.
 */
export default function Audience() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} aria-labelledby="audience-title" className="bg-ice-blue px-8 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeader
            id="audience-title"
            align="left"
            eyebrow="Who it's for"
            title="For people who are serious about becoming better"
            intro="If you want structure, real practice and people who hold you accountable, you're in the right place."
          />
        </div>

        <ul className="-mx-4 grid gap-4 sm:mx-0 sm:grid-cols-2 lg:w-full lg:max-w-lg lg:justify-self-end lg:gap-5">
          {AUDIENCES.map((audience) => (
            <ValueCard key={audience.title} {...audience} dark />
          ))}
        </ul>
      </div>
    </section>
  )
}
