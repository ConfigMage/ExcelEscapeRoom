'use client'

import { isFormula, evaluateFormula, formatResult } from '@/lib/formulaEvaluator'

interface FormulaBarProps {
  selectedCell: {
    id: string
    value: string
    formula?: string
  } | null
  onValueChange: (value: string) => void
  allCellValues?: Record<string, string>
}

export function FormulaBar({ selectedCell, onValueChange, allCellValues = {} }: FormulaBarProps) {
  const value = selectedCell?.formula || selectedCell?.value || ''
  const hasUserFormula = isFormula(value) && !selectedCell?.formula

  // Calculate evaluated result for user-entered formulas
  const evaluatedResult = hasUserFormula
    ? formatResult(evaluateFormula(value, allCellValues))
    : null

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
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Select a cell"
        className="flex-1 h-10 px-2 font-mono text-sm bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
        readOnly={!selectedCell || !!selectedCell.formula}
      />

      {/* Show evaluated result for formulas */}
      {evaluatedResult && (
        <div className="px-3 h-10 flex items-center border-l border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">=</span>
          <span className="font-mono text-sm font-semibold text-excel-green">{evaluatedResult}</span>
        </div>
      )}
    </div>
  )
}
