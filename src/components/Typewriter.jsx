import { useEffect, useRef } from 'react'

/**
 * Typewriter word rotation (used in Hero.jsx).
 * Ported 1:1 from static/js/typewriter.js (Alpine original) to React.
 *
 * Loop: the word stays → pause → it's deleted letter by letter → the next word
 * is typed → … Each letter fades (with a slight blur) in or out rather than
 * popping. The loop waits while the element is scrolled out of view or the tab
 * is hidden, and never starts for visitors who ask for reduced motion.
 *
 * Width: by default the box follows each word's width. With fixedWidth it
 * always keeps the widest word's width, so surrounding text wraps the same way
 * whichever word is showing.
 *
 * Screen readers always get the first word (rendered in the .sr-only span);
 * the animated word is aria-hidden — same approach as the original.
 *
 * Usage: <Typewriter words={["Confidence.", "Projects.", "Careers."]}
 *          options={{ startDelay: 720, repeatDelay: 2000, fixedWidth: true }} />
 */
export default function Typewriter({ words, options = {} }) {
  const rootRef = useRef(null)
  const wordRef = useRef(null)

  const startDelay = options.startDelay ?? 0
  const repeatDelay = options.repeatDelay ?? 2000
  const typeSpeed = options.typeSpeed ?? 70
  const deleteSpeed = options.deleteSpeed ?? 40
  const fixedWidth = options.fixedWidth ?? false

  useEffect(() => {
    const root = rootRef.current
    const wordEl = wordRef.current
    if (!root || !wordEl) return
    if (words.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let index = 0
    let widths = []
    let inView = false
    let waiters = []

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const active = () => inView && !document.hidden
    const whenActive = () =>
      active() ? Promise.resolve() : new Promise((resolve) => waiters.push(resolve))
    const update = () => {
      if (active()) waiters.splice(0).forEach((resolve) => resolve())
    }

    const applyWidth = () => {
      if (!widths.length) return
      const width = fixedWidth ? Math.max(...widths) : widths[index]
      if (width) root.style.width = `${width}px`
    }

    // Width of every word, from an invisible copy of the word element (same font)
    const measure = () => {
      if (!root.parentElement) return
      const ghost = wordEl.cloneNode()
      Object.assign(ghost.style, {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        width: 'auto',
      })
      root.parentElement.appendChild(ghost)
      widths = words.map((word) => {
        ghost.textContent = word
        return ghost.getBoundingClientRect().width
      })
      ghost.remove()
      applyWidth()
    }

    const letter = (character) => {
      const el = document.createElement('span')
      el.textContent = character
      return el
    }

    // Fade the letters out from the end. Each one is removed once its own fade is done.
    const erase = async () => {
      const text = wordEl.textContent.replace('​', '')
      const letters = [...text].map((character) => letter(character))
      // The zero-width space keeps the line's height and baseline while the word is empty
      wordEl.replaceChildren('​', ...letters)
      for (const l of [...letters].reverse()) {
        if (cancelled) return
        await whenActive()
        l.animate(
          [
            { opacity: 1, filter: 'blur(0)' },
            { opacity: 0, filter: 'blur(4px)' },
          ],
          { duration: 160, easing: 'ease-in', fill: 'forwards' },
        ).finished.then(
          () => l.remove(),
          () => {},
        )
        await wait(deleteSpeed)
      }
      await wait(160)
    }

    // Add the letters one by one, each fading in from a slight blur
    const type = async (text) => {
      for (const character of text) {
        if (cancelled) return
        await whenActive()
        const l = letter(character)
        wordEl.append(l)
        l.animate(
          [
            { opacity: 0, filter: 'blur(4px)' },
            { opacity: 1, filter: 'blur(0)' },
          ],
          { duration: 220, easing: 'ease-out', fill: 'backwards' },
        )
        await wait(typeSpeed)
      }
    }

    // The word on the page is already the first one, so the loop starts by resting on it
    const loop = async () => {
      await wait(startDelay)
      for (;;) {
        if (cancelled) return
        await wait(repeatDelay)
        await erase()
        if (cancelled) return
        await wait(250)
        index = (index + 1) % words.length
        applyWidth()
        await type(words[index])
      }
    }

    measure()
    document.fonts?.ready.then(() => {
      if (!cancelled) measure()
    })

    const resizeObserver = new ResizeObserver(() => measure())
    if (root.parentElement) resizeObserver.observe(root.parentElement)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    intersectionObserver.observe(root)

    const onVisibilityChange = () => update()
    document.addEventListener('visibilitychange', onVisibilityChange)

    loop()

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      waiters = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span ref={rootRef} data-scroll-whole className="inline-block">
      <span className="sr-only">{words[0]}</span>
      <span ref={wordRef} aria-hidden="true" className="inline-block whitespace-nowrap text-spring-green">
        {words[0]}
      </span>
    </span>
  )
}
