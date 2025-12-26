'use client'

import Link from 'next/link'
import { useGameState } from '@/lib/gameState'
import { levels } from '@/lib/levels'
import { StarRating } from '@/components/StarRating'

export default function LevelsPage() {
  const { state } = useGameState()

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true
    return state.completedLevels.includes(levelId - 1)
  }

  const getLevelStars = (levelId: number) => {
    return state.levelStars[levelId] || 0
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Level Select
          </h1>
          <Link
            href="/"
            className="text-excel-green hover:underline"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {levels.map((level) => {
            const unlocked = isLevelUnlocked(level.id)
            const stars = getLevelStars(level.id)
            const completed = state.completedLevels.includes(level.id)

            return (
              <Link
                key={level.id}
                href={unlocked ? `/level/${level.id}` : '#'}
                className={`
                  relative p-4 rounded-lg border-2 text-center transition-all
                  ${unlocked
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-excel-green cursor-pointer'
                    : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {level.id}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {level.title}
                </div>
                {completed && (
                  <div className="mt-2">
                    <StarRating stars={stars} size="sm" />
                  </div>
                )}
                {!unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h2 className="font-bold text-gray-800 dark:text-white mb-2">Tier Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div>1-3: Warm-Up</div>
            <div>4-5: Foundation</div>
            <div>6-8: Intermediate</div>
            <div>9-11: Advanced</div>
            <div>12-13: Expert</div>
            <div>14-15: Boss Battles</div>
          </div>
        </div>
      </div>
    </main>
  )
}
