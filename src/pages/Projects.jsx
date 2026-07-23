import { Link } from 'react-router-dom'

/**
 * Same pattern as Resume.jsx: data up top, mapped into JSX below.
 * PROJECTS is an array (even with one entry) so adding a second project
 * later is just adding another object here — no markup changes needed.
 */
const PROJECTS = [
  {
    title: 'Portfolio Site & Blackjack Game',
    tagline: 'A full-stack-adjacent portfolio, built from scratch as a learning project',
    tech: ['React', 'Vite', 'React Router', 'Vitest', 'Motion', 'CSS custom properties', 'Formspree'],
    highlights: [
      'Built the whole site in React + Vite, with client-side routing across Home, Resume, About, Contact, and Blackjack pages.',
      'Designed a custom CSS architecture from scratch, including tracking down and fixing a real clip-path + border rendering bug with a layered pseudo-element technique, applied consistently across nav tiles, panels, and buttons.',
      'Integrated a working contact form via Formspree, with controlled inputs and async submit/error/success state handling.',
      'Built a fully playable Blackjack game from the ground up: pure, unit-tested game logic (31 passing Vitest tests) covering deck shuffling, Ace scoring edge cases, dealer AI, and win/loss/push rules.',
      'Implemented a full betting system — virtual currency, payout math for regular wins vs. blackjack payouts, and bankroll persistence across rounds.',
      'Added a full animation pass with Motion: staggered deal-in and collect-out card animations coordinated with AnimatePresence, and a real 3D CSS card flip for the dealer\u2019s hidden card.',
    ],
    liveTo: '/blackjack',
    liveLabel: 'Play the game',
    repoHref: 'https://github.com/EricSimoni/Portfolio-Site',
  },
]

export default function Projects() {
  return (
    <main className="page">
      <Link className="page__back" to="/">
        ← back to home
      </Link>

      <header className="page__header">
        <span className="page__eyebrow">// PROJECTS</span>
        <h1 className="page__title">Projects</h1>
      </header>

      {PROJECTS.map((project) => (
        <section className="panel" key={project.title}>
          <h2 className="panel__title">{project.title}</h2>
          <p className="panel__text">{project.tagline}</p>

          <div className="project-tech">
            {project.tech.map((item) => (
              <span className="skill-tag" key={item}>
                {item}
              </span>
            ))}
          </div>

          <ul className="project-highlights">
            {project.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="project-links">
            <Link className="social-link" to={project.liveTo}>
              <span>{project.liveLabel}</span>
            </Link>
            <a className="social-link" href={project.repoHref} target="_blank" rel="noreferrer">
              <span>View source</span>
            </a>
          </div>
        </section>
      ))}
    </main>
  )
}
