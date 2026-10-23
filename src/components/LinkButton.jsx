import { Link } from 'react-router-dom'

/**
 * Text link with an arrow. On hover (and keyboard focus) the colour shifts, an
 * underline wipes in from the left, and the arrow tilts up 45°. Touch screens
 * have no hover, so there the underline is always shown to mark it as a link.
 * Ported 1:1 from templates/components/link-button.html (Django original).
 *
 * Colours:
 *   default   vibrant-blue, deep-navy on hover — for light backgrounds.
 *   dark      white (ice-blue on hover, white focus ring) — for dark
 *             backgrounds, like the home hero. Vibrant-blue on deep-navy is
 *             only ~2.7:1, so it can't be used there.
 *
 * Props:
 *   label, url          as expected; internal paths render as Router <Link>
 *   dark                dark-background colours
 *   small               text-sm with a smaller arrow, for tighter spots
 *   ariaLabel           optional accessible name when the label is vague alone
 */
export default function LinkButton({ label, url, dark = false, small = false, ariaLabel }) {
  const className = `focus-ring group inline-flex w-fit items-center gap-2 rounded-sm font-normal transition-colors duration-300 motion-reduce:transition-none ${
    small ? 'text-sm' : 'text-xl'
  } ${
    dark
      ? 'text-white hover:text-ice-blue focus-visible:text-ice-blue focus-visible:outline-white'
      : 'text-vibrant-blue hover:text-deep-navy focus-visible:text-deep-navy'
  }`

  const inner = (
    <>
      <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-(--underline-height) after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-(--link-duration) after:ease-[cubic-bezier(0.62,0.05,0.01,0.99)] after:content-[''] group-hover:after:origin-left group-hover:after:scale-x-100 group-focus-visible:after:origin-left group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none [@media(hover:none)]:after:scale-x-100">
        {label}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={`${small ? 'size-4' : 'size-5'} transition-transform duration-(--link-duration) group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none`}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </>
  )

  const style = { '--underline-height': '2px', '--link-duration': '500ms' }
  if (url && url.startsWith('/')) {
    return (
      <Link to={url} style={style} className={className} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={url} style={style} className={className} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
      {inner}
    </a>
  )
}
