'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react'
import { GameState, GameAction } from './types'

const STORAGE_KEY = 'spreadsheet-escape-room-progress'

const initialState: GameState = {
  completedLevels: [],
  levelStars: {},
  levelTimes: {},
  totalStars: 0,
  achievements: [],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'COMPLETE_LEVEL': {
      const { levelId, stars, time } = action
      const alreadyCompleted = state.completedLevels.includes(levelId)
      const existingStars = state.levelStars[levelId] || 0
      const newStars = Math.max(existingStars, stars)

      return {
        ...state,
        completedLevels: alreadyCompleted
          ? state.completedLevels
          : [...state.completedLevels, levelId],
        levelStars: {
          ...state.levelStars,
          [levelId]: newStars,
        },
        levelTimes: {
          ...state.levelTimes,
          [levelId]: Math.min(state.levelTimes[levelId] || Infinity, time),
        },
        totalStars: Object.values({
          ...state.levelStars,
          [levelId]: newStars,
        }).reduce((sum, s) => sum + s, 0),
      }
    }

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.achievementId)) {
        return state
      }
      return {
        ...state,
        achievements: [...state.achievements, action.achievementId],
      }
    }

    case 'RESET_PROGRESS':
      return initialState

    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | null>(null)

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState
        // Replay completed levels to restore state
        parsed.completedLevels.forEach((levelId) => {
          dispatch({
            type: 'COMPLETE_LEVEL',
            levelId,
            stars: parsed.levelStars[levelId] || 0,
            time: parsed.levelTimes[levelId] || 0,
          })
        })
      } catch {
        // Invalid saved state, start fresh
      }
    }
  }, [])

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameState() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
