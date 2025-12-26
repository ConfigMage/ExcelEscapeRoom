export type CellType = 'normal' | 'input' | 'locked' | 'error'

export interface CellData {
  value: string
  type: CellType
  formula?: string
  displayFormula?: boolean
}

export type PuzzleType =
  | 'formula-fixer'
  | 'pattern-detective'
  | 'vlookup-challenge'
  | 'conditional-logic'
  | 'reference-maze'
  | 'reverse-engineering'

export type Difficulty = 'beginner' | 'beginner+' | 'intermediate' | 'advanced' | 'expert' | 'expert+'

export interface Level {
  id: number
  title: string
  type: PuzzleType
  difficulty: Difficulty
  parTime: number // in seconds
  story: string
  grid: CellData[][]
  solution: Record<string, string | string[]> // Can be single value or array of acceptable answers
  hints: [string, string, string]
}

export interface GameState {
  completedLevels: number[]
  levelStars: Record<number, number>
  levelTimes: Record<number, number>
  totalStars: number
  achievements: string[]
}

export type GameAction =
  | { type: 'COMPLETE_LEVEL'; levelId: number; stars: number; time: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'RESET_PROGRESS' }
