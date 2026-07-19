import { Link } from 'react-router-dom'

/**
 * Angular, clipped-corner nav panel with a glow-trace border on hover/focus.
 * Renders an internal <Link> when `to` is a route path, or a plain <a>
 * when it's an external link (e.g. GitHub) or the page isn't built yet.
 */
export default function NavTile({ to, external, tag, label, icon, disabled }) {
  const content = (
    <>
      <span className="nav-tile__tag">{tag}</span>
      <span className="nav-tile__icon">{icon}</span>
      <span className="nav-tile__label">{label}</span>
      <svg className="nav-tile__corner" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M20 0 L20 20 L0 20" />
      </svg>
    </>
  )

  const className = `nav-tile${disabled ? ' nav-tile--disabled' : ''}`

  if (disabled) {
    return (
      <div className={className} aria-disabled="true" tabIndex={-1}>
        {content}
      </div>
    )
  }

  if (external) {
    return (
      <a className={className} href={to} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return (
    <Link className={className} to={to}>
      {content}
    </Link>
  )
}
