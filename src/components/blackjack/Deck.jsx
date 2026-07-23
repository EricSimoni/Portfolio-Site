/**
 * A stack of overlapping card backs, purely visual — this is the fixed
 * point the deal/collect animations conceptually fly from and to.
 */
export default function Deck() {
  return (
    <div className="bj-deck" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bj-deck__card" style={{ '--stack-index': i }} />
      ))}
    </div>
  )
}
