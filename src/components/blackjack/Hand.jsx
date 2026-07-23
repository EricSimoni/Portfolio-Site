import { motion, AnimatePresence } from 'motion/react'
import Card from './Card.jsx'

const ENTER_DISTANCE = 46

/**
 * Renders one hand (player's or dealer's) as a fanned, animated row of cards.
 *
 * Props:
 *   cards          — array of { rank, suit } card objects (see Card.jsx)
 *   label          — e.g. "You" or "Dealer", shown above the hand
 *   total          — the hand's numeric value; pass null/undefined to hide it
 *   hideFirstCard  — if true, renders the first card face-down (the
 *                     dealer's hole card, before it's revealed)
 *   direction      — 'from-above' | 'from-below'. Both hands' cards
 *                     conceptually come from the same shared deck sitting
 *                     between them on the table — the dealer's hand (above
 *                     the deck) has cards rise UP into place, the player's
 *                     hand (below the deck) has cards fall DOWN into place.
 *                     Reversing this mirrors the motion for the other side.
 *
 * How the animation works: each card is wrapped in a motion.div inside
 * <AnimatePresence>. When a card is ADDED to `cards`, its `initial` state
 * (offset + faded out) animates to its `animate` state (in place, full
 * opacity) — that's the "deal" motion. When the whole hand gets cleared
 * (Play Again resets `cards` to []), AnimatePresence keeps each card
 * mounted just long enough to play its `exit` animation (sliding back
 * toward the deck) before actually removing it — that's the "collect"
 * motion played in reverse, and it's AnimatePresence's job specifically
 * because plain CSS can't delay React's removal of a DOM node like this.
 * The `layout` prop additionally makes existing cards glide smoothly to
 * their new fanned position whenever a new card changes the hand's width,
 * instead of jumping there instantly.
 */
export default function Hand({ cards, label, total, hideFirstCard = false, direction = 'from-above' }) {
  const offsetY = direction === 'from-above' ? -ENTER_DISTANCE : ENTER_DISTANCE

  return (
    <div className="bj-hand">
      <div className="bj-hand__header">
        <span className="bj-hand__label">{label}</span>
        {total != null && <span className="bj-hand__total">{total}</span>}
      </div>

      <div className="bj-hand__cards">
        <AnimatePresence>
          {cards.map((card, i) => (
            <motion.div
              className="bj-hand__card-slot"
              key={`${card.rank}-${card.suit}-${i}`}
              layout
              initial={{ opacity: 0, y: offsetY, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: offsetY, scale: 0.6 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, delay: i * 0.12, ease: 'easeOut' }}
            >
              <Card rank={card.rank} suit={card.suit} faceDown={hideFirstCard && i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
