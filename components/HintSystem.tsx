'use client'

import { useState } from 'react'

interface HintSystemProps {
  hints: string[]
  revealedHints: number[]
  onRevealHint: (hintIndex: number) => void
  hintsUsed: number
}

export function HintSystem({
  hints,
  revealedHints,
  onRevealHint,
  hintsUsed,
}: HintSystemProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingHintIndex, setPendingHintIndex] = useState<number | null>(null)

  const hintsRemaining = hints.length - hintsUsed
  const nextHintIndex = revealedHints.length

  const getStarImpact = (hintsAfterReveal: number) => {
    if (hintsAfterReveal === 0) return 3
    if (hintsAfterReveal === 1) return 2
    if (hintsAfterReveal === 2) return 1
    return 0
  }

  const handleHintRequest = () => {
    if (nextHintIndex < hints.length) {
      setPendingHintIndex(nextHintIndex)
      setShowConfirm(true)
    }
  }

  const confirmReveal = () => {
    if (pendingHintIndex !== null) {
      onRevealHint(pendingHintIndex)
    }
    setShowConfirm(false)
    setPendingHintIndex(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      {/* Hint Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleHintRequest}
          disabled={nextHintIndex >= hints.length}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${nextHintIndex >= hints.length
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }
          `}
        >
          <span className="text-xl">💡</span>
          Hints ({hintsRemaining} left)
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Max stars: {getStarImpact(hintsUsed)} ⭐
        </div>
      </div>

      {/* Revealed Hints */}
      {revealedHints.length > 0 && (
        <div className="space-y-2">
          {revealedHints.map((hintIdx) => (
            <div
              key={hintIdx}
              className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                Hint {hintIdx + 1}:
              </span>{' '}
              {hints[hintIdx]}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Use a Hint?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This will affect your star rating.
            </p>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 text-sm">
              <div className="flex justify-between">
                <span>Current max stars:</span>
                <span className="font-semibold">{getStarImpact(hintsUsed)} ⭐</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span>After reveal:</span>
                <span className="font-semibold">{getStarImpact(hintsUsed + 1)} ⭐</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmReveal}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Reveal Hint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
