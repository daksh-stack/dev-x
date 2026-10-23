/**
 * Site content — the React equivalent of the Django original's database + /admin.
 *
 * In the Django site, SiteSettings, Course, Testimonial and FAQ are models edited
 * in /admin (see core/models.py in the original). The uploaded Django codebase
 * ships NO database, so on a fresh install every list below would be empty and
 * every settings-driven block hidden — the templates are built that way on
 * purpose ("each part is hidden on the site while it's empty").
 *
 * This file mirrors those models field for field. The entries here are SAMPLE
 * content (marked as such) so the ported site renders in full, exactly as the
 * live site does once its admin is filled in. Replace them with the real
 * content from your Django admin — the shapes must stay the same:
 *
 *   Course:      { name, slug, photo (path under /images or ''), photoAlt,
 *                  duration, description (paragraphs split by a blank line),
 *                  learningOutcomes: [line, …],
 *                  details: [{ label, value }],            // "Course includes" rows
 *                  modules: [{ title, duration, lessons: [line, …] }] }
 *                Order in the array = the models' `order`. Home shows the first 6.
 *   Testimonial: { quote, name, role, photo }
 *   FAQ:         { question, answer }  (line breaks in answer are kept)
 *
 * Settings-driven blocks hide exactly like the original when a value is '':
 * no WhatsApp number → Enrol buttons hidden and the footer CTA links to Contact;
 * no email/phone → those Contact boxes hidden; no social URL → that icon hidden.
 */

const quote = (text) => encodeURIComponent(text)

// ---------------------------------------------------------------------------
// Site settings (Django: SiteSettings, a single row)
// ---------------------------------------------------------------------------

export const siteSettings = {
  // SAMPLE — full international number, digits only (country code first, no +).
  whatsappNumber: '',
  // SAMPLE — the example address used in the Django model's own help text.
  email: 'hello@techsquarers.com',
  // SAMPLE — as written, starting with + and the country code. '' hides the box.
  phoneNumber: '',
  // SAMPLE social links — each icon shows only once its address is filled in.
  linkedinUrl: '',
  instagramUrl: 'https://www.instagram.com/techsquarers',
  xUrl: '',
  facebookUrl: '',
  youtubeUrl: '',
}

/** A wa.me link for general questions (the footer CTA), or '' if no number is set. */
export function whatsappChatUrl(settings = siteSettings) {
  if (!settings.whatsappNumber) return ''
  const message = "Hi, I have a question about TechSquarers' courses."
  return `https://wa.me/${settings.whatsappNumber}?text=${quote(message)}`
}

/** A tel: link for the phone number (spaces removed), or '' if none is set. */
export function phoneHref(settings = siteSettings) {
  return settings.phoneNumber ? `tel:${settings.phoneNumber.replace(/ /g, '')}` : ''
}

/** The filled-in social links, in footer order, as { icon, label, url }. */
export function socialLinks(settings = siteSettings) {
  const links = [
    { icon: 'linkedin', label: 'LinkedIn', url: settings.linkedinUrl },
    { icon: 'instagram', label: 'Instagram', url: settings.instagramUrl },
    { icon: 'x', label: 'X', url: settings.xUrl },
    { icon: 'facebook', label: 'Facebook', url: settings.facebookUrl },
    { icon: 'youtube', label: 'YouTube', url: settings.youtubeUrl },
  ]
  return links.filter((link) => link.url)
}

// ---------------------------------------------------------------------------
// Courses (Django: Course + CourseDetail + CourseModule)
// ---------------------------------------------------------------------------

// SAMPLE courses. Photos are '' — the cards and course pages then show the
// ice-blue logo-mark panel, exactly as the Django site does before a photo is
// uploaded in admin. Set photo to a path like '/images/my-course.webp' (and a
// real photoAlt) to use a picture.
export const courses = [
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    photo: '',
    photoAlt: '',
    duration: '12 weeks',
    description:
      'Learn to design digital products people love to use, from first research and wireframes to polished, developer-ready interfaces.\n\nYou will work on real briefs throughout, building a portfolio of case studies that show your process, not just pretty screens.',
    learningOutcomes: [
      'How design thinking and user research work in practice',
      'Wireframing and prototyping in Figma',
      'Visual design: layout, typography and colour',
      'Usability testing and iterating on feedback',
      'Handing designs off to developers',
    ],
    details: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Format', value: 'Online' },
      { label: 'Certificate', value: 'Yes' },
    ],
    modules: [
      {
        title: 'Foundations of UI/UX design',
        duration: '2 weeks',
        lessons: ['What UI/UX designers actually do', 'The design process end to end', 'Talking to users: research basics'],
      },
      {
        title: 'Designing the interface',
        duration: '4 weeks',
        lessons: ['Wireframes and user flows', 'Layout, typography and colour', 'Components and design systems in Figma'],
      },
      {
        title: 'Portfolio project',
        duration: '6 weeks',
        lessons: ['Picking and scoping a brief', 'Prototyping and usability testing', 'Presenting your case study'],
      },
    ],
  },
  {
    name: 'Frontend Development',
    slug: 'frontend-development',
    photo: '',
    photoAlt: '',
    duration: '16 weeks',
    description:
      'Go from your first HTML page to building complete, responsive websites and web apps with modern JavaScript and React.\n\nEvery topic is practised on real projects, so you finish with work you can show employers.',
    learningOutcomes: [
      'HTML and CSS, including responsive layouts',
      'JavaScript fundamentals and the DOM',
      'Building interfaces with React',
      'Working with APIs and real data',
      'Git, GitHub and deploying your work',
    ],
    details: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Format', value: 'Online' },
      { label: 'Certificate', value: 'Yes' },
    ],
    modules: [
      {
        title: 'Web foundations',
        duration: '4 weeks',
        lessons: ['HTML structure and semantics', 'CSS styling and layouts', 'Responsive design and media queries'],
      },
      {
        title: 'JavaScript',
        duration: '6 weeks',
        lessons: ['Variables, functions and arrays', 'The DOM and events', 'Fetching data from APIs'],
      },
      {
        title: 'React and your portfolio',
        duration: '6 weeks',
        lessons: ['Components and props', 'State and hooks', 'Building and deploying your final project'],
      },
    ],
  },
  {
    name: 'Backend Development',
    slug: 'backend-development',
    photo: '',
    photoAlt: '',
    duration: '16 weeks',
    description:
      'Learn how the server side of the web works: databases, APIs and the logic behind the apps you use every day.\n\nYou will design and build real backends, and deploy them so anyone can use what you made.',
    learningOutcomes: [
      'How servers, databases and APIs fit together',
      'Building APIs with Python and Django',
      'Designing database schemas',
      'Authentication and security basics',
      'Testing and deploying a backend',
    ],
    details: [
      { label: 'Level', value: 'Intermediate' },
      { label: 'Format', value: 'Online' },
      { label: 'Certificate', value: 'Yes' },
    ],
    modules: [
      {
        title: 'Servers and databases',
        duration: '4 weeks',
        lessons: ['How the web works behind the scenes', 'SQL and relational databases', 'Designing your first schema'],
      },
      {
        title: 'Building APIs with Django',
        duration: '8 weeks',
        lessons: ['Models, views and URLs', 'REST APIs and serialisation', 'Authentication and permissions'],
      },
      {
        title: 'Ship it',
        duration: '4 weeks',
        lessons: ['Testing your API', 'Environment and configuration', 'Deploying to production'],
      },
    ],
  },
]

export function courseUrl(course) {
  return `/programs/${course.slug}/`
}

export function findCourse(slug) {
  return courses.find((course) => course.slug === slug)
}

/** A wa.me enrol link naming this course, or '' if no WhatsApp number is set. */
export function enrolUrl(course, settings = siteSettings) {
  if (!settings.whatsappNumber) return ''
  const message = `Hi, I'd like to enrol in the ${course.name} course.`
  return `https://wa.me/${settings.whatsappNumber}?text=${quote(message)}`
}

/** The description split into paragraphs (Django's linebreaks filter). */
export function descriptionParagraphs(course) {
  return (course.description || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

// ---------------------------------------------------------------------------
// Testimonials (Django: Testimonial) — home reel + Programs page
// ---------------------------------------------------------------------------

// SAMPLE testimonials. In the Django site the photo is an admin upload; the
// photos below reuse existing site images purely as placeholders — replace
// them with the real portraits (square WebP, at least 300px wide).
export const testimonials = [
  {
    quote: 'I came in stuck in tutorial loops. The mentorship and real projects changed everything — I finished with a portfolio I was proud to show.',
    name: 'Sample Learner One',
    role: 'UI/UX graduate',
    photo: '/images/hero-mentoring-code-1000.webp',
  },
  {
    quote: 'The feedback was honest and constant. Every week I knew exactly what to fix next, and that accountability kept me going.',
    name: 'Sample Learner Two',
    role: 'Frontend Development student',
    photo: '/images/about-mission-handshake-800.webp',
  },
  {
    quote: 'Learning from people who build software for real businesses made the lessons practical in a way videos never were.',
    name: 'Sample Learner Three',
    role: 'Backend Development graduate',
    photo: '/images/why-choose-us-pointing-700.webp',
  },
]

// ---------------------------------------------------------------------------
// FAQs (Django: FAQ) — home page. All start closed; one open at a time.
// ---------------------------------------------------------------------------

// SAMPLE FAQs.
export const faqs = [
  {
    question: 'Do I need experience to join a course?',
    answer: 'No. Most of our courses are built for beginners and start from the foundations. If a course expects some background, its course page says so.',
  },
  {
    question: 'Are the classes live or recorded?',
    answer: 'Classes are live and mentor-led, with real projects and feedback throughout — not just videos to watch on your own.',
  },
  {
    question: 'Do I get a certificate?',
    answer: 'Yes. You receive a certificate when you complete your course and its final project.',
  },
  {
    question: 'How do I enrol?',
    answer: 'Pick a course on the Programs page and use the Enrol button on its page, or reach us through the Contact page and we will help you choose.',
  },
]
