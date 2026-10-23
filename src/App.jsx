import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import CourseDetail from './pages/CourseDetail'
import Contact from './pages/Contact'
import { findCourse } from './data/site'

function TitleManager() {
  const location = useLocation()
  const params = useParams()
  useEffect(() => {
    const path = location.pathname
    let title = 'TechSquarers'
    if (path === '/about') title = 'About | TechSquarers'
    else if (path === '/contact') title = 'Contact | TechSquarers'
    else if (path === '/programs' || path === '/programs/') title = 'Programs | TechSquarers'
    else if (path.startsWith('/programs/')) {
      const slug = path.split('/').filter(Boolean)[1]
      const course = slug ? findCourse(slug) : null
      title = course ? `${course.name} | TechSquarers` : 'TechSquarers'
    }
    document.title = title
    window.scrollTo(0, 0)
  }, [location.pathname, params])
  return null
}

/**
 * Base layout — ported from templates/base.html.
 * Every page gets the skip link, the navbar, a <main id="main">, and the
 * closing CTA + footer — except Contact, which has no footer in the original
 * (its page template empties the footer block).
 */
function Layout() {
  const location = useLocation()
  const showFooter = location.pathname !== '/contact'

  return (
    <div className="bg-white text-deep-navy antialiased min-h-svh">
      {/* Lets keyboard and screen-reader users jump past the navigation; visible only when focused */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-vibrant-blue focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug/" element={<CourseDetail />} />
          <Route path="/programs/:slug" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <TitleManager />
      <Layout />
    </BrowserRouter>
  )
}
