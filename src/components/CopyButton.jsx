import { useEffect, useRef, useState } from 'react'

/**
 * Icon button that copies `value` to the clipboard. The copy icon swaps to a
 * vibrant-blue check for 1.5s, and a polite live region says "Copied" so
 * screen readers hear it too. If the browser refuses clipboard access, nothing
 * changes (no error). Ported from templates/components/copy-button.html.
 *
 * Usage: <CopyButton value={email} label="Copy email address" />
 */
export default function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = () => {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-ring relative inline-flex size-10 shrink-0 items-center justify-center rounded-md text-deep-navy/70 transition-colors hover:bg-ice-blue hover:text-vibrant-blue"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute size-4 text-vibrant-blue transition-all ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute size-4 transition-all ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" />
        <path d="M4 16c0-1.1.9-2 2-2h2" />
        <path d="M4 8c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2" />
      </svg>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  )
}
