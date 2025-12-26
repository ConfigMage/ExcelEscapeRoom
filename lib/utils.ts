export function calculateStars(
  timeSeconds: number,
  parTime: number,
  hintsUsed: number
): number {
  let maxStars = 3 - hintsUsed
  if (maxStars < 0) maxStars = 0

  if (maxStars > 0) {
    if (timeSeconds > parTime * 1.5) maxStars = Math.min(maxStars, 2)
    if (timeSeconds > parTime * 2) maxStars = Math.min(maxStars, 1)
  }
  return Math.max(0, maxStars)
}

export function columnToLetter(col: number): string {
  return String.fromCharCode(65 + col)
}

export function letterToColumn(letter: string): number {
  return letter.charCodeAt(0) - 65
}

export function cellIdToCoords(cellId: string): { col: number; row: number } {
  const col = letterToColumn(cellId.charAt(0))
  const row = parseInt(cellId.slice(1)) - 1
  return { col, row }
}

export function coordsToCellId(col: number, row: number): string {
  return `${columnToLetter(col)}${row + 1}`
}
