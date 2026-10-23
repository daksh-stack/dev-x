import { useEffect } from 'react'

/**
 * Blur-rise reveal for sections — ported from static/js/reveal.js (Alpine).
 *
 * Every [data-reveal] element inside the root fades up out of a soft blur as it
 * comes into view, in the same style as the hero headline. Each element is
 * watched on its own, so a tall stack of cards on a phone arrives card by card;
 * elements that come into view together are staggered 100ms apart in page
 * order. It plays once per element. For visitors who ask for reduced motion,
 * everything is simply shown. Styles live in index.css.
 *
 * Content is ALWAYS visible — the hidden state is never applied so elements
 * on screen at load are immediately readable. The animation is progressive
 * enhancement only: elements that scroll in from below still get the reveal.
 *
 * Put data-reveal on a wrapper rather than on something with its own translate
 * or transition (a hover lift, say), since the reveal sets both.
 *
 * Usage:
 *   const ref = useRef(null)
 *   useReveal(ref)
 *   <section ref={ref} …>
 *     <h2 data-reveal>…</h2>
 *   </section>
 */
export default function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || root.dataset.revealBound) return
    root.dataset.revealBound = 'true'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = root.querySelectorAll('[data-reveal]')
    if (!items.length) return

    const revealItem = (item, n) => {
      item.style.setProperty('--reveal-delay', `${n * 100}ms`)
      item.dataset.reveal = 'shown'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((item, n) => {
            revealItem(item, n)
            observer.unobserve(item)
          })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      // If already in viewport (or above), reveal immediately without animation
      if (rect.top < window.innerHeight) {
        revealItem(item, 0)
      } else {
        // Below the fold — observe and animate in when it scrolls into view
        observer.observe(item)
      }
    })

    return () => observer.disconnect()
  }, [rootRef])
}
