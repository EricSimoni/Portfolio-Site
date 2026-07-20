import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CodeIcon, LinkedInIcon, MailIcon } from '../components/TileIcons.jsx'

// Same data-array pattern as Resume/Home: plain data up top, mapped into
// JSX below. Update these three values to your real links/email.
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/EricSimoni', icon: <CodeIcon /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simonieric/', icon: <LinkedInIcon /> },
  { label: 'Email', href: 'mailto:simoniericm@gmail.com', icon: <MailIcon /> },
]

// Swap this for your real Formspree endpoint (from formspree.io after creating a form)
const FORM_ENDPOINT = 'https://formspree.io/f/mdaqzjwy'

// The four states this page can be in. Named states like this make the
// JSX below easier to reason about than a scatter of separate booleans.
const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function Contact() {
  // Controlled inputs: React state is the "source of truth" for what's
  // in each field, rather than reading values directly out of the DOM.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(STATUS.IDLE)

  // One shared handler for all three inputs. `e.target.name` matches the
  // `name` attribute on each <input>/<textarea> below, so this one function
  // can update whichever field the person is typing into.
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault() // stop the browser's default full-page-reload form submit
    setStatus(STATUS.SENDING)

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus(STATUS.SUCCESS)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus(STATUS.ERROR)
      }
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <main className="page">
      <Link className="page__back" to="/">
        ← back to home
      </Link>

      <header className="page__header">
        <span className="page__eyebrow">// CONTACT</span>
        <h1 className="page__title">Get in touch</h1>
        <p className="page__subtitle">Have a role, project, or question? Send a message.</p>
      </header>

      <section className="panel">
        {status === STATUS.SUCCESS ? (
          <p className="panel__text">
            Message sent — thanks for reaching out. I'll get back to you soon.
          </p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label className="form__field">
              <span className="form__label">Name</span>
              <input
                className="form__input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form__field">
              <span className="form__label">Email</span>
              <input
                className="form__input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form__field">
              <span className="form__label">Message</span>
              <textarea
                className="form__input form__input--textarea"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button className="form__submit" type="submit" disabled={status === STATUS.SENDING}>
              {status === STATUS.SENDING ? 'Sending…' : 'Send message'}
            </button>

            {status === STATUS.ERROR && (
              <p className="form__error">
                Something went wrong sending that — try again, or email me directly.
              </p>
            )}
          </form>
        )}
      </section>

      <section className="social-links">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            className="social-link"
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
          >
            <span className="social-link__icon">{link.icon}</span>
            <span className="social-link__label">{link.label}</span>
          </a>
        ))}
      </section>
    </main>
  )
}
