import { useEffect, useRef } from 'react'

/**
 * Scroll text reveal — ported from static/js/scroll-text.js (Alpine).
 *
 * When the text comes into view, its words come in one after another, fading up
 * out of a blur. It plays once. The words are wrapped where they are, so the
 * heading reads the same to screen readers. A nested element marked
 * data-scroll-whole (the hero's typewriter word) moves as one piece.
 * Without JS, or for visitors who ask for reduced motion, the text is simply
 * shown. Styles live in index.css.
 *
 * Text is ALWAYS visible — no hidden phase is applied. Elements already on
 * screen when the component mounts animate in immediately; elements below the
 * fold animate in when they scroll into view.
 *
 * Usage: <ScrollText as="h2" delay={150} cloak>Have questions?</ScrollText>
 *   delay  ms before the first word starts (default 0)
 *   cloak  kept for API compatibility but no longer hides text on load
 */
export default function ScrollText({ as: Tag = 'span', delay = 0, cloak = false, children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.dataset.scrollTextSplit) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.dataset.scrollTextSplit = 'true'

    let index = 0
    const piece = (span, text) => {
      span.classList.add('scroll-text-piece')
      span.style.setProperty('--i', index++)
      if (text) span.textContent = text
      return span
    }

    // Wraps each word in a .scroll-text-piece numbered in reading order (--i), keeping the spaces between
    const split = (parent) => {
      ;[...parent.childNodes].forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.replaceWith(
            ...node.textContent
              .split(/(\s+)/)
              .filter(Boolean)
              .map((part) => (/^\s+$/.test(part) ? part : piece(document.createElement('span'), part))),
          )
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.hasAttribute('data-scroll-whole')) piece(node)
          else split(node)
        }
      })
    }

    split(el)
    el.style.setProperty('--scroll-text-delay', `${delay}ms`)
    // Remove cloak attribute immediately — text must always be visible
    el.removeAttribute('data-scroll-text-cloak')

    const reveal = () => {
      el.dataset.scrollText = 'shown'
    }

    const rect = el.getBoundingClientRect()
    // Already in viewport — reveal immediately
    if (rect.top < window.innerHeight) {
      reveal()
      return
    }

    // Below the fold — animate in when it scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        reveal()
        observer.disconnect()
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
