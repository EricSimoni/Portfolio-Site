/**
 * A "card" throughout this codebase is a plain object: { rank, suit }.
 * See Card.jsx for the accepted rank/suit values.
 */

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS = ['hearts', 'spades', 'clubs', 'diamonds']

/**
 * Builds one standard 52-card deck, in a fixed (unshuffled) order.
 * Kept separate from shuffling on purpose — a predictable, un-shuffled
 * deck is far easier to write assertions against in tests than a
 * random one (e.g. "the first card is Ace of hearts" is a stable fact
 * about createDeck() specifically, and would be a flaky thing to assert
 * about a shuffled deck).
 */
export function createDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit })
    }
  }
  return deck
}

/**
 * Returns a new shuffled array — does NOT mutate the array passed in.
 * That matters for React: mutating state in place is a common bug
 * source, since React compares old/new state by reference to decide
 * whether to re-render. Always return a fresh array here.
 *
 * Uses the Fisher-Yates algorithm: walk backwards through the array,
 * and for each position, swap it with a random earlier-or-equal
 * position. This gives a genuinely uniform shuffle (every ordering
 * equally likely) — unlike the common but subtly-biased
 * "sort by Math.random()" approach.
 */
export function shuffleDeck(deck) {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Removes and returns the top `count` cards from a deck, along with the
 * remaining deck. Returns both rather than mutating, for the same
 * "don't mutate state" reason as shuffleDeck.
 *
 * Usage: const { dealt, remaining } = drawCards(deck, 2)
 */
export function drawCards(deck, count) {
  return {
    dealt: deck.slice(0, count),
    remaining: deck.slice(count),
  }
}
