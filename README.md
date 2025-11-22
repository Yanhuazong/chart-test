# Model Accuracy Chart (React + Vite)

Single-page React app bootstrapped with Vite displaying a bar chart comparing model accuracies.

## Getting Started

```powershell
npm install
npm run dev
```
Open the printed local URL (default http://localhost:5173).

## Structure

- `src/App.jsx` entry component renders heading and `ModelAccuracyChart`.
- `src/ModelAccuracyChart.jsx` pure presentational component. Heights are proportional to max accuracy.
- `src/App.css` contains layout and chart styles (bars, labels, legend).
- `vite.config.js` configures React plugin.

## Data Customization
Modify the `data` array in `src/App.jsx` to add/remove models or change accuracy values. Component recalculates proportional heights automatically.

## Build & Preview
```powershell
npm run build
npm run preview
```

## Accessibility Notes
- Each bar has `aria-label` describing model + accuracy.
- Value badges use high contrast background.

## Future Enhancements (Optional)
- Add sorting controls (e.g., ascending/descending accuracy).
- Add tooltip with additional metrics (precision/recall).
- Extract data to external JSON or API fetch.

## License
Placeholder – add license information if needed.
