'use client'

import { memo } from 'react'
import { CellData } from '@/lib/types'

interface CellProps {
  cell: CellData
  cellId: string
  value: string
  isSelected: boolean
  isComplete: boolean
  onSelect: (cellId: string) => void
  onChange: (cellId: string, value: string) => void
}

export const Cell = memo(function Cell({
  cell,
  cellId,
  value,
  isSelected,
  isComplete,
  onSelect,
  onChange,
}: CellProps) {
  const isEditable = cell.type === 'input' && !isComplete

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
      {isEditable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(cellId, e.target.value)}
          className={`
            w-full h-full px-2 text-center bg-transparent
            focus:outline-none
            ${cell.formula ? 'font-mono text-gray-500 text-sm' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span
          className={`
            px-2 truncate
            ${cell.formula ? 'font-mono text-gray-500 text-sm' : ''}
          `}
        >
          {cell.displayFormula ? cell.formula : value}
        </span>
      )}
    </div>
  )
})
