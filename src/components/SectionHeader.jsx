import ScrollText from './ScrollText'

/**
 * Section header: a small uppercase label, a large heading, then a short intro
 * in a narrower, softer paragraph. Used by the sections on Home, Programs and
 * About. Left-aligned on phones, centred from sm — unless align="left".
 * Ported from templates/components/section-header.html.
 *
 * Each line blur-rises into view when an ancestor carries the reveal behaviour
 * (the lines carry data-reveal; the parent section must use useReveal).
 * `wordReveal` brings the heading in word by word instead (ScrollText).
 *
 * Props: id (goes on the heading, for the section's aria-labelledby),
 * eyebrow, title, intro, align, wordReveal.
 */
export default function SectionHeader({ id, eyebrow, title, intro, align, wordReveal = false }) {
  const left = align === 'left'
  return (
    <div className={`max-w-3xl text-left ${left ? '' : 'sm:mx-auto sm:text-center'}`}>
      {eyebrow && (
        <p data-reveal className="text-sm font-semibold tracking-widest text-vibrant-blue uppercase sm:text-base">
          {eyebrow}
        </p>
      )}
      {wordReveal ? (
        <ScrollText
          as="h2"
          id={id}
          className={`${eyebrow ? 'mt-5 sm:mt-4 ' : ''}text-[1.75rem] leading-[1.2] font-bold tracking-tight text-balance text-deep-navy sm:text-4xl`}
        >
          {title}
        </ScrollText>
      ) : (
        <h2
          id={id}
          data-reveal
          className={`${eyebrow ? 'mt-5 sm:mt-4 ' : ''}text-[1.75rem] leading-[1.2] font-bold tracking-tight text-balance text-deep-navy sm:text-4xl`}
        >
          {title}
        </h2>
      )}
      {intro && (
        <p
          data-reveal
          className={`mt-5 max-w-2xl ${left ? '' : 'sm:mx-auto '}text-base leading-relaxed text-deep-navy/80 sm:mt-6 sm:text-lg`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
