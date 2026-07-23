import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hand from '../components/blackjack/Hand.jsx'
import Deck from '../components/blackjack/Deck.jsx'
import ChipSelector from '../components/blackjack/ChipSelector.jsx'
import { createDeck, shuffleDeck, drawCards } from '../game/deck.js'
import { calculateHandValue, isBlackjack, isBust } from '../game/scoring.js'
import { dealerShouldHit, determineWinner, OUTCOME } from '../game/rules.js'

const STARTING_BANKROLL = 500

function createInitialState() {
  return {
    deck: [],
    playerHand: [],
    dealerHand: [],
    phase: 'betting', // 'betting' | 'player-turn' | 'round-over'
    message: '',
    bankroll: STARTING_BANKROLL,
    currentBet: 0,
  }
}

function outcomeMessage(outcome, playerBlackjack) {
  if (outcome === OUTCOME.PLAYER_WINS) return playerBlackjack ? 'Blackjack! You win!' : 'You win!'
  if (outcome === OUTCOME.DEALER_WINS) return 'Dealer wins'
  return "Push — it's a tie"
}

/**
 * How many eddies come back to the bankroll for a given outcome.
 * The bet itself was already deducted from bankroll when it was placed
 * (see handleDeal), so this only needs to return what the round PAYS OUT:
 *   - blackjack win: bet back + 1.5x bet winnings = 2.5x bet total
 *   - regular win: bet back + equal winnings = 2x bet total
 *   - push: just the original bet back = 1x bet
 *   - loss: nothing — the bet was already lost when it was deducted
 * Math.round guards against fractional eddies (e.g. an odd bet * 1.5).
 */
function payout(outcome, bet, playerBlackjack) {
  if (outcome === OUTCOME.PLAYER_WINS) return Math.round(bet * (playerBlackjack ? 2.5 : 2))
  if (outcome === OUTCOME.PUSH) return bet
  return 0
}

function playDealerTurn(deck, dealerHand) {
  let currentDeck = deck
  let currentHand = dealerHand
  while (dealerShouldHit(calculateHandValue(currentHand))) {
    const { dealt, remaining } = drawCards(currentDeck, 1)
    currentHand = [...currentHand, ...dealt]
    currentDeck = remaining
  }
  return { deck: currentDeck, dealerHand: currentHand }
}

export default function Blackjack() {
  const [game, setGame] = useState(createInitialState)

  function handleAddChip(value) {
    setGame((prev) => {
      if (prev.phase !== 'betting') return prev
      if (prev.currentBet + value > prev.bankroll) return prev
      return { ...prev, currentBet: prev.currentBet + value }
    })
  }

  function handleClearBet() {
    setGame((prev) => (prev.phase === 'betting' ? { ...prev, currentBet: 0 } : prev))
  }

  function handleDeal() {
    setGame((prev) => {
      if (prev.phase !== 'betting' || prev.currentBet <= 0 || prev.currentBet > prev.bankroll) {
        return prev
      }

      const bankrollAfterBet = prev.bankroll - prev.currentBet

      const deck = shuffleDeck(createDeck())
      const { dealt: playerHand, remaining: afterPlayer } = drawCards(deck, 2)
      const { dealt: dealerHand, remaining: afterDealer } = drawCards(afterPlayer, 2)

      const playerBJ = isBlackjack(playerHand)
      const dealerBJ = isBlackjack(dealerHand)

      if (playerBJ || dealerBJ) {
        const outcome = determineWinner({
          playerValue: calculateHandValue(playerHand),
          dealerValue: calculateHandValue(dealerHand),
          playerBust: false,
          dealerBust: false,
          playerBlackjack: playerBJ,
          dealerBlackjack: dealerBJ,
        })
        const winnings = payout(outcome, prev.currentBet, playerBJ)

        return {
          ...prev,
          deck: afterDealer,
          playerHand,
          dealerHand,
          phase: 'round-over',
          message: outcomeMessage(outcome, playerBJ),
          bankroll: bankrollAfterBet + winnings,
        }
      }

      return {
        ...prev,
        deck: afterDealer,
        playerHand,
        dealerHand,
        phase: 'player-turn',
        message: '',
        bankroll: bankrollAfterBet,
      }
    })
  }

  function handleHit() {
    setGame((prev) => {
      if (prev.phase !== 'player-turn') return prev

      const { dealt, remaining } = drawCards(prev.deck, 1)
      const playerHand = [...prev.playerHand, ...dealt]
      const playerValue = calculateHandValue(playerHand)

      if (isBust(playerValue)) {
        // Bet was already deducted at deal time and there's nothing to
        // pay out on a loss, so bankroll doesn't need to change here.
        return {
          ...prev,
          deck: remaining,
          playerHand,
          phase: 'round-over',
          message: 'Bust! Dealer wins',
        }
      }

      return { ...prev, deck: remaining, playerHand }
    })
  }

  function handleStand() {
    setGame((prev) => {
      if (prev.phase !== 'player-turn') return prev

      const { deck, dealerHand } = playDealerTurn(prev.deck, prev.dealerHand)
      const playerValue = calculateHandValue(prev.playerHand)
      const dealerValue = calculateHandValue(dealerHand)

      const outcome = determineWinner({
        playerValue,
        dealerValue,
        playerBust: false,
        dealerBust: isBust(dealerValue),
        playerBlackjack: false,
        dealerBlackjack: false,
      })
      const winnings = payout(outcome, prev.currentBet, false)

      return {
        ...prev,
        deck,
        dealerHand,
        phase: 'round-over',
        message: outcomeMessage(outcome, false),
        bankroll: prev.bankroll + winnings,
      }
    })
  }

  /** Back to the betting phase for a new round — keeps the same bet
   *  amount staged as a convenience, clamped down if a big loss means
   *  the old bet is no longer affordable. */
  function handlePlayAgain() {
    setGame((prev) => ({
      ...prev,
      playerHand: [],
      dealerHand: [],
      message: '',
      phase: 'betting',
      currentBet: Math.min(prev.currentBet, prev.bankroll),
    }))
  }

  function handleResetBankroll() {
    setGame((prev) => ({ ...prev, bankroll: STARTING_BANKROLL, currentBet: 0 }))
  }

  const { playerHand, dealerHand, phase, message, bankroll, currentBet } = game
  const playerTotal = playerHand.length ? calculateHandValue(playerHand) : null
  const dealerHiding = phase === 'player-turn'
  const dealerTotal = dealerHiding || !dealerHand.length ? null : calculateHandValue(dealerHand)
  const isBroke = bankroll <= 0 && currentBet === 0

  return (
    <main className="page">
      <Link className="page__back" to="/">
        ← back to home
      </Link>

      <header className="page__header">
        <span className="page__eyebrow">// BLACKJACK</span>
        <h1 className="page__title">Blackjack</h1>
        <p className="page__subtitle">Standard rules — dealer stands on 17</p>
      </header>

      <div className="bj-hud">
        <span>
          Bankroll<span className="bj-hud__value">{bankroll} eddies</span>
        </span>
        <span>
          Bet<span className="bj-hud__value">{currentBet} eddies</span>
        </span>
      </div>

      {phase !== 'betting' && (
        <div className="bj-table">
          <Hand
            cards={dealerHand}
            label="Dealer"
            total={dealerTotal}
            hideFirstCard={dealerHiding}
            direction="from-below"
          />
          <Deck />
          <Hand cards={playerHand} label="You" total={playerTotal} direction="from-above" />
        </div>
      )}

      {message && <p className="bj-message">{message}</p>}

      {phase === 'betting' && !isBroke && (
        <ChipSelector
          bankroll={bankroll}
          currentBet={currentBet}
          onAddChip={handleAddChip}
          onClearBet={handleClearBet}
          disabled={false}
        />
      )}

      {isBroke && (
        <p className="bj-out-of-eddies">
          Out of eddies. Every good run ends somewhere — reset to keep playing.
        </p>
      )}

      <div className="bj-controls">
        {phase === 'betting' && !isBroke && (
          <button className="form__submit" onClick={handleDeal} disabled={currentBet <= 0}>
            Deal
          </button>
        )}

        {isBroke && (
          <button className="form__submit" onClick={handleResetBankroll}>
            Reset bankroll
          </button>
        )}

        {phase === 'player-turn' && (
          <>
            <button className="form__submit" onClick={handleHit}>
              Hit
            </button>
            <button className="form__submit form__submit--secondary" onClick={handleStand}>
              Stand
            </button>
          </>
        )}

        {phase === 'round-over' && (
          <button className="form__submit" onClick={handlePlayAgain}>
            Play again
          </button>
        )}
      </div>
    </main>
  )
}
