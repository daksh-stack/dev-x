import ArrowFillButton from './ArrowFillButton'
import { courseUrl } from '../data/site'

/**
 * A course card for the home "Explore our courses" grid and the Programs page:
 * a white card with the photo inset at the top, then the title and the
 * duration with a clock icon. Ported from templates/components/course-card.html.
 *
 * Photo: cropped to a fixed shape so every card lines up (3:2 on phones, 4:3
 * from sm). With no photo yet, an ice-blue panel with the logo mark stands in;
 * it is decorative (the title already names the course). The duration row is
 * hidden when it's empty.
 *
 * Card foot (mt-auto, so it lines up across a row): one Learn more button
 * opening the course page (/programs/<slug>/). Its aria-label starts with the
 * visible words and adds the course name, since the label repeats on every card.
 *
 * Hover: the photo zooms smoothly to 108% while the card is hovered or its
 * button has keyboard focus. The card is a named group (group/card) because
 * the arrow-fill-button inside is a group of its own.
 */
export default function CourseCard({ course }) {
  return (
    <article className="group/card flex h-full flex-col rounded-2xl border border-deep-navy/10 bg-white p-3 shadow-lg shadow-black/5 lg:rounded-[1.75rem] lg:p-4">
      {course.photo ? (
        <div className="isolate overflow-hidden rounded-xl">
          <img
            src={course.photo}
            alt={course.photoAlt}
            loading="lazy"
            decoding="async"
            className="aspect-3/2 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:aspect-4/3 motion-safe:group-hover/card:scale-108 motion-safe:group-focus-within/card:scale-108"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="flex aspect-3/2 w-full items-center justify-center rounded-xl bg-ice-blue sm:aspect-4/3">
          <img src="/images/logo-mark.svg" alt="" className="size-16 opacity-40" />
        </div>
      )}

      <div className="flex flex-1 flex-col px-1 pt-4 pb-1 lg:px-2 lg:pt-5">
        <h3 className="font-space-grotesk text-lg leading-tight font-bold text-deep-navy sm:text-xl">{course.name}</h3>

        {course.duration && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-deep-navy/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="size-4 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>
              <span className="sr-only">Duration: </span>
              {course.duration}
            </span>
          </p>
        )}

        <div className="mt-auto pt-5">
          <ArrowFillButton label="Learn more" url={courseUrl(course)} ariaLabel={`Learn more: ${course.name}`} />
        </div>
      </div>
    </article>
  )
}
