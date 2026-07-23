import { describe, it, expect } from 'vitest'
import { dealerShouldHit, determineWinner, OUTCOME } from './rules.js'

describe('dealerShouldHit', () => {
  it('hits on 16', () => {
    expect(dealerShouldHit(16)).toBe(true)
  })

  it('stands on 17', () => {
    expect(dealerShouldHit(17)).toBe(false)
  })

  it('stands well above 17', () => {
    expect(dealerShouldHit(20)).toBe(false)
  })
})

describe('determineWinner', () => {
  const base = {
    playerValue: 0,
    dealerValue: 0,
    playerBust: false,
    dealerBust: false,
    playerBlackjack: false,
    dealerBlackjack: false,
  }

  it('player wins if dealer busts and player did not', () => {
    const result = determineWinner({ ...base, dealerBust: true, playerValue: 15 })
    expect(result).toBe(OUTCOME.PLAYER_WINS)
  })

  it('dealer wins if player busts', () => {
    const result = determineWinner({ ...base, playerBust: true })
    expect(result).toBe(OUTCOME.DEALER_WINS)
  })

  it('player wins with a higher value when neither busts', () => {
    const result = determineWinner({ ...base, playerValue: 20, dealerValue: 18 })
    expect(result).toBe(OUTCOME.PLAYER_WINS)
  })

  it('dealer wins with a higher value when neither busts', () => {
    const result = determineWinner({ ...base, playerValue: 17, dealerValue: 19 })
    expect(result).toBe(OUTCOME.DEALER_WINS)
  })

  it('pushes on equal values', () => {
    const result = determineWinner({ ...base, playerValue: 18, dealerValue: 18 })
    expect(result).toBe(OUTCOME.PUSH)
  })

  it('player blackjack beats dealer plain 21', () => {
    const result = determineWinner({
      ...base,
      playerBlackjack: true,
      playerValue: 21,
      dealerValue: 21,
    })
    expect(result).toBe(OUTCOME.PLAYER_WINS)
  })

  it('two blackjacks push, not "highest value wins"', () => {
    const result = determineWinner({
      ...base,
      playerBlackjack: true,
      dealerBlackjack: true,
      playerValue: 21,
      dealerValue: 21,
    })
    expect(result).toBe(OUTCOME.PUSH)
  })

  it('a player bust loses even if dealer also has a lower non-bust value somehow checked first', () => {
    // Guards against accidentally checking value comparison before bust checks
    const result = determineWinner({ ...base, playerBust: true, playerValue: 0, dealerValue: 5 })
    expect(result).toBe(OUTCOME.DEALER_WINS)
  })
})
