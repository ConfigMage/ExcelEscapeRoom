'use client'

import Link from 'next/link'
import { useGameState } from '@/lib/gameState'

export default function Home() {
  const { state } = useGameState()
  const hasProgress = state.completedLevels.length > 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-excel-green to-excel-green-dark flex flex-col items-center justify-center p-4">
      <div className="text-center text-white mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Spreadsheet Escape Room
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Can you escape the cells?
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/level/1"
          className="bg-white text-excel-green font-bold py-4 px-8 rounded-lg text-center text-xl hover:bg-gray-100 transition-colors shadow-lg"
        >
          {hasProgress ? 'Continue' : 'Start Game'}
        </Link>

        <Link
          href="/levels"
          className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-center text-xl hover:bg-white/10 transition-colors"
        >
          Level Select
        </Link>
      </div>

      <div className="mt-12 text-white/70 text-sm">
        {hasProgress && (
          <p>Progress: {state.completedLevels.length} / 15 levels completed</p>
        )}
      </div>
    </main>
  )
}
