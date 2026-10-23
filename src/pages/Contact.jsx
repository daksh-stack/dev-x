import Details from '../sections/contact/Details'

/**
 * Contact page — no banner: the page opens on the details section, whose
 * "Contact us" is the page's h1. No closing CTA or footer on this page
 * (App.jsx suppresses the footer here), as in the original.
 */
export default function Contact() {
  return <Details />
}
