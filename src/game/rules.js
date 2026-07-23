/**
 * The dealer doesn't choose — casino rules fix their behavior:
 * hit on 16 or less, stand on 17 or more. Kept as its own tiny function
 * so the rule is named and testable, rather than an inline `< 17` buried
 * in a game loop somewhere.
 */
export function dealerShouldHit(dealerValue) {
  return dealerValue < 17
}

export const OUTCOME = {
  PLAYER_WINS: 'player-wins',
  DEALER_WINS: 'dealer-wins',
  PUSH: 'push', // a tie — bet is returned, nobody wins or loses
}

/**
 * Decides the winner of a finished round. Assumes both hands have
 * already stopped playing (player stood/bust, dealer stood/bust) —
 * this function doesn't run any turn logic itself, just compares
 * final results.
 *
 * Blackjack (natural 21 on the first two cards) beats a regular 21,
 * but two blackjacks push rather than the dealer's "counting more"
 * some other way — worth its own explicit branch rather than folding
 * it into the plain value comparison below, since "21 beats 21" would
 * otherwise silently be wrong for the blackjack-vs-blackjack case.
 */
export function determineWinner({
  playerValue,
  dealerValue,
  playerBust,
  dealerBust,
  playerBlackjack,
  dealerBlackjack,
}) {
  if (playerBust) return OUTCOME.DEALER_WINS
  if (dealerBust) return OUTCOME.PLAYER_WINS

  if (playerBlackjack && dealerBlackjack) return OUTCOME.PUSH
  if (playerBlackjack) return OUTCOME.PLAYER_WINS
  if (dealerBlackjack) return OUTCOME.DEALER_WINS

  if (playerValue > dealerValue) return OUTCOME.PLAYER_WINS
  if (dealerValue > playerValue) return OUTCOME.DEALER_WINS
  return OUTCOME.PUSH
}
