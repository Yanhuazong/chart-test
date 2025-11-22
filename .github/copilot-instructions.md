# AI Coding Agent Instructions (React + Vite App)

## Overview
Single-page React application built with Vite. Core purpose: visualize comparative model accuracy via a custom bar chart. Lightweight stack, no global state manager.

## Key Files & Flow
- `index.html`: Root HTML; mounts React at `<div id="root">`.
- `src/main.jsx`: Bootstraps React (`createRoot`) and renders `App` within `StrictMode`.
- `src/App.jsx`: Top-level component: defines `data` array and renders heading + `ModelAccuracyChart`.
- `src/ModelAccuracyChart.jsx`: Pure chart component; calculates relative bar heights based on max accuracy.
- `src/App.css`: Consolidated styling for layout and chart visuals.
- `vite.config.js`: Vite configuration with React plugin.

## Data Pattern
Accuracy dataset is a plain array of objects: `{ model: string, accuracy: number }`. Heights computed: `heightPct = (accuracy / maxAccuracy) * 100`. If extending data with more metrics, keep chart component pure; pass new props (e.g. `precision`, `recall`).

## Styling Conventions
- All custom chart styles reside in `App.css` (keep chart-related classes prefixed with `.bar-` or `.chart-`).
- Prefer extending existing classes rather than adding global resets.

## Adding Features
Example: Sorting controls.
1. Add local state in `App.jsx` (`sortKey`, `ascending`).
2. Derive a sorted `displayData` array before passing to chart.
3. Keep `ModelAccuracyChart` stateless; never mutate props.

Example: Tooltip.
1. Wrap each bar in a `div` with `onMouseEnter` handler.
2. Maintain `hoverModel` state in parent.
3. Render positioned tooltip component at end of `App.jsx`.

## Accessibility
- Each bar uses `role="img"` and `aria-label` describing model + accuracy.
- Value badges: ensure sufficient contrast; maintain text sizing >= `0.7rem`.

## Build & Run
- Dev: `npm run dev`
- Production build: `npm run build` -> outputs to `dist/`
- Preview production: `npm run preview`

## Extension Guidelines
- Keep new visual components in `src/components/` (create directory if growth exceeds 3 components).
- Shared utilities (formatting numbers, sorting) go in `src/lib/` (create directory if needed).
- Avoid adding heavy chart libraries unless advanced features (scales, axes, tooltips) become complex.

## Performance Considerations
- Chart re-renders only when `data` array identity changes. Memoization of `max` via `useMemo` prevents redundant scans.
- If dataset grows large (>500 bars), switch layout to virtualized list or canvas rendering.

## Testing (To Establish)
No test setup yet. If adding tests, suggest `vitest` with files beside components: `ModelAccuracyChart.test.jsx`.

## Agent Behavior
- Before adding dependencies, inspect existing implementation; prefer enhancing CSS/JS first.
- Keep components pure and small; avoid coupling chart logic to global state.
- Use semantic HTML and ARIA for any interactive additions.
- Update this file when architectural boundaries (e.g., introduction of routing or global store) are added.

## Safe Modification Checklist
1. Read `App.jsx` and `ModelAccuracyChart.jsx` before refactor.
2. Confirm dev server runs (`npm run dev`).
3. Implement change in isolated component.
4. Validate visual output manually.

---
Feedback: Clarify if upcoming features include routing, state management, or API integration to expand guidelines.
