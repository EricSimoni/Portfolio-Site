import { Link } from 'react-router-dom'

export default function Placeholder({ title }) {
  return (
    <main className="placeholder">
      <span className="placeholder__tag">// UNDER CONSTRUCTION</span>
      <h1 className="placeholder__title">{title}</h1>
      <p className="placeholder__body">This section is being built next.</p>
      <Link className="placeholder__back" to="/">
        ← back to home
      </Link>
    </main>
  )
}
