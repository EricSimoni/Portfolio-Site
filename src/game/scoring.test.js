import { describe, it, expect } from 'vitest'
import { calculateHandValue, isBlackjack, isBust } from './scoring.js'

const card = (rank, suit = 'spades') => ({ rank, suit })

describe('calculateHandValue', () => {
  it('adds up simple number cards', () => {
    expect(calculateHandValue([card('4'), card('5')])).toBe(9)
  })

  it('counts face cards as 10', () => {
    expect(calculateHandValue([card('K'), card('Q')])).toBe(20)
  })

  it('counts a single Ace as 11 when it does not bust', () => {
    expect(calculateHandValue([card('A'), card('K')])).toBe(21)
  })

  it('drops an Ace to 1 when 11 would bust the hand', () => {
    // 11 + 9 + 5 = 25 (bust) if the Ace stayed 11, so it must drop to 1
    expect(calculateHandValue([card('A'), card('9'), card('5')])).toBe(15)
  })

  it('handles two Aces — one as 11, one as 1', () => {
    // A + A = 22 if both were 11, so exactly one drops: 11 + 1 = 12
    expect(calculateHandValue([card('A'), card('A')])).toBe(12)
  })

  it('handles two Aces plus a 9 (needs both Aces demoted)', () => {
    // 11 + 11 + 9 = 31 if both stayed 11; even one demoted (11+1+9=21) works,
    // so only one should demote, giving 21 — not both demoting to 11.
    expect(calculateHandValue([card('A'), card('A'), card('9')])).toBe(21)
  })

  it('busts normally once no Aces are left to demote', () => {
    expect(calculateHandValue([card('K'), card('Q'), card('5')])).toBe(25)
  })
})

describe('isBlackjack', () => {
  it('is true for Ace + 10-value card as the first two cards', () => {
    expect(isBlackjack([card('A'), card('K')])).toBe(true)
  })

  it('is false for 21 reached with more than 2 cards', () => {
    // 7 + 7 + 7 = 21, but it took three cards, so it's not a "natural" blackjack
    expect(isBlackjack([card('7'), card('7'), card('7')])).toBe(false)
  })

  it('is false for a 2-card hand that is not 21', () => {
    expect(isBlackjack([card('9'), card('9')])).toBe(false)
  })
})

describe('isBust', () => {
  it('is true above 21', () => {
    expect(isBust(22)).toBe(true)
  })

  it('is false at exactly 21', () => {
    expect(isBust(21)).toBe(false)
  })

  it('is false below 21', () => {
    expect(isBust(20)).toBe(false)
  })
})
