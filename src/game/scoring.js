const FACE_CARD_VALUES = { J: 10, Q: 10, K: 10 }

/**
 * Value of a single card, treating Aces as 11 by default. Hand-level Ace
 * adjustment (11 → 1 when needed) happens in calculateHandValue below —
 * a single card doesn't have enough context to know whether it should
 * be 11 or 1, since that depends on the rest of the hand.
 */
function baseCardValue(card) {
  if (card.rank === 'A') return 11
  if (card.rank in FACE_CARD_VALUES) return FACE_CARD_VALUES[card.rank]
  return Number(card.rank)
}

/**
 * Calculates a hand's total value, applying blackjack's Ace rule:
 * each Ace counts as 11 unless that would bust the hand, in which case
 * it drops to 1 — one Ace at a time, only as many times as needed.
 *
 * Example: A + K = 21 (Ace stays 11)
 * Example: A + 9 + 5 = 15, not 25 (Ace drops to 1 to avoid busting)
 * Example: A + A + 9 = 21 (one Ace is 11, the other is 1)
 */
export function calculateHandValue(hand) {
  let total = hand.reduce((sum, card) => sum + baseCardValue(card), 0)
  let acesAsEleven = hand.filter((card) => card.rank === 'A').length

  while (total > 21 && acesAsEleven > 0) {
    total -= 10 // demote one Ace from 11 to 1
    acesAsEleven -= 1
  }

  return total
}

/** A 2-card hand worth 21 (Ace + any 10-value card) dealt at the start of a round. */
export function isBlackjack(hand) {
  return hand.length === 2 && calculateHandValue(hand) === 21
}

export function isBust(handValue) {
  return handValue > 21
}
