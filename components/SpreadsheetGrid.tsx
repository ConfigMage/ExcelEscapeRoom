'use client'

import { memo } from 'react'
import { Cell } from './Cell'
import { CellData } from '@/lib/types'

interface SpreadsheetGridProps {
  grid: CellData[][]
  cellValues: Record<string, string>
  selectedCell: string | null
  onCellSelect: (cellId: string) => void
  onCellChange: (cellId: string, value: string) => void
  isComplete: boolean
}

export const SpreadsheetGrid = memo(function SpreadsheetGrid({
  grid,
  cellValues,
  selectedCell,
  onCellSelect,
  onCellChange,
  isComplete,
}: SpreadsheetGridProps) {
  const numCols = grid[0]?.length || 0
  const numRows = grid.length

  // Generate column headers (A, B, C, ...)
  const colHeaders = Array.from({ length: numCols }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid min-w-full"
        style={{
          gridTemplateColumns: `40px repeat(${numCols}, minmax(80px, 1fr))`,
        }}
      >
        {/* Empty corner cell */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />

        {/* Column headers */}
        {colHeaders.map((col) => (
          <div
            key={col}
            className="h-8 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center font-semibold text-gray-600 dark:text-gray-300 text-sm"
          >
            {col}
          </div>
        ))}

        {/* Rows */}
        {grid.map((row, rowIdx) => (
          <>
            {/* Row header */}
            <div
              key={`row-${rowIdx}`}
              className="h-10 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center font-semibold text-gray-600 dark:text-gray-300 text-sm"
            >
              {rowIdx + 1}
            </div>

            {/* Cells */}
            {row.map((cell, colIdx) => {
              const cellId = `${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`
              return (
                <Cell
                  key={cellId}
                  cell={cell}
                  cellId={cellId}
                  value={cellValues[cellId] || ''}
                  isSelected={selectedCell === cellId}
                  isComplete={isComplete}
                  onSelect={onCellSelect}
                  onChange={onCellChange}
                  allCellValues={cellValues}
                />
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
})
