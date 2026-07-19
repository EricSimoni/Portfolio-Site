import NavTile from '../components/NavTile.jsx'
import { CardIcon, GridIcon, UserIcon, DocIcon, MailIcon, CodeIcon } from '../components/TileIcons.jsx'

const TILES = [
  { to: '/blackjack', tag: 'PLAY', label: 'Blackjack', icon: <CardIcon /> },
  { to: '/projects', tag: 'WORK', label: 'Projects', icon: <GridIcon /> },
  { to: '/about', tag: 'INFO', label: 'About', icon: <UserIcon /> },
  { to: '/resume', tag: 'DOCS', label: 'Resume', icon: <DocIcon /> },
  { to: '/contact', tag: 'LINK', label: 'Contact', icon: <MailIcon /> },
  {
    to: 'https://github.com/your-username',
    external: true,
    tag: 'CODE',
    label: 'GitHub',
    icon: <CodeIcon />,
  },
]

export default function Home() {
  return (
    <main className="home">
      <header className="home__header">
        <span className="home__eyebrow">// PORTFOLIO</span>
        <h1 className="home__title">
          Eric <span className="home__title-accent">Simoni</span>
        </h1>
        <p className="home__subtitle">full-stack developer</p>
      </header>

      <nav className="home__grid" aria-label="Site sections">
        {TILES.map((tile) => (
          <NavTile key={tile.label} {...tile} />
        ))}
      </nav>
    </main>
  )
}
