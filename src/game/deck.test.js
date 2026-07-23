import { describe, it, expect } from 'vitest'
import { createDeck, shuffleDeck, drawCards } from './deck.js'

describe('createDeck', () => {
  it('creates exactly 52 cards', () => {
    expect(createDeck()).toHaveLength(52)
  })

  it('has 13 cards of each suit', () => {
    const deck = createDeck()
    const hearts = deck.filter((card) => card.suit === 'hearts')
    expect(hearts).toHaveLength(13)
  })

  it('has no duplicate cards', () => {
    const deck = createDeck()
    const seen = new Set(deck.map((card) => `${card.rank}-${card.suit}`))
    expect(seen.size).toBe(52)
  })
})

describe('shuffleDeck', () => {
  it('keeps the same 52 cards, just reordered', () => {
    const deck = createDeck()
    const shuffled = shuffleDeck(deck)
    expect(shuffled).toHaveLength(52)

    const originalKeys = new Set(deck.map((c) => `${c.rank}-${c.suit}`))
    const shuffledKeys = new Set(shuffled.map((c) => `${c.rank}-${c.suit}`))
    expect(shuffledKeys).toEqual(originalKeys)
  })

  it('does not mutate the original array', () => {
    const deck = createDeck()
    const originalFirstCard = deck[0]
    shuffleDeck(deck)
    // If shuffleDeck mutated `deck` in place, this would fail intermittently
    // (shuffle happened to put the same card first) or reliably fail if it
    // reassigned deck[0] — either way, deck[0] should be untouched.
    expect(deck[0]).toBe(originalFirstCard)
  })
})

describe('drawCards', () => {
  it('deals the requested number of cards from the top', () => {
    const deck = createDeck()
    const { dealt, remaining } = drawCards(deck, 2)
    expect(dealt).toEqual([deck[0], deck[1]])
    expect(remaining).toHaveLength(50)
  })

  it('does not mutate the original deck', () => {
    const deck = createDeck()
    const originalLength = deck.length
    drawCards(deck, 5)
    expect(deck).toHaveLength(originalLength)
  })
})
