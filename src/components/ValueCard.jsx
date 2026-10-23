/**
 * One card in About › "What we believe" and "Who it's for", built like home's
 * What we do cards (PinnedCard) without the pin or the dashed line: a white
 * outer note with a soft shadow, holding an ice-blue inner panel with the title
 * and the sentence. Same radii, padding, border, shadow and hover lift.
 * Ported from templates/components/value-card.html.
 *
 * The li carries the scroll reveal and the inner div the hover, because the
 * reveal sets its own translate and transition. `dark` gives the deep-navy
 * panel of What we do's Mentoring card.
 *
 * Usage: <ValueCard title="…" description="…" /> inside a reveal section's <ul>.
 */
export default function ValueCard({ title, description, dark = false }) {
  return (
    <li data-reveal className="flex">
      <div className="relative flex w-full flex-col rounded-[25px] border border-deep-navy/5 bg-white px-2 pt-8 pb-2 shadow-xl shadow-black/10 transition-transform duration-300 motion-reduce:transition-none motion-safe:hover:z-30 motion-safe:hover:scale-105 sm:pt-16">
        <div
          className={`flex min-h-40 grow flex-col justify-between gap-8 rounded-[15px] border p-[15px] sm:min-h-48 ${
            dark ? 'border-deep-navy bg-deep-navy' : 'border-deep-navy/10 bg-ice-blue'
          }`}
        >
          <h3 className={`text-lg leading-tight font-bold sm:text-xl ${dark ? 'text-white' : 'text-deep-navy'}`}>{title}</h3>
          <p className={`text-[0.9375rem] leading-relaxed sm:text-base ${dark ? 'text-white/80' : 'text-deep-navy/80'}`}>
            {description}
          </p>
        </div>
      </div>
    </li>
  )
}
