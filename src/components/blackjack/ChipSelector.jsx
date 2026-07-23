const CHIP_VALUES = [5, 25, 50, 100, 250]

/**
 * Props:
 *   bankroll    — total eddies available
 *   currentBet  — eddies already staged for this round
 *   onAddChip   — (value) => void, called when a chip is clicked
 *   onClearBet  — () => void
 *   disabled    — true outside the betting phase (locks all chips)
 */
export default function ChipSelector({ bankroll, currentBet, onAddChip, onClearBet, disabled }) {
  return (
    <div className="bj-chips">
      {CHIP_VALUES.map((value) => {
        const affordable = bankroll - currentBet >= value
        return (
          <button
            key={value}
            className="bj-chip"
            onClick={() => onAddChip(value)}
            disabled={disabled || !affordable}
            aria-label={`Bet ${value} eddies`}
          >
            +{value}
          </button>
        )
      })}

      <button
        className="bj-chip bj-chip--clear"
        onClick={onClearBet}
        disabled={disabled || currentBet === 0}
      >
        Clear
      </button>
    </div>
  )
}
