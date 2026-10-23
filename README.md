# TechSquarers — Official Website (React port, v2 codebase)

A 1:1 React port of the current Django website (the second, complete codebase:
Home, About, Programs, course pages and Contact — with footer, testimonials,
FAQ and CMS-style content). Same design, same copy, same behaviour — rebuilt
with React + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
npm install
npm run dev       # dev server — http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build
```

Requires Node.js 22+ (any recent LTS works).

## Where the "admin content" lives

In the Django original, courses, testimonials, FAQs and site settings
(WhatsApp number, contact email/phone, social links) are database models
edited in /admin — and the uploaded code ships no database. In this port that
content lives in **one file: `src/data/site.js`**, shaped field-for-field like
the Django models (`core/models.py`). It currently holds clearly-marked
**sample** content so the site renders in full; replace it with the real
content from your Django admin.

The original's visibility rules are preserved exactly: a block hides while
its value is empty — no WhatsApp number → Enrol buttons hidden and the footer
CTA links to Contact instead; no email/phone → those Contact boxes hidden;
no social URL → that icon hidden; no courses/testimonials/FAQs → those
sections hidden.

## Mapping: Django → React

| Original | This port |
|---|---|
| Django 6.1 + templates | React 19 + Vite 6 |
| URLs: `/`, `/about/`, `/programs/`, `/programs/<slug>/`, `/contact/` | React Router: same paths (`/programs/:slug`) |
| Tailwind CSS v4 CLI (`static/src/input.css`) | Tailwind v4 via `@tailwindcss/vite` (`src/index.css`) — palette updated: `spring-green` #13F8C0, `sunrise-orange` #FDBA74 |
| Alpine `nav-pill.js` | Pill logic in `src/components/Navbar.jsx` (+ new scrolled-state bar: wordmark tucks away, bar slides flush) |
| Alpine `typewriter.js` | `src/components/Typewriter.jsx` |
| Alpine `pinned-path.js` | Effect in `src/sections/home/WhatWeDo.jsx` |
| Alpine `reveal.js` | `src/hooks/useReveal.js` — blur-rise on scroll for `[data-reveal]` |
| Alpine `scroll-text.js` | `src/components/ScrollText.jsx` — word-by-word blur reveal for headlines |
| Alpine `testimonial-reel.js` | State + effects in `src/sections/home/Testimonials.jsx` |
| htmx | Not needed — the site makes no backend calls |
| Models + /admin | `src/data/site.js` (see above) |
| WhiteNoise / Pillow / media uploads | Course & testimonial photos are plain paths in the data file (`/images/…` in `public/`) |

## Project structure

```
src/
  main.jsx, App.jsx        Entry + base layout (skip link, navbar, footer*)
  index.css                Brand palette, fonts, reel/scroll-text/reveal styles
  data/site.js             ALL editable content (settings, courses, testimonials, FAQs)
  hooks/useReveal.js       Scroll blur-rise behaviour
  components/
    Navbar.jsx  Footer.jsx  PageHero.jsx  SectionHeader.jsx  Breadcrumb.jsx
    ArrowFillButton.jsx  LinkButton.jsx  CourseCard.jsx  PinnedCard.jsx
    ValueCard.jsx  CopyButton.jsx  SocialIcon.jsx  MenuToggleIcon.jsx
    ScrollText.jsx  Typewriter.jsx
  sections/
    home/     Hero, WhatWeDo, CoursesPreview, WhyChooseUs, Testimonials, Faq
    about/    Story, Mission, Believe, Audience
    contact/  Details
  pages/
    Home.jsx  About.jsx  Programs.jsx  CourseDetail.jsx  Contact.jsx
public/
  fonts/    Inter + Space Grotesk (woff2, self-hosted)
  images/   All site photos (WebP), logo, favicon
```

\* The footer (with its closing CTA) appears on every page **except Contact**,
exactly as in the original.

## What's built

- **Home:** new hero (mentor photo, word-by-word headline, rotating
  Confidence / Projects / Careers), What we do (pinned cards + dashed line),
  Explore our courses (first 6, first 3 only on phones), Why choose us
  (accordion, one always open), Testimonials (sliding reel + character-rise
  quotes, arrow-key support), FAQ (single collapsible accordion).
- **About:** photo page-hero, Our story, Our mission, What we believe,
  Who it's for.
- **Programs:** photo page-hero, full course grid, testimonials underneath.
- **Course page** (`/programs/<slug>/`): light page-hero with breadcrumb,
  photo, sticky "Course includes" sidebar, description, What you'll learn,
  collapsible curriculum modules, WhatsApp Enrol card (when a number is set).
- **Contact:** no banner, no footer; email/phone boxes with copy buttons and
  "Find us online", all settings-driven.

## Known limitations (carried over from the original, documented there too)

- The hero's rotating word and the dashed-line flow are continuous animations
  with no pause button, so they miss WCAG 2.2.2 (Pause, Stop, Hide). Both
  respect `prefers-reduced-motion`.
