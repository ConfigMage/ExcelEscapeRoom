// Formula evaluator for spreadsheet formulas

type CellValues = Record<string, string>

// Parse a cell reference like "B2" into column and row
function parseCellRef(ref: string): { col: string; row: number } | null {
  const match = ref.match(/^([A-Z]+)(\d+)$/i)
  if (!match) return null
  return { col: match[1].toUpperCase(), row: parseInt(match[2]) }
}

// Generate all cell references in a range like "B2:B5"
function expandRange(range: string): string[] {
  const parts = range.split(':')
  if (parts.length !== 2) return [range]

  const start = parseCellRef(parts[0].trim())
  const end = parseCellRef(parts[1].trim())

  if (!start || !end) return [range]

  const cells: string[] = []
  const startCol = start.col.charCodeAt(0)
  const endCol = end.col.charCodeAt(0)
  const startRow = start.row
  const endRow = end.row

  for (let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
    for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
      cells.push(`${String.fromCharCode(col)}${row}`)
    }
  }

  return cells
}

// Get numeric value from a cell, evaluating if it's a formula
function getCellNumericValue(cellId: string, cellValues: CellValues, visited: Set<string> = new Set()): number {
  if (visited.has(cellId)) {
    return NaN // Circular reference
  }

  const value = cellValues[cellId]
  if (value === undefined || value === '') return 0

  // If it's a formula, evaluate it
  if (value.startsWith('=')) {
    visited.add(cellId)
    const result = evaluateFormula(value, cellValues, visited)
    visited.delete(cellId)
    return result
  }

  // Try to parse as number (remove currency symbols, commas, %)
  const cleaned = value.replace(/[$,]/g, '').replace(/%$/, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

// Get raw value from a cell (for non-numeric operations)
function getCellValue(cellId: string, cellValues: CellValues): string {
  return cellValues[cellId] || ''
}

// Evaluate SUM function
function evalSum(args: string, cellValues: CellValues, visited: Set<string>): number {
  const parts = args.split(',').map(s => s.trim())
  let sum = 0

  for (const part of parts) {
    if (part.includes(':')) {
      // Range reference
      const cells = expandRange(part)
      for (const cell of cells) {
        sum += getCellNumericValue(cell, cellValues, visited)
      }
    } else if (parseCellRef(part)) {
      // Single cell reference
      sum += getCellNumericValue(part, cellValues, visited)
    } else {
      // Direct number
      const num = parseFloat(part)
      if (!isNaN(num)) sum += num
    }
  }

  return sum
}

// Evaluate AVERAGE function
function evalAverage(args: string, cellValues: CellValues, visited: Set<string>): number {
  const parts = args.split(',').map(s => s.trim())
  let sum = 0
  let count = 0

  for (const part of parts) {
    if (part.includes(':')) {
      const cells = expandRange(part)
      for (const cell of cells) {
        const val = getCellNumericValue(cell, cellValues, visited)
        if (!isNaN(val)) {
          sum += val
          count++
        }
      }
    } else if (parseCellRef(part)) {
      const val = getCellNumericValue(part, cellValues, visited)
      if (!isNaN(val)) {
        sum += val
        count++
      }
    } else {
      const num = parseFloat(part)
      if (!isNaN(num)) {
        sum += num
        count++
      }
    }
  }

  return count > 0 ? sum / count : 0
}

// Evaluate COUNT function
function evalCount(args: string, cellValues: CellValues): number {
  const parts = args.split(',').map(s => s.trim())
  let count = 0

  for (const part of parts) {
    if (part.includes(':')) {
      const cells = expandRange(part)
      for (const cell of cells) {
        const val = getCellValue(cell, cellValues)
        if (val !== '' && !isNaN(parseFloat(val.replace(/[$,]/g, '')))) {
          count++
        }
      }
    } else if (parseCellRef(part)) {
      const val = getCellValue(part, cellValues)
      if (val !== '' && !isNaN(parseFloat(val.replace(/[$,]/g, '')))) {
        count++
      }
    }
  }

  return count
}

// Evaluate MAX function
function evalMax(args: string, cellValues: CellValues, visited: Set<string>): number {
  const parts = args.split(',').map(s => s.trim())
  let max = -Infinity

  for (const part of parts) {
    if (part.includes(':')) {
      const cells = expandRange(part)
      for (const cell of cells) {
        const val = getCellNumericValue(cell, cellValues, visited)
        if (!isNaN(val) && val > max) max = val
      }
    } else if (parseCellRef(part)) {
      const val = getCellNumericValue(part, cellValues, visited)
      if (!isNaN(val) && val > max) max = val
    } else {
      const num = parseFloat(part)
      if (!isNaN(num) && num > max) max = num
    }
  }

  return max === -Infinity ? 0 : max
}

// Evaluate MIN function
function evalMin(args: string, cellValues: CellValues, visited: Set<string>): number {
  const parts = args.split(',').map(s => s.trim())
  let min = Infinity

  for (const part of parts) {
    if (part.includes(':')) {
      const cells = expandRange(part)
      for (const cell of cells) {
        const val = getCellNumericValue(cell, cellValues, visited)
        if (!isNaN(val) && val < min) min = val
      }
    } else if (parseCellRef(part)) {
      const val = getCellNumericValue(part, cellValues, visited)
      if (!isNaN(val) && val < min) min = val
    } else {
      const num = parseFloat(part)
      if (!isNaN(num) && num < min) min = num
    }
  }

  return min === Infinity ? 0 : min
}

// Replace cell references in an expression with their values
function substituteCellRefs(expr: string, cellValues: CellValues, visited: Set<string>): string {
  // Replace cell references (e.g., A1, B2) with their numeric values
  return expr.replace(/([A-Z]+)(\d+)/gi, (match) => {
    const val = getCellNumericValue(match.toUpperCase(), cellValues, visited)
    return isNaN(val) ? '0' : val.toString()
  })
}

// Safely evaluate a mathematical expression
function safeEval(expr: string): number {
  try {
    // Only allow numbers, operators, parentheses, and spaces
    const sanitized = expr.replace(/[^0-9+\-*/().%\s]/g, '')
    if (!sanitized) return NaN

    // Handle percentage
    const withPercent = sanitized.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)')

    // Use Function constructor for safer eval
    const result = new Function(`return (${withPercent})`)()
    return typeof result === 'number' ? result : NaN
  } catch {
    return NaN
  }
}

// Main formula evaluator
export function evaluateFormula(
  formula: string,
  cellValues: CellValues,
  visited: Set<string> = new Set()
): number {
  if (!formula.startsWith('=')) {
    const num = parseFloat(formula.replace(/[$,]/g, ''))
    return isNaN(num) ? 0 : num
  }

  const expr = formula.slice(1).trim()

  // Handle function calls
  const funcMatch = expr.match(/^([A-Z]+)\s*\((.*)\)$/i)
  if (funcMatch) {
    const funcName = funcMatch[1].toUpperCase()
    const args = funcMatch[2]

    switch (funcName) {
      case 'SUM':
        return evalSum(args, cellValues, visited)
      case 'AVERAGE':
      case 'AVG':
        return evalAverage(args, cellValues, visited)
      case 'COUNT':
        return evalCount(args, cellValues)
      case 'MAX':
        return evalMax(args, cellValues, visited)
      case 'MIN':
        return evalMin(args, cellValues, visited)
      default:
        return NaN
    }
  }

  // Handle arithmetic expressions with cell references
  const substituted = substituteCellRefs(expr, cellValues, visited)
  return safeEval(substituted)
}

// Format the result for display
export function formatResult(value: number): string {
  if (isNaN(value)) return '#ERROR'
  if (!isFinite(value)) return '#ERROR'

  // Round to avoid floating point issues
  const rounded = Math.round(value * 1000000) / 1000000

  // Check if it's a whole number
  if (Number.isInteger(rounded)) {
    return rounded.toString()
  }

  // Otherwise format with reasonable precision
  return rounded.toString()
}

// Check if a value is a formula
export function isFormula(value: string): boolean {
  return value.trim().startsWith('=')
}

// Get the display value for a cell (evaluate formula if needed)
export function getDisplayValue(
  cellId: string,
  cellValues: CellValues
): string {
  const value = cellValues[cellId]
  if (!value) return ''

  if (isFormula(value)) {
    const result = evaluateFormula(value, cellValues)
    return formatResult(result)
  }

  return value
}
