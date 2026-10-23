/**
 * Animated menu icon: a hamburger that morphs into a close (X) mark.
 * Ported 1:1 from templates/components/menu-toggle-icon.html (Django original).
 * Decorative only: the surrounding <button> carries the label and aria-expanded.
 * Size and colour come from the parent (size via class, colour via currentColor).
 */
export default function MenuToggleIcon({ open }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`size-full transition-transform duration-300 ease-in-out motion-reduce:transition-none ${open ? '-rotate-45' : ''}`}
    >
      <path
        className="transition-all duration-300 ease-in-out motion-reduce:transition-none"
        style={
          open
            ? { strokeDasharray: '20 300', strokeDashoffset: '-32.42px' }
            : { strokeDasharray: '12 63' }
        }
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  )
}
