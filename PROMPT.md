# Spreadsheet Escape Room - Claude Code Prompt

## Project Overview
Build a web-based puzzle game called "Spreadsheet Escape Room" where players solve increasingly complex spreadsheet-themed puzzles to progress through levels. Target audience: Excel power users who eat VLOOKUP for breakfast and dream in INDEX/MATCH.

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useReducer, useContext)
- **Deployment**: Vercel
- **Storage**: Browser localStorage for progress, optional Vercel KV for leaderboard

## Core Features

### 1. Puzzle Types (6 varieties across 15 levels)
- **Formula Fixer**: Fix broken formulas to get correct output
- **Pattern Detective**: Figure out the pattern and fill in missing values
- **VLOOKUP/INDEX-MATCH Challenge**: Lookup logic puzzles
- **Conditional Logic**: Apply formatting rules mentally, predict colors
- **Reference Maze**: Trace chains of cell references to find final values
- **Reverse Engineering**: Deduce the formula from input/output pairs

### 2. Game Mechanics
- **15 levels** of increasing difficulty (see Level Progression below)
- Timer per level with par times
- **Hint system** (3 hints per level, progressive reveal, affects star rating)
- Star rating (1-3 stars based on time + hints used)
- Progress saved to localStorage
- Unlockable achievements

### 3. UI/UX Requirements
- Mobile-first responsive design
- Spreadsheet-aesthetic UI (grid lines, cell selection highlighting, formula bar)
- Satisfying animations on correct answers (cells lighting up, confetti for level complete)
- Dark mode support (like Excel's dark theme)
- Sound effects (optional, toggleable) - cell click, success chime, error buzz

### 4. Spreadsheet Grid Component
Build a reusable `<SpreadsheetGrid>` component that:
- Displays rows/columns with Excel-style headers (A, B, C... and 1, 2, 3...)
- Supports cell selection with highlight
- Shows formula bar when cell is selected
- Allows cell editing for puzzle input
- Supports conditional formatting (cell background colors)
- Can mark cells as "locked" (gray, non-editable) vs "input" cells (yellow highlight)
- Displays formulas in cells when relevant (monospace, gray text)

### 5. Hint System (IMPORTANT)
Each level has exactly 3 hints with progressive specificity:

**Hint Progression:**
- Hint 1: Nudge in the right direction (vague, conceptual)
- Hint 2: More specific guidance (identifies the area/issue)  
- Hint 3: Nearly gives it away (specific steps, but not exact answer)

**Scoring Impact:**
- 0 hints used: Eligible for 3 stars
- 1 hint used: Maximum 2 stars
- 2 hints used: Maximum 1 star
- 3 hints used: Level complete, 0 bonus stars

**UI Requirements:**
- Hint button in puzzle area showing "💡 Hints (3 left)"
- Hints must be revealed in order (can't skip to hint 3)
- Confirmation dialog: "Use a hint? This will affect your star rating."
- Show star impact preview before revealing
- Revealed hints stay revealed on retry
- Subtle pulse animation on hint button after 60 seconds idle

**Star Calculation:**
```typescript
function calculateStars(timeSeconds: number, parTime: number, hintsUsed: number): number {
  let maxStars = 3 - hintsUsed;
  if (maxStars < 0) maxStars = 0;
  
  if (maxStars > 0) {
    if (timeSeconds > parTime * 1.5) maxStars = Math.min(maxStars, 2);
    if (timeSeconds > parTime * 2) maxStars = Math.min(maxStars, 1);
  }
  return Math.max(0, maxStars);
}
```

---

## Level Progression (15 Levels)

| Tier | Levels | Difficulty | Skills Tested |
|------|--------|------------|---------------|
| Warm-Up | 1-3 | Beginner | SUM, patterns, reference tracing |
| Foundation | 4-5 | Beginner+ | VLOOKUP, conditional formatting rules |
| Intermediate | 6-8 | Intermediate | INDEX/MATCH 2D, nested IFs, SUMPRODUCT |
| Advanced | 9-11 | Advanced | Reverse engineering, error propagation, formula golf |
| Expert | 12-13 | Expert | LET function, dynamic arrays (FILTER/SORT) |
| Boss Battles | 14-15 | Expert+ | Circular references, IEEE 754 floating point |

---

## Level Definitions

### LEVEL 1: "The Broken SUM"
**Type:** Formula Fixer | **Par:** 30s | **Difficulty:** Beginner

**Story:** "It's Monday morning. Your coworker Karen left for a 2-week cruise and her Q3 expense report is due TODAY. The totals aren't adding up..."

**Grid:** Expense table with 4 items. Total cell shows wrong value because formula is `=B2+B3` instead of `=SUM(B2:B5)`.

**Solution:** Fix formula to `=SUM(B2:B5)` → $984

**Hints:**
1. "The formula is only adding some of the cells..."
2. "You need to include ALL expense amounts (B2 through B5)"
3. "Try using =SUM(B2:B5) to add the entire range"

---

### LEVEL 2: "Pattern Recognition"
**Type:** Pattern Detective | **Par:** 45s | **Difficulty:** Beginner

**Story:** "The new intern was auto-filling a sequence but got interrupted by a fire drill."

**Grid:** Sequence showing 2, 4, 8, 16, ?, ?

**Solution:** 32 and 64 (powers of 2, each value doubles)

**Hints:**
1. "Look at how each value relates to the one before it"
2. "Each value is being multiplied by the same number"
3. "It's doubling! Each value is 2× the previous"

---

### LEVEL 3: "Reference Runabout"
**Type:** Reference Maze | **Par:** 60s | **Difficulty:** Beginner

**Story:** "Someone thought it would be 'clever' to chain cell references across the sheet."

**Grid:** 3x3 with chain: A2=10 → B2=A2*2 → C2=B2+5 → A3=C2 → B3=A3-10 → C3=B3*3

**Solution:** 45 (trace: 10→20→25→25→15→45)

**Hints:**
1. "Start with A2 (10) and follow each reference step by step"
2. "A2=10 → B2=20 → C2=25 → A3=25 → B3=15 → C3=?"
3. "C3 = B3 * 3 = 15 * 3 = 45"

---

### LEVEL 4: "The Missing VLOOKUP"
**Type:** VLOOKUP Challenge | **Par:** 90s | **Difficulty:** Beginner+

**Story:** "HR needs to match employee IDs to their departments."

**Grid:** Employee table (ID, Name, Dept) with lookup request for ID 103.

**Solution:** "Marketing"

**Hints:**
1. "VLOOKUP searches the first column of a range for a value"
2. "Syntax: =VLOOKUP(lookup_value, table_range, column_number, FALSE)"
3. "Look up 103 in A2:C5, return column 3 (Dept)"

---

### LEVEL 5: "Conditional Chaos"
**Type:** Conditional Logic | **Par:** 45s | **Difficulty:** Beginner+

**Story:** "The boss wants cells highlighted based on performance: Green ≥90, Yellow 70-89, Red <70."

**Grid:** Performance scores with most cells colored. One cell (score 85) has unknown color.

**Solution:** Yellow (85 is in 70-89 range)

**Hints:**
1. "Look at the rules: Green ≥90, Yellow 70-89, Red <70"
2. "What is the value in the mystery cell? It's 85."
3. "85 falls in the 70-89 range = Yellow"

---

### LEVEL 6: "INDEX/MATCH Inception"
**Type:** Formula Fixer | **Par:** 120s | **Difficulty:** Intermediate

**Story:** "The finance team refuses to use VLOOKUP because 'it's for amateurs.' Their INDEX/MATCH is returning #N/A."

**Grid:** Commission rate table (Region × Tier). 2D lookup for West/Gold.

**Bug:** Column MATCH searches A1:E1 (includes empty corner) instead of B1:E1

**Solution:** 10%

**Hints:**
1. "The INDEX range and MATCH ranges need to align. Is the column MATCH looking in the right place?"
2. "The tier headers are in row 1, but the column MATCH includes the empty corner cell"
3. "Fix the column MATCH to search B1:E1 instead of A1:E1"

---

### LEVEL 7: "The Nested Nightmare"
**Type:** Formula Fixer | **Par:** 90s | **Difficulty:** Intermediate

**Story:** "Someone wrote a grading formula with 5 nested IFs. It returns 'ERROR' for score 58."

**Formula:** `=IF(A2>=90,"A",IF(A2>=80,"B",IF(A2>=70,"C",IF(A2>=60,"D","ERROR"))))`

**Solution:** F (the else case should be "F", not "ERROR")

**Hints:**
1. "Walk through the IF logic: >=90=A, >=80=B, >=70=C, >=60=D... what about below 60?"
2. "The formula returns 'ERROR' when score is below 60 — but that should be a grade"
3. "Score 58 is below 60, so correct answer is F"

---

### LEVEL 8: "The SUMPRODUCT Saga"
**Type:** Formula Fixer | **Par:** 120s | **Difficulty:** Intermediate

**Story:** "Marketing wants total sales for 'Widget' in 'West' region. Time for SUMPRODUCT wizardry."

**Grid:** Sales data with Product, Region, Sales columns. Multiple Widget/West entries.

**Solution:** 3700 (sum of Widget+West rows: 1500+2200)

**Hints:**
1. "SUMPRODUCT multiplies arrays and sums. Boolean TRUE=1, FALSE=0"
2. "Formula: =SUMPRODUCT((condition1)*(condition2)*(values))"
3. "Widget+West rows have sales 1500 and 2200. Sum = 3700"

---

### LEVEL 9: "Reverse Engineer This"
**Type:** Pattern Detective | **Par:** 180s | **Difficulty:** Advanced

**Story:** "The consultant left no documentation. You have inputs and outputs but the formula is corrupted."

**Grid:** Input/output pairs where formula is 2*A + B:
- 10, 5 → 25
- 8, 3 → 19
- 15, 7 → 37
- 20, 10 → 50
- 6, 4 → 16
- 12, 8 → ?

**Solution:** 32

**Hints:**
1. "Test basic operations on each row. A+B? A*B? Something with both?"
2. "Try A*2: 20, 16, 30, 40, 12 — compare to C. What's the difference?"
3. "Formula is 2*A + B. Test: 2*12 + 8 = 32"

---

### LEVEL 10: "The Error Detective"
**Type:** Reference Maze | **Par:** 150s | **Difficulty:** Advanced

**Story:** "The entire financial model shows #REF! errors cascading. Find Patient Zero."

**Grid:** Multiple cells with #REF! that all trace back to one cell containing `=Z99`.

**Solution:** B2 (contains reference to non-existent cell)

**Hints:**
1. "Trace backwards. Which #REF! doesn't depend on another error cell?"
2. "C2→B2, D2→C2, B3→C2... they all trace back to one cell"
3. "B2 contains =Z99 — reference to non-existent cell. B2 is Patient Zero."

---

### LEVEL 11: "Formula Golf"
**Type:** Formula Fixer | **Par:** 120s | **Difficulty:** Advanced

**Story:** "The intern's formula is 127 characters. Same output, fewer characters."

**Original:** `=IF(AND(B2>=18,B3>=70,B4="Active"),"Yes",IF(OR(B2<18,B3<70,B4<>"Active"),"No","No"))`

**Solution:** 43 characters (the IF(OR(...)) is redundant)

**Optimized:** `=IF(AND(B2>=18,B3>=70,B4="Active"),"Yes","No")`

**Hints:**
1. "The IF(OR(...)) part is redundant. If AND is false, what's the only possibility?"
2. "Simplify to: =IF(AND(conditions),\"Yes\",\"No\")"
3. "Optimized formula is 43 characters"

---

### LEVEL 12: "The LET Labyrinth"
**Type:** Reference Maze | **Par:** 90s | **Difficulty:** Expert

**Story:** "Someone discovered LET and went wild. Trace the variables."

**Formula:**
```
=LET(
  x, A1*2,     // x = 10*2 = 20
  y, x+B1,     // y = 20+5 = 25
  z, y*C1,     // z = 25*3 = 75
  z-x+y        // 75-20+25 = ?
)
```
Cell values: A1=10, B1=5, C1=3

**Solution:** 55

**Hints:**
1. "Work through each variable. Start with x = A1*2 = ?"
2. "x=20, y=25, z=75. Now calculate z-x+y"
3. "75 - 20 + 25 = 55"

---

### LEVEL 13: "Dynamic Array Dynamics"
**Type:** Formula Fixer | **Par:** 120s | **Difficulty:** Expert

**Story:** "Predict what this FILTER/SORT combo returns."

**Formula:** `=SORT(FILTER(A2:C7,B2:B7="Sales"),3,-1)`

**Grid:** 6 employees, 4 in Sales with varying sales figures.

**Solution:** 4 rows, first cell = "Frank" (highest sales in Sales dept)

**Hints:**
1. "FILTER returns only Sales dept rows. How many?"
2. "4 Sales people. SORT orders by column 3 descending (-1)"
3. "Sorted: Frank(80k), Carol(75k), Alice(50k), Dave(45k). First = Frank"

---

### LEVEL 14: "The Circular Conundrum" (BOSS)
**Type:** Reference Maze | **Par:** 180s | **Difficulty:** Expert+

**Story:** "BOSS LEVEL: Intentional circular reference with iterative calculation enabled."

**Setup:** A1 = (A1 + B1) / 2, B1 = 100, Initial A1 = 0

**Iteration trace:** 0 → 50 → 75 → 87.5 → 93.75 → converges...

**Solution:** 100 (Zeno's paradox — approaches B1's value)

**Hints:**
1. "Each iteration: A1 moves halfway toward 100. What's the limit?"
2. "Sequence: 0 → 50 → 75 → 87.5 → 93.75... approaching what?"
3. "Zeno's paradox! A1 converges to B1 = 100"

---

### LEVEL 15: "The Final Audit" (FINAL BOSS)
**Type:** Formula Fixer | **Par:** 240s | **Difficulty:** Expert+

**Story:** "FINAL BOSS: Auditor found $0.01 discrepancy compounding across 10,000 transactions. Find the floating-point bug."

**Setup:** Price calc with tax (8.25%), discount, shipping. Displayed total looks right but has precision error at 17 decimal places.

**Bug:** Cell multiplying by 0.0825 — IEEE 754 can't represent this exactly in binary.

**Solution:** B2 (the tax calculation cell)

**Hints:**
1. "Floating point errors occur with decimal multiplication. Which cell?"
2. "Tax: $59.97 × 8.25% involves 0.0825 — notorious for precision issues"
3. "B2 multiplies by 0.0825. In binary, this can't be represented exactly."

---

## Screens/Routes
- `/` - Landing page with "Start Game" and "Continue" buttons
- `/level/[id]` - Individual puzzle level
- `/levels` - Level select grid showing stars earned, locked/unlocked status
- `/achievements` - Badges and stats
- `/leaderboard` - (stretch goal) Global or local high scores

## Design Aesthetic
- Color palette: Excel green (#217346), white cells, subtle gray gridlines
- Editable cells: Yellow highlight (#ffffcc)
- Error cells: Red highlight (#ffcccc)
- Success cells: Green highlight (#c6efce)
- Font: Clean sans-serif, monospace for formula bar
- Celebrate "spreadsheet nerd" identity with fun copy and Easter eggs

## File Structure
```
/app
  /page.tsx (landing)
  /levels/page.tsx (level select)
  /level/[id]/page.tsx (puzzle screen)
  /achievements/page.tsx
/components
  /SpreadsheetGrid.tsx
  /FormulaBar.tsx
  /Cell.tsx
  /LevelCard.tsx
  /Timer.tsx
  /HintSystem.tsx (hint button + modal + reveal logic)
  /StarRating.tsx
  /ConfettiEffect.tsx
/lib
  /levels.ts (all 15 level definitions)
  /gameState.tsx (context/reducer for game state)
  /achievements.ts (achievement definitions)
  /utils.ts (formula parsing, cell ref helpers, star calculation)
/public
  /sounds (optional)
```

## Getting Started Commands
```bash
npx create-next-app@latest spreadsheet-escape-room --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd spreadsheet-escape-room
```

## Session Continuity
After each major feature completion, update CLAUDE.md with:
- What was built
- Current state of the project
- Next steps
- Any known issues or TODOs

## Auto-Permissions Note
This project will need filesystem access for creating components and running dev server. Ensure .claude/settings.json is configured appropriately.
