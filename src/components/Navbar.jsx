import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ArrowFillButton from './ArrowFillButton'
import MenuToggleIcon from './MenuToggleIcon'

const ROUTES = [
  { name: 'home', label: 'Home', path: '/' },
  { name: 'about', label: 'About', path: '/about' },
  { name: 'programs', label: 'Programs', path: '/programs' },
  { name: 'contact', label: 'Contact', path: '/contact' },
]

/**
 * Site navbar — ported from templates/partials/navbar.html + static/js/nav-pill.js.
 *
 * - `open` controls the mobile menu (below lg). It closes on Esc, on a tap
 *   outside the panel, and when the window widens to lg. Page scroll is locked
 *   while it's open.
 * - `scrolled` turns on once the page is scrolled past 16px: the bar stays on
 *   screen and the logo drops its wordmark so only the mark shows. From lg the
 *   bar also slides up into the gap above it so it sits flush with the top of
 *   the window, and its rounded corners move from the top to the bottom. The
 *   bar slides (translate) rather than the gap closing, so the header's height
 *   and the page below it never jump. Its styles hang off data-scrolled on
 *   <header> (the group-data-scrolled/nav: classes in the markup).
 * - `animating` is on only for the 400ms after `scrolled` flips, and the bar's
 *   slide and corner transitions exist only while it's on — so scrolling
 *   animates, but crossing lg snaps straight to the other shape.
 * - The home entrance: 2s after load (the last fade is done by 1.85s) the
 *   fade-in classes are stripped (here: `entranceDone`), so elements hidden on
 *   narrower windows don't fade in again when the window grows past their
 *   breakpoint.
 * - The header lets clicks through (pointer-events-none) and only the bar and
 *   the menu overlay take them.
 * - The frosted glass lives on <nav>, not <header>, on purpose: a
 *   backdrop-filter traps position:fixed children.
 * - Sliding pill: floats behind the desktop links, rests on the current page,
 *   follows hover/focus, returns on leave. Course pages mark Programs current
 *   (aria-current="true" there, "page" on the Programs list itself).
 */
export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const urlName =
    pathname === '/'
      ? 'home'
      : pathname === '/about'
        ? 'about'
        : pathname === '/contact'
          ? 'contact'
          : pathname.startsWith('/programs')
            ? 'courses'
            : ''
  const navSection = pathname.startsWith('/programs') ? 'programs' : urlName
  const currentName = navSection === 'courses' ? 'programs' : navSection
  const isHome = urlName === 'home'

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 16)
  const [animating, setAnimating] = useState(false)
  const [entranceDone, setEntranceDone] = useState(false)
  const scrolledRef = useRef(scrolled)
  const animatingTimer = useRef(null)
  const menuToggleRef = useRef(null)

  // Sliding pill state
  const [active, setActive] = useState(currentName)
  const [ready, setReady] = useState(false)
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0, shown: false, animate: false })
  const linkRefs = useRef({})
  const pillContainerRef = useRef(null)
  const activeRef = useRef(active)
  activeRef.current = active

  const move = useCallback((name, animate = true) => {
    setActive(name)
    const link = linkRefs.current[name]
    if (!link) {
      setPill((p) => ({ ...p, shown: false }))
      return
    }
    setPill((p) => ({
      x: link.offsetLeft,
      y: link.offsetTop,
      w: link.offsetWidth,
      h: link.offsetHeight,
      shown: true,
      animate: animate && p.shown,
    }))
  }, [])

  const reset = useCallback(() => {
    move(currentName)
  }, [move, currentName])

  useEffect(() => {
    move(currentName, false)
    setReady(true)
    const container = pillContainerRef.current
    if (!container) return
    const observer = new ResizeObserver(() => move(activeRef.current, false))
    observer.observe(container)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentName])

  // scrolled flips past 16px, with a 400ms animating window
  useEffect(() => {
    scrolledRef.current = scrolled
  }, [scrolled])
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 16
      if (next !== scrolledRef.current) {
        setAnimating(true)
        clearTimeout(animatingTimer.current)
        animatingTimer.current = setTimeout(() => setAnimating(false), 400)
        scrolledRef.current = next
        setScrolled(next)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(animatingTimer.current)
    }
  }, [])

  // End the home entrance after 2s so breakpoint changes don't replay fades
  useEffect(() => {
    const t = setTimeout(() => setEntranceDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    return () => document.body.classList.remove('overflow-hidden')
  }, [open ])

  // Esc closes menu and returns focus to the toggle; widening to lg closes it
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 64rem)').matches) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open ])

  // Close mobile menu on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const fadeIn = isHome && !entranceDone ? ' motion-safe:animate-fade-in' : ''
  const ariaCurrentFor = (route) => {
    if (route.name === 'programs') {
      if (urlName === 'courses') return { 'aria-current': 'page' }
      if (navSection === 'programs') return { 'aria-current': 'true' }
      return {}
    }
    return urlName === route.name ? { 'aria-current': 'page' } : {}
  }

  return (
    <header
      className="group/nav pointer-events-none sticky top-0 z-40 px-2 sm:px-6 lg:px-10 lg:pt-5"
      {...(scrolled ? { 'data-scrolled': 'true' } : {})}
      {...(animating ? { 'data-animating': 'true' } : {})}
    >
      {/* Blurs (without darkening) the page behind the open menu; tapping it closes the menu */}
      {open && (
        <div onClick={() => setOpen(false)} className="pointer-events-auto fixed inset-0 bg-white/20 backdrop-blur-md lg:hidden" />
      )}

      {/* Frosted glass card: mostly-opaque white with a strong blur and a little extra saturation */}
      <nav
        aria-label="Main"
        className={`pointer-events-auto relative mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 rounded-b-3xl bg-white/70 px-3 shadow-lg ring-1 shadow-black/8 ring-deep-navy/8 backdrop-blur-2xl backdrop-saturate-150 motion-safe:group-data-animating/nav:transition-[translate,border-radius] motion-safe:group-data-animating/nav:duration-300 motion-safe:group-data-animating/nav:ease-out sm:px-4 lg:grid lg:h-18 lg:grid-cols-[1fr_auto_1fr] lg:rounded-t-3xl lg:rounded-b-none lg:group-data-scrolled/nav:-translate-y-5 lg:group-data-scrolled/nav:rounded-t-none lg:group-data-scrolled/nav:rounded-b-3xl${fadeIn}`}
      >
        {/* Logo lockup — resize with the two values in style (official logo proportions) */}
        <Link
          to="/"
          className="focus-ring flex shrink-0 items-center justify-self-start rounded-lg"
          style={{ '--mark-height': '1.6rem', '--wordmark-height': '0.65rem' }}
        >
          <img src="/images/logo-mark.svg" alt="TechSquarers home" width="140" height="108" className="h-(--mark-height) w-auto" />
          {/* Tucked away once scrolled: narrows to nothing from the right and fades */}
          <img
            src="/images/logo-wordmark.svg"
            alt=""
            width="153"
            height="15"
            className="ml-[calc(var(--mark-height)*0.313)] h-(--wordmark-height) w-auto max-w-40 object-cover object-left transition-[max-width,opacity,margin] duration-300 ease-out motion-reduce:transition-none group-data-scrolled/nav:ml-0 group-data-scrolled/nav:max-w-0 group-data-scrolled/nav:opacity-0"
          />
        </Link>

        {/* Desktop links with sliding pill */}
        <div
          ref={pillContainerRef}
          style={{ animationDelay: '950ms' }}
          className={`relative hidden h-11 rounded-full bg-ice-blue p-1 lg:block${fadeIn}`}
          onMouseLeave={reset}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) reset()
          }}
        >
          <span
            aria-hidden="true"
            className={`absolute top-0 left-0 rounded-full bg-vibrant-blue ${!pill.shown ? 'opacity-0' : ''} ${
              pill.animate ? 'transition-all duration-300 ease-out motion-reduce:transition-none' : ''
            }`}
            style={{ translate: `${pill.x}px ${pill.y}px`, width: `${pill.w}px`, height: `${pill.h}px` }}
          />
          <ul className="flex h-full">
            {ROUTES.map((route) => {
              const isCurrent = currentName === route.name
              return (
                <li key={route.name}>
                  <Link
                    to={route.path}
                    ref={(el) => {
                      linkRefs.current[route.name] = el
                    }}
                    className={`focus-ring nav-link${!ready && isCurrent ? ' is-current' : ''} ${active === route.name ? 'text-white' : ''}`}
                    onMouseEnter={() => move(route.name)}
                    onFocus={() => move(route.name)}
                    {...ariaCurrentFor(route)}
                  >
                    {route.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <span style={{ animationDelay: '850ms' }} className={`hidden sm:block${fadeIn}`}>
            <ArrowFillButton label="Join our community" />
          </span>

          <button
            type="button"
            ref={menuToggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-menu"
            aria-expanded={open.toString()}
            className="focus-ring flex size-11 cursor-pointer items-center justify-center rounded-full text-deep-navy lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="size-7">
              <MenuToggleIcon open={open} />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl bg-white p-3 lg:hidden"
          >
            <ul>
              {ROUTES.map((route) => (
                <li key={route.name}>
                  <Link to={route.path} className="focus-ring mobile-nav-link" {...ariaCurrentFor(route)}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Phones only: the community button lives at the foot of the menu */}
            <div className="mt-2 flex justify-center border-t border-ice-blue px-3 pt-4 pb-2 sm:hidden">
              <ArrowFillButton label="Join our community" />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
