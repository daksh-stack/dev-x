import { Link } from 'react-router-dom'

/**
 * Breadcrumb trail, e.g. Programs > Backend Development (a plain > between
 * steps, the current page highlighted, no Home step since the navbar already
 * has it). Ported from templates/components/breadcrumb.html.
 *
 * `crumbs` is a list of { label, url }; the last one has no url, because it is
 * the page you're on, so it renders as text with aria-current="page".
 * `centered` centres the trail, as under the page-hero title.
 */
export default function Breadcrumb({ crumbs, centered = false }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base${centered ? ' justify-center' : ''}`}>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-deep-navy/40">
                &gt;
              </span>
            )}
            {crumb.url ? (
              <Link
                to={crumb.url}
                className="focus-ring inline-flex min-h-6 items-center rounded-sm text-deep-navy/70 transition-colors hover:text-vibrant-blue"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-vibrant-blue">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
