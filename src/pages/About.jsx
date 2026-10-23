import PageHero from '../components/PageHero'
import Story from '../sections/about/Story'
import Mission from '../sections/about/Mission'
import Believe from '../sections/about/Believe'
import Audience from '../sections/about/Audience'

/**
 * About page — opens on the photo page-hero, whose "About us" is the page's h1,
 * then Our story, Mission, What we believe, Who it's for.
 */
export default function About() {
  return (
    <>
      <PageHero
        title="About us"
        image="/images/page-hero-laptop-typing-1200.webp"
        imageSmall="/images/page-hero-laptop-typing-800.webp"
        imagePosition="object-[50%_55%]"
        imageAlt="Hands in a suit sleeve typing on a laptop at a desk"
      />
      <Story />
      <Mission />
      <Believe />
      <Audience />
    </>
  )
}
