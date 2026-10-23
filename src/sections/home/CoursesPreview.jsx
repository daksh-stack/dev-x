import { useRef } from 'react'
import CourseCard from '../../components/CourseCard'
import LinkButton from '../../components/LinkButton'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'
import { courses } from '../../data/site'

/**
 * "Explore our courses" — a preview of the first six courses, with a link to
 * the full list on the Programs page. Hidden entirely until at least one
 * course exists (same rule as the Django original).
 * Ported from templates/sections/home/courses.html.
 *
 * Grid: one column on phones, two from md, three from lg. On phones only the
 * first three cards show; the rest hide below md so the section stays short.
 * Scrolling in, the heading, intro, each card and the link blur-rise into view.
 */
export default function CoursesPreview() {
  const ref = useRef(null)
  useReveal(ref)

  if (!courses.length) return null
  const preview = courses.slice(0, 6)

  return (
    <section ref={ref} aria-labelledby="courses-title" className="bg-ice-blue px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeader
          id="courses-title"
          eyebrow="Courses"
          title="Explore our courses"
          intro="Practical, mentor-led courses that take you from beginner to job-ready, and open doors to employment, entrepreneurship and innovation."
        />

        <ul className="-mx-4 mt-12 grid gap-6 sm:mx-auto sm:mt-14 sm:max-w-sm md:max-w-none md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {preview.map((course, i) => (
            <li key={course.slug} data-reveal className={i > 2 ? 'max-md:hidden' : undefined}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12 flex justify-center">
          <LinkButton label="View all courses" url="/programs" />
        </div>
      </div>
    </section>
  )
}
