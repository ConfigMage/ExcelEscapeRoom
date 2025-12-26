# Spreadsheet Escape Room - Project Context

## Project Summary
A web-based puzzle game where players solve spreadsheet-themed challenges (fix formulas, find patterns, trace references) to progress through levels. Built for spreadsheet enthusiasts.

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Vercel deployment
- localStorage for game progress

## Current Status
🟢 **Core MVP Complete** - All 15 levels playable

## Completed Features
- [x] Project scaffolding (Next.js 14 + TypeScript + Tailwind)
- [x] SpreadsheetGrid component with Cell selection
- [x] FormulaBar component
- [x] Level data structure and types
- [x] All 15 puzzle levels defined
- [x] Game state management (Context + useReducer)
- [x] Level select screen with progress tracking
- [x] Puzzle screen with timer
- [x] Hint system with star impact
- [x] Star rating component
- [x] Progress persistence (localStorage)
- [ ] Achievements system
- [ ] Sound effects
- [ ] Dark mode toggle
- [ ] Confetti effect on level complete
- [ ] Leaderboard

## In Progress
*None - ready for playtesting*

## Next Steps
1. Add confetti animation on level complete
2. Implement achievements system
3. Add dark mode toggle
4. Add sound effects (optional, toggleable)
5. Mobile responsiveness polish
6. Deploy to Vercel

## Architecture Decisions
- Using React Context + useReducer for game state (not overkill of Redux)
- Levels defined as TypeScript objects in /lib/levels.ts for type safety
- Mobile-first responsive design
- localStorage for progress, no backend required initially
- All 15 levels implemented with progressive difficulty

## Known Issues
*None yet*

## File Locations
- Level definitions: `/lib/levels.ts`
- Game state: `/lib/gameState.tsx`
- Grid component: `/components/SpreadsheetGrid.tsx`
- Cell component: `/components/Cell.tsx`
- FormulaBar: `/components/FormulaBar.tsx`
- Types: `/lib/types.ts`
- Utilities: `/lib/utils.ts`

## Routes
- `/` - Landing page
- `/levels` - Level select grid
- `/level/[id]` - Individual puzzle level

## Testing Notes
- Test on mobile viewport sizes
- Verify localStorage persistence across sessions
- Check formula validation edge cases
- Test all 15 levels for correct solutions

## Deployment
- Target: Vercel
- No environment variables needed for MVP
- Optional: Vercel KV for leaderboard later

## Commands
```bash
npm run dev   # Start development server
npm run build # Production build
npm run start # Start production server
```

---
*Last updated: Core MVP complete with all 15 levels*
