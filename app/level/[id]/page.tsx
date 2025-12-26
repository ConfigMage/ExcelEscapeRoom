'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { SpreadsheetGrid } from '@/components/SpreadsheetGrid'
import { FormulaBar } from '@/components/FormulaBar'
import { Timer } from '@/components/Timer'
import { HintSystem } from '@/components/HintSystem'
import { StarRating } from '@/components/StarRating'
import { useGameState } from '@/lib/gameState'
import { levels } from '@/lib/levels'
import { calculateStars } from '@/lib/utils'

export default function LevelPage() {
  const params = useParams()
  const router = useRouter()
  const levelId = parseInt(params.id as string)
  const level = levels.find(l => l.id === levelId)

  const { state, dispatch } = useGameState()
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [cellValues, setCellValues] = useState<Record<string, string>>({})
  const [hintsUsed, setHintsUsed] = useState(0)
  const [revealedHints, setRevealedHints] = useState<number[]>([])
  const [startTime] = useState(Date.now())
  const [isComplete, setIsComplete] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  // Initialize cell values from level data
  useEffect(() => {
    if (level) {
      const initial: Record<string, string> = {}
      level.grid.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          const cellId = `${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`
          initial[cellId] = cell.value
        })
      })
      setCellValues(initial)
    }
  }, [level])

  const handleCellChange = useCallback((cellId: string, value: string) => {
    setCellValues(prev => ({ ...prev, [cellId]: value }))
  }, [])

  const handleRevealHint = useCallback((hintIndex: number) => {
    if (!revealedHints.includes(hintIndex)) {
      setRevealedHints(prev => [...prev, hintIndex])
      setHintsUsed(prev => prev + 1)
    }
  }, [revealedHints])

  const checkSolution = useCallback(() => {
    if (!level) return false

    // Check each input cell against expected solution
    for (const [cellId, expectedValue] of Object.entries(level.solution)) {
      const userValue = cellValues[cellId]?.toString().trim().toLowerCase()
      const expected = expectedValue.toString().trim().toLowerCase()
      if (userValue !== expected) {
        return false
      }
    }
    return true
  }, [level, cellValues])

  const handleSubmit = useCallback(() => {
    if (!level) return

    if (checkSolution()) {
      const timeSeconds = Math.floor((Date.now() - startTime) / 1000)
      const stars = calculateStars(timeSeconds, level.parTime, hintsUsed)

      setEarnedStars(stars)
      setIsComplete(true)
      setShowSuccess(true)

      dispatch({
        type: 'COMPLETE_LEVEL',
        levelId: level.id,
        stars,
        time: timeSeconds
      })
    } else {
      // Shake animation or error feedback could go here
      alert('Not quite right. Keep trying!')
    }
  }, [level, checkSolution, startTime, hintsUsed, dispatch])

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Level not found</p>
        <Link href="/levels" className="ml-4 text-excel-green">
          Back to Levels
        </Link>
      </div>
    )
  }

  const selectedCellData = selectedCell ? {
    id: selectedCell,
    value: cellValues[selectedCell] || '',
    formula: level.grid.flat().find(c => {
      const colIdx = selectedCell.charCodeAt(0) - 65
      const rowIdx = parseInt(selectedCell.slice(1)) - 1
      return level.grid[rowIdx]?.[colIdx]
    })?.formula
  } : null

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/levels"
            className="text-excel-green hover:underline"
          >
            ← Back
          </Link>
          <Timer startTime={startTime} isRunning={!isComplete} />
        </div>

        {/* Level Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Level {level.id}: {level.title}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Par: {level.parTime}s
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm italic">
            {level.story}
          </p>
        </div>

        {/* Formula Bar */}
        <FormulaBar
          selectedCell={selectedCellData}
          onValueChange={(value) => selectedCell && handleCellChange(selectedCell, value)}
        />

        {/* Spreadsheet Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-4">
          <SpreadsheetGrid
            grid={level.grid}
            cellValues={cellValues}
            selectedCell={selectedCell}
            onCellSelect={setSelectedCell}
            onCellChange={handleCellChange}
            isComplete={isComplete}
          />
        </div>

        {/* Hint System */}
        <HintSystem
          hints={level.hints}
          revealedHints={revealedHints}
          onRevealHint={handleRevealHint}
          hintsUsed={hintsUsed}
        />

        {/* Submit Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isComplete}
            className={`
              px-8 py-3 rounded-lg font-bold text-lg transition-all
              ${isComplete
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-excel-green text-white hover:bg-excel-green-dark'
              }
            `}
          >
            {isComplete ? 'Completed!' : 'Submit Answer'}
          </button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
              <h2 className="text-3xl font-bold text-excel-green mb-4">
                Level Complete!
              </h2>
              <div className="mb-6">
                <StarRating stars={earnedStars} size="lg" />
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/levels')}
                  className="px-6 py-2 border-2 border-excel-green text-excel-green rounded-lg hover:bg-excel-green/10"
                >
                  Level Select
                </button>
                {levelId < 15 && (
                  <button
                    onClick={() => router.push(`/level/${levelId + 1}`)}
                    className="px-6 py-2 bg-excel-green text-white rounded-lg hover:bg-excel-green-dark"
                  >
                    Next Level
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
