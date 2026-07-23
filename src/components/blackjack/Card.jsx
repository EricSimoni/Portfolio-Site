import { motion } from 'motion/react'
import './blackjack.css'

/**
 * ─────────────────────────────────────────────────────────────────────
 * Unlike the old version, this component always renders BOTH faces
 * (front = rank/suit, back = card-back pattern) stacked in 3D space,
 * with `backface-visibility: hidden` on each. `faceDown` just controls
 * which one is currently rotated toward the viewer — Motion animates
 * that rotation smoothly instead of instantly swapping which JSX
 * branch renders (which is what the old conditional-return version did).
 *
 * The aria-label lives on the OUTER wrapper and changes based on
 * `faceDown`, rather than always announcing the true rank/suit — a
 * screen reader shouldn't get information a sighted player can't see
 * either (the dealer's hidden hole card should stay genuinely hidden).
 * ─────────────────────────────────────────────────────────────────────
 */

const SUIT_SYMBOLS = {
  hearts: '♥',
  spades: '♠',
  clubs: '♣',
  diamonds: '♦',
}

export default function Card({ rank, suit, faceDown = false }) {
  const symbol = SUIT_SYMBOLS[suit]

  return (
    <div
      className="bj-card-flip"
      aria-label={faceDown ? 'Face-down card' : `${rank} of ${suit}`}
    >
      <motion.div
        className="bj-card-flip__inner"
        initial={{ rotateY: faceDown ? 180 : 0 }}
        animate={{ rotateY: faceDown ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Front face: the real rank/suit content */}
        <div
          className={`bj-card bj-card--${suit} bj-card-flip__face bj-card-flip__face--front`}
          aria-hidden="true"
        >
          <div className="bj-card__inner">
            <div className="bj-card__corner bj-card__corner--top">
              <span className="bj-card__rank">{rank}</span>
              <span className="bj-card__pip">{symbol}</span>
            </div>

            <span className="bj-card__pip bj-card__pip--center">{symbol}</span>

            <div className="bj-card__corner bj-card__pip--bottom">
              <span className="bj-card__rank">{rank}</span>
              <span className="bj-card__pip">{symbol}</span>
            </div>
          </div>
        </div>

        {/* Back face: card-back pattern */}
        <div className="bj-card bj-card--back bj-card-flip__face bj-card-flip__face--back" aria-hidden="true">
          <div className="bj-card__back-pattern" />
        </div>
      </motion.div>
    </div>
  )
}
