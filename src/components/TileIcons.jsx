// Minimal geometric line icons, drawn to match the panel's angular language.
// Inline SVG keeps this at zero extra network requests.

const common = {
  width: 26,
  height: 26,
  viewBox: '0 0 26 26',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function CardIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <rect x="4" y="3" width="13" height="18" rx="1.5" transform="rotate(-8 10.5 12)" />
      <rect x="9" y="5" width="13" height="18" rx="1.5" />
      <circle cx="15.5" cy="10.5" r="1.6" />
    </svg>
  )
}

export function GridIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="15.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="15.5" width="7" height="7" />
      <rect x="15.5" y="15.5" width="7" height="7" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <circle cx="13" cy="8" r="4.2" />
      <path d="M4 22c1.6-4.6 5-6.8 9-6.8s7.4 2.2 9 6.8" />
    </svg>
  )
}

export function DocIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M6 2.5h9l5 5V23a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
      <path d="M15 2.5V8h5" />
      <path d="M8.5 13h9M8.5 17h9" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <rect x="2.5" y="5.5" width="21" height="15" rx="1.5" />
      <path d="M3.5 6.5 13 14l9.5-7.5" />
    </svg>
  )
}

export function CodeIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <path d="M9 6 3 13l6 7" />
      <path d="M17 6l6 7-6 7" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg {...common} aria-hidden="true">
      <rect x="3" y="3" width="20" height="20" rx="2" />
      <line x1="8" y1="10" x2="8" y2="17" />
      <circle cx="8" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12.5 17v-4.2c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V17" />
      <line x1="12.5" y1="10" x2="12.5" y2="17" />
    </svg>
  )
}
