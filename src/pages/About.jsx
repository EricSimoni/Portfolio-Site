import { Link } from 'react-router-dom'

const BIO_PARAGRAPHS = [
  "I'm better at making things than describing myself, so this is mostly the former.",
  "I grew up around security work. My dad's been doing it since punch cards, both my brothers do it, my aunt does it at a federal level. Coding was always an option sitting in the back of my head, one I avoided for a while just to be different. When I finally tried it, it felt unusually natural. I'm also just being honest: I need an income, and full-stack work happens to scratch the same itch as design and video editing always have. Building something that communicates clearly.",
  "Before this I spent time in QA at a production line, catching problems before they shipped and communicating clearly when something needed to stop. I notice small things: load times, a single misaligned pixel. While building this site, I caught a one-pixel gap in a CSS clip-path and couldn't leave it alone until it was fixed. That's pretty much how I work. Research first, then experiment until something clicks. I use the same process sketching a difficult pose as I do fixing a bug: find someone who's solved it before, and if I can't, build my own reference and iterate from there.",
  "In a group, I'm not usually the one setting the pace. I'm the one who matches and raises whoever is. That means I'm probably not your project lead, but I'll make your project lead better.",
  "Outside of code: I draw and edit video, I run weekly D&D sessions for friends, I'm learning guitar, and I'm teaching myself Japanese daily, mostly out of frustration with bad translations, but I've found I love the process of learning a language enough that I plan to just start another one once I'm fluent. I once logged 200 straight days of doodling, less because the art mattered and more because I wanted to prove to myself I could finish things.",
  "I'm less interested in who I am right now than who I'm becoming, which might be part of why this field appeals to me. There's always a next thing to get better at.",
]

export default function About() {
  return (
    <main className="page">
      <Link className="page__back" to="/">
        ← back to home
      </Link>

      <header className="page__header">
        <span className="page__eyebrow">// ABOUT</span>
        <h1 className="page__title">Eric Simoni</h1>
        {/* TODO: put an image of myself here */}
      </header>

      <section className="panel">
        {BIO_PARAGRAPHS.map((paragraph, i) => (
          <p className="panel__text" key={i}>
            {paragraph}
          </p>
        ))}
      </section>

      <p className="page__link">
        Want to work together?{' '}
        <Link className="page__link" to="/contact">
          Get in touch →
        </Link>
      </p>
    </main>
  )
}