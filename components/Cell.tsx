'use client'

import { memo } from 'react'
import { CellData } from '@/lib/types'
import { isFormula, evaluateFormula, formatResult } from '@/lib/formulaEvaluator'

interface CellProps {
  cell: CellData
  cellId: string
  value: string
  isSelected: boolean
  isComplete: boolean
  onSelect: (cellId: string) => void
  onChange: (cellId: string, value: string) => void
  allCellValues?: Record<string, string>
}

export const Cell = memo(function Cell({
  cell,
  cellId,
  value,
  isSelected,
  isComplete,
  onSelect,
  onChange,
  allCellValues = {},
}: CellProps) {
  const isEditable = cell.type === 'input' && !isComplete

  // Get display value - evaluate formula if needed
  const getDisplayValue = () => {
    if (cell.displayFormula) return cell.formula || value

    // For input cells with formulas, show evaluated result when not selected
    if (cell.type === 'input' && isFormula(value) && !isSelected) {
      const result = evaluateFormula(value, allCellValues)
      return formatResult(result)
    }

    return value
  }

  const displayValue = getDisplayValue()
  const hasFormula = isFormula(value)

  const getCellBackground = () => {
    if (isComplete && cell.type === 'input') {
      return 'bg-cell-success'
    }
    switch (cell.type) {
      case 'input':
        return 'bg-cell-editable'
      case 'locked':
        return 'bg-cell-locked'
      case 'error':
        return 'bg-cell-error'
      default:
        return 'bg-white dark:bg-gray-800'
    }
  }

  return (
    <div
      className={`
        relative h-10 border border-gray-300 dark:border-gray-600
        flex items-center justify-center
        ${getCellBackground()}
        ${isSelected ? 'ring-2 ring-excel-green ring-inset' : ''}
        ${isEditable ? 'cursor-text' : 'cursor-default'}
        transition-all
      `}
      onClick={() => onSelect(cellId)}
    >
      {isEditable && isSelected ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(cellId, e.target.value)}
          className={`
            w-full h-full px-2 text-center bg-transparent
            focus:outline-none
            ${hasFormula ? 'font-mono text-blue-600 text-sm' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      ) : isEditable ? (
        <span
          className={`
            px-2 truncate w-full text-center
            ${hasFormula ? 'text-gray-700' : ''}
          `}
        >
          {displayValue}
        </span>
      ) : (
        <span
          className={`
            px-2 truncate
            ${cell.formula ? 'font-mono text-gray-500 text-sm' : ''}
          `}
        >
          {displayValue}
        </span>
      )}
    </div>
  )
})
