import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import useReveal from '../../hooks/useReveal'
import { testimonials } from '../../data/site'

const EXIT_MS = 240 // The old quote lifts away, then the new one is shown
const SLIDE_MS = 800 // Column slide duration; input is ignored until it ends
const CHAR_STAGGER_MS = 5 // Delay between one character and the next as the quote rises in

/** A plain, softly blurred tile filling the columns around the portraits. Decorative. */
function ReelTile() {
  return <div className="size-30 shrink-0 rounded-xl border border-deep-navy/10 bg-linear-to-b from-ice-blue to-white blur-[1px]"></div>
}

/**
 * Replaces an element's text with rising character spans, numbering the delays
 * from `start`. Returns the next free number, so the name can carry on where
 * the quote left off. The element keeps its full text in an sr-only span and
 * the character spans are aria-hidden, so screen readers read words, not letters.
 */
function splitChars(el, start) {
  const text = el.textContent.trim().replace(/\s+/g, ' ')
  let i = start

  const readable = document.createElement('span')
  readable.className = 'sr-only'
  readable.textContent = text

  const visual = document.createElement('span')
  visual.setAttribute('aria-hidden', 'true')
  const words = text.split(' ')
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'reel-word'
    for (const ch of word) {
      const charSpan = document.createElement('span')
      charSpan.className = 'reel-char'
      charSpan.style.animationDelay = `${i * CHAR_STAGGER_MS}ms`
      charSpan.textContent = ch
      wordSpan.append(charSpan)
      i++
    }
    visual.append(wordSpan)
    if (wi < words.length - 1) {
      visual.append(' ')
      i++
    }
  })

  el.replaceChildren(readable, visual)
  return i
}

/**
 * Testimonials — ported from templates/sections/home/testimonials.html +
 * static/js/testimonial-reel.js. Testimonials come from the data file in
 * order; the section is hidden until at least one exists, and the buttons are
 * hidden while there is only one.
 *
 * The card: a reel of tiles on top and the quote below, side by side from lg.
 * Prev/next or the arrow keys (with the card focused) move one testimonial.
 * The middle column holds the portraits: 3 plain tiles, then each portrait
 * with 2 plain tiles between portraits, then 3 more. The outer columns are
 * plain tiles in the same number, so they always cover the frame.
 *
 * The reel is aria-hidden: the name under each quote already says who it is.
 * Every slide sits in the same grid cell, so the area is as tall as the
 * longest quote. On a change, the old quote lifts away, then the new one
 * rises in character by character.
 */
export default function Testimonials() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)
  const rootRef = useRef(null)
  const middleRef = useRef(null)

  const count = testimonials.length
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [rising, setRising] = useState(false)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [step, setStep] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    if (!count) return
    const root = rootRef.current
    const middle = middleRef.current
    if (!root || !middle) return

    root.querySelectorAll('[data-reel-slide]').forEach((slide) => {
      let next = 0
      slide.querySelectorAll('[data-reel-text]').forEach((el) => {
        if (el.dataset.reelSplit) return
        el.dataset.reelSplit = 'true'
        next = splitChars(el, next) + 6 // A short pause between the quote and the name
      })
    })

    // One step is three tiles (a portrait and the two plain tiles after it), measured
    // rather than hardcoded so it follows the tile size set in the markup
    const tile = middle.firstElementChild
    if (tile) {
      setStep(3 * (tile.offsetHeight + parseFloat(getComputedStyle(middle).rowGap || '0')))
    }

    // Column transitions switch on after the first paint, so the reel doesn't slide in
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  if (!count) return null

  const offset = ((count - 1) / 2 - index) * step

  const go = (dir) => {
    const next = index + dir
    if (busy || next < 0 || next >= count) return
    setBusy(true)
    setIndex(next)
    setExiting(true)

    timers.current.push(
      setTimeout(() => {
        setShown(next)
        setExiting(false)
        setRising(true)
      }, EXIT_MS),
    )
    timers.current.push(setTimeout(() => setBusy(false), SLIDE_MS))
  }

  const columnTiles = (withPortraits) => {
    const tiles = []
    for (let k = 0; k < 3; k++) tiles.push(<ReelTile key={`head-${k}`} />)
    testimonials.forEach((t, i) => {
      if (withPortraits) {
        tiles.push(
          <div key={`portrait-${i}`} className="relative isolate size-30 shrink-0 overflow-hidden rounded-xl bg-ice-blue shadow-lg">
            <img
              src={t.photo}
              alt=""
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[center_30%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-safe:hover:scale-108"
            />
          </div>,
        )
      } else {
        tiles.push(<ReelTile key={`plain-${i}`} />)
      }
      if (i < testimonials.length - 1) {
        tiles.push(<ReelTile key={`gap-${i}-a`} />)
        tiles.push(<ReelTile key={`gap-${i}-b`} />)
      }
    })
    for (let k = 0; k < 3; k++) tiles.push(<ReelTile key={`tail-${k}`} />)
    return tiles
  }

  const columnClass = `flex shrink-0 flex-col gap-2 will-change-transform ${ready ? 'transition-transform duration-800 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none' : ''}`

  return (
    <section ref={sectionRef} aria-labelledby="testimonials-title" className="bg-ice-blue px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[90rem]">
        <SectionHeader
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What our learners say"
          intro="Students and graduates share what learning with TechSquarers was really like."
        />

        <div
          ref={rootRef}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              go(1)
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault()
              go(-1)
            }
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          tabIndex={0}
          data-reveal
          className="focus-ring -mx-4 mt-12 flex max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm sm:mx-auto sm:mt-14 lg:min-h-80 lg:flex-row"
        >
          {/* Reel. The mask fades all four edges; the columns overflow it and are clipped. */}
          <div
            aria-hidden="true"
            className="relative h-56 shrink-0 overflow-hidden mask-x-from-86% mask-x-to-100% mask-y-from-90% mask-y-to-100% lg:h-auto lg:w-96"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <div className={columnClass} style={{ transform: `translateY(${-offset}px)` }}>
                {columnTiles(false)}
              </div>

              <div ref={middleRef} className={columnClass} style={{ transform: `translateY(${offset}px)` }}>
                {columnTiles(true)}
              </div>

              <div className={columnClass} style={{ transform: `translateY(${-offset}px)` }}>
                {columnTiles(false)}
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 px-6 py-8 sm:px-10 lg:py-10">
            <div>
              <svg className="size-12 text-deep-navy/20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
              </svg>

              <div className="mt-3 grid" aria-live="polite">
                {testimonials.map((t, i) => (
                  <figure
                    key={i}
                    data-reel-slide
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    className={`col-start-1 row-start-1 flex flex-col gap-5 ${shown !== i ? 'invisible' : ''} ${
                      shown === i && exiting ? 'reel-exit' : ''
                    } ${shown === i && rising ? 'reel-rising' : ''}`}
                  >
                    <blockquote>
                      <p data-reel-text className="text-lg leading-snug font-medium tracking-tight text-deep-navy lg:text-xl">
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="text-sm">
                      <span data-reel-text className="block font-semibold text-deep-navy">
                        {t.name}
                      </span>
                      {t.role && (
                        <span data-reel-text className="mt-1 block text-deep-navy/70">
                          {t.role}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {count > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={index === 0}
                  aria-label="Previous testimonial"
                  className="focus-ring grid size-11 place-items-center rounded-full border border-deep-navy/20 text-deep-navy transition-[background-color,opacity] hover:enabled:bg-ice-blue disabled:opacity-40"
                >
                  <svg className="size-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7.5 2.5 3.5 6l4 3.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={index === count - 1}
                  aria-label="Next testimonial"
                  className="focus-ring grid size-11 place-items-center rounded-full border border-deep-navy/20 text-deep-navy transition-[background-color,opacity] hover:enabled:bg-ice-blue disabled:opacity-40"
                >
                  <svg className="size-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m4.5 2.5 4 3.5-4 3.5" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
