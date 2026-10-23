import { Link } from 'react-router-dom'

/**
 * Pill button with a spring-green circle at its right end. On hover the circle
 * expands to fill the pill, a second copy of the label is revealed in deep-navy
 * behind the same expanding clip, and the arrow swaps: the resting one slides
 * right and shrinks while a new one slides in from the left.
 * Ported 1:1 from templates/components/arrow-fill-button.html (Django original).
 *
 * `isolate` matters: the layers are stacked with z-10 to z-40, and a plain
 * `relative` root does not contain them — without it the white arrow circle
 * would paint over the sticky navbar on scroll.
 *
 * Props:
 *   label      visible text
 *   url        optional; without it the button renders as plain text, not a
 *              link (the "Join our community" case). Internal paths (starting
 *              with "/") render as a React Router <Link>; anything else as <a>.
 *   newTab     optional; opens in a new tab with rel="noopener"
 *   ariaLabel  optional; use it when the visible label is vague on its own,
 *              e.g. repeated on every card (start it with the visible words)
 */
export default function ArrowFillButton({ label, url, newTab = false, ariaLabel }) {
  const style = {
    '--icon-circle': '2.25rem',
    '--icon-right': '0.25rem',
    '--circle-inset-y': 'calc((100% - var(--icon-circle)) / 2)',
  }
  const className =
    'focus-ring group relative isolate inline-flex h-11 w-fit items-center justify-center overflow-hidden rounded-full border border-vibrant-blue bg-vibrant-blue ps-5 pe-[calc(var(--icon-circle)+var(--icon-right)+1.25rem)] text-sm font-normal whitespace-nowrap text-white'

  const inner = (
    <>
      <span className="relative z-10">{label}</span>

      {/* The fill. It starts as the circle's footprint and grows to the whole pill */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-20 rounded-full bg-spring-green inset-[var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle))] transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:inset-0 motion-reduce:transition-none"
      ></span>

      {/* Same label in deep-navy, clipped to the fill so it appears exactly as the fill sweeps over */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 flex items-center ps-5 pe-[calc(var(--icon-circle)+var(--icon-right)+1.25rem)] text-deep-navy [clip-path:inset(var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle)))] transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none"
      >
        <span className="whitespace-nowrap">{label}</span>
      </span>

      {/* The circle itself, always spring-green, holding the two arrows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[var(--icon-right)] z-40 inline-flex size-[var(--icon-circle)] shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-spring-green text-deep-navy"
      >
        {/* incoming arrow: waits off to the left, then slides to the middle */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          className="absolute top-1/2 left-1/2 size-4 origin-center -translate-y-1/2 translate-x-[-170%] scale-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:-translate-x-1/2 group-hover:scale-100 motion-reduce:transition-none"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        {/* resting arrow: leaves to the right */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          className="absolute top-1/2 left-1/2 size-4 origin-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:translate-x-[70%] group-hover:scale-0 motion-reduce:transition-none"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </>
  )

  if (!url) {
    return (
      <a style={style} className={className} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
        {inner}
      </a>
    )
  }
  if (url.startsWith('/') && !newTab) {
    return (
      <Link to={url} style={style} className={className} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
        {inner}
      </Link>
    )
  }
  return (
    <a
      href={url}
      style={style}
      className={className}
      {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {inner}
    </a>
  )
}
