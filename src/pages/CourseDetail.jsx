import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArrowFillButton from '../components/ArrowFillButton'
import PageHero from '../components/PageHero'
import useReveal from '../hooks/useReveal'
import { descriptionParagraphs, enrolUrl, findCourse } from '../data/site'

/**
 * One curriculum module: a card whose header button shows or hides its
 * lessons. Every module is on its own and all start closed — the FAQ's
 * accordion pattern (aria-expanded / aria-controls, the panel's grid row
 * animating 0fr to 1fr, closed panels inert).
 */
function ModuleCard({ module, index }) {
  const [open, setOpen] = useState(false)
  const lessons = module.lessons || []
  const hasLessons = lessons.length > 0

  return (
    <li data-reveal className="rounded-2xl border border-deep-navy/10">
      <h3>
        <button
          type="button"
          id={`module-button-${index}`}
          aria-controls={`module-panel-${index}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl p-4 text-left sm:p-6"
        >
          <span>
            <span className="block font-space-grotesk text-lg leading-tight font-bold text-deep-navy underline-offset-4 group-hover:underline sm:text-xl">
              Module {index + 1}: {module.title}
            </span>
            {(hasLessons || module.duration) && (
              <span className="mt-1.5 block text-xs font-semibold tracking-widest text-deep-navy/70 uppercase">
                {hasLessons && `${lessons.length} lesson${lessons.length === 1 ? '' : 's'}`}
                {hasLessons && module.duration ? ' · ' : ''}
                {module.duration}
              </span>
            )}
          </span>
          {hasLessons && (
            <svg
              className={`size-4 shrink-0 text-deep-navy transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </button>
      </h3>
      {hasLessons && (
        <div
          id={`module-panel-${index}`}
          role="region"
          aria-labelledby={`module-button-${index}`}
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2 px-4 pb-4 sm:px-6 sm:pb-6">
              {lessons.map((lesson, li) => (
                <li key={li} className="rounded-lg bg-ice-blue/60 px-4 py-3 text-[0.9375rem] text-deep-navy sm:text-base">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}

/**
 * One course at /programs/<slug>/: photo, write-up, curriculum, and a sidebar
 * to enrol. Ported from templates/pages/course-detail.html.
 *
 * Everything comes from the course data; each part hides while it's empty.
 * Layout: one column on phones in the order photo, sidebar, write-up. From lg
 * a two-column grid: photo and write-up stack in the left column and the
 * sidebar spans both rows, sticking below the navbar.
 *
 * Each block blur-rises as it scrolls into view (useReveal). The Enrol card
 * ends the write-up, after the curriculum; its button opens WhatsApp in a new
 * tab with a message naming the course, and is hidden without a number.
 */
export default function CourseDetail() {
  const { slug } = useParams()
  const course = findCourse(slug)
  const ref = useRef(null)
  useReveal(ref)

  if (!course) {
    return (
      <>
        <PageHero title="Course not found" />
        <p className="mx-auto max-w-3xl px-8 pb-24 text-base leading-relaxed text-deep-navy/80 sm:text-lg">
          We couldn't find that course. It may have moved — the full list is on the Programs page.
        </p>
      </>
    )
  }

  const breadcrumbs = [{ label: 'Programs', url: '/programs' }, { label: course.name }]
  const enrol = enrolUrl(course)
  const outcomes = course.learningOutcomes || []
  const modules = course.modules || []
  const details = course.details || []
  const hasSidebar = course.duration || details.length > 0

  return (
    <>
      <PageHero title={course.name} crumbs={breadcrumbs} />

      <div ref={ref} className="px-8 pt-4 pb-20 sm:pt-8 sm:pb-24">
        <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_24rem]">
          {course.photo ? (
            <div data-reveal className="isolate overflow-hidden rounded-2xl lg:col-start-1">
              <img
                src={course.photo}
                alt={course.photoAlt}
                decoding="async"
                className="aspect-3/2 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform lg:aspect-16/9 motion-safe:hover:scale-108"
              />
            </div>
          ) : (
            <div data-reveal aria-hidden="true" className="flex aspect-3/2 w-full items-center justify-center rounded-2xl bg-ice-blue lg:col-start-1 lg:aspect-16/9">
              <img src="/images/logo-mark.svg" alt="" className="size-20 opacity-40" />
            </div>
          )}

          {hasSidebar && (
            <aside aria-label="Course summary" className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
              <section data-reveal aria-labelledby="includes-title" className="rounded-2xl border border-deep-navy/10 bg-white p-5 shadow-lg shadow-black/5 sm:p-6">
                <h2 id="includes-title" className="text-lg leading-tight font-bold text-deep-navy sm:text-xl">
                  Course includes
                </h2>
                <dl className="mt-3 divide-y divide-deep-navy/10 text-[0.9375rem] sm:text-base">
                  {course.duration && (
                    <div className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-deep-navy/70">Duration</dt>
                      <dd className="text-right font-medium text-deep-navy">{course.duration}</dd>
                    </div>
                  )}
                  {details.map((detail, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-deep-navy/70">{detail.label}</dt>
                      <dd className="text-right font-medium text-deep-navy">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </aside>
          )}

          <div className="space-y-12 lg:col-start-1">
            {course.description && (
              <div data-reveal className="space-y-4 text-base leading-relaxed text-deep-navy/80 sm:text-lg">
                {descriptionParagraphs(course).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {outcomes.length > 0 && (
              <section aria-labelledby="learn-title">
                <h2 id="learn-title" data-reveal className="text-[1.75rem] leading-[1.2] font-bold tracking-tight text-deep-navy sm:text-4xl">
                  What you'll learn
                </h2>
                <ul className="mt-5 space-y-3 text-base leading-relaxed text-deep-navy/80 sm:text-lg">
                  {outcomes.map((outcome, i) => (
                    <li key={i} data-reveal className="flex gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                        className="mt-1 size-5 shrink-0 text-vibrant-blue"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {modules.length > 0 && (
              <section aria-labelledby="curriculum-title">
                <h2 id="curriculum-title" data-reveal className="text-[1.75rem] leading-[1.2] font-bold tracking-tight text-deep-navy sm:text-4xl">
                  Course curriculum
                </h2>
                <ol className="mt-5 space-y-5">
                  {modules.map((module, i) => (
                    <ModuleCard key={i} module={module} index={i} />
                  ))}
                </ol>
              </section>
            )}

            {enrol && (
              <section data-reveal aria-labelledby="enrol-title" className="rounded-2xl border border-deep-navy/10 bg-white p-5 shadow-lg shadow-black/5 sm:p-6">
                <h2 id="enrol-title" className="text-lg leading-tight font-bold text-deep-navy sm:text-xl">
                  Ready to start?
                </h2>
                <div className="mt-4">
                  <ArrowFillButton
                    label="Enroll now"
                    url={enrol}
                    newTab
                    ariaLabel={`Enroll now in ${course.name} on WhatsApp (opens in a new tab)`}
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
