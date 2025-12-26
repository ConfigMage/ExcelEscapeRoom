'use client'

interface FormulaBarProps {
  selectedCell: {
    id: string
    value: string
    formula?: string
  } | null
  onValueChange: (value: string) => void
}

export function FormulaBar({ selectedCell, onValueChange }: FormulaBarProps) {
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 overflow-hidden">
      {/* Cell reference */}
      <div className="w-16 h-10 bg-gray-100 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 flex items-center justify-center font-mono text-sm font-semibold text-gray-600 dark:text-gray-300">
        {selectedCell?.id || ''}
      </div>

      {/* fx indicator */}
      <div className="px-3 text-gray-400 italic text-sm">
        fx
      </div>

      {/* Formula/value input */}
      <input
        type="text"
        value={selectedCell?.formula || selectedCell?.value || ''}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Select a cell"
        className="flex-1 h-10 px-2 font-mono text-sm bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
        readOnly={!selectedCell || !!selectedCell.formula}
      />
    </div>
  )
}
