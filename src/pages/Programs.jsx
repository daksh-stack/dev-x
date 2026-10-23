import { useRef } from 'react'
import CourseCard from '../components/CourseCard'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import Testimonials from '../sections/home/Testimonials'
import useReveal from '../hooks/useReveal'
import { courses } from '../data/site'

/**
 * The Programs page: every course as a card grid, at /programs/.
 * Ported from templates/pages/courses.html.
 *
 * Opens on the photo page-hero, whose "Programs" is the page's h1, then the
 * list's section header. The grid is the same as home's preview — one column
 * on phones, two from md, three from lg — except nothing is hidden on phones.
 * The header and cards blur-rise into view on scroll. The grid section is
 * hidden entirely while there are no courses. The home testimonials section
 * is reused underneath, as in the original.
 */
export default function Programs() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <>
      <PageHero
        title="Programs"
        image="/images/page-hero-laptop-typing-1200.webp"
        imageSmall="/images/page-hero-laptop-typing-800.webp"
        imagePosition="object-[50%_55%]"
        imageAlt="Hands in a suit sleeve typing on a laptop at a desk"
      />

      {courses.length > 0 && (
        <section ref={ref} aria-labelledby="programs-list-title" className="px-8 py-20 sm:py-24">
          <div className="mx-auto max-w-[90rem]">
            <SectionHeader
              id="programs-list-title"
              eyebrow="Courses"
              title="Learn the skills tech employers are hiring for"
              intro="Every course is practical and mentor-led, taking you from beginner to job-ready through real projects you can show employers."
            />
            <ul className="-mx-4 mt-12 grid gap-6 sm:mx-auto sm:mt-16 sm:max-w-sm md:max-w-none md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {courses.map((course) => (
                <li key={course.slug} data-reveal>
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Testimonials />
    </>
  )
}
