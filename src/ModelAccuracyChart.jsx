import React, { useMemo } from 'react'

function ModelAccuracyChart({ data }) {
  const max = useMemo(() => Math.max(...data.map(d => d.accuracy)), [data])

  return (
    <div className="chart-wrapper">
      <div className="chart-bars">
        {data.map(d => {
          const heightPct = (d.accuracy / max) * 100
          return (
            <div className="bar" key={d.model}>
              <div
                className="bar-rect"
                style={{ height: `${heightPct}%` }}
                aria-label={`${d.model} accuracy ${d.accuracy}%`}
                role="img"
              >
                <span className="bar-value">{d.accuracy.toFixed(2)}%</span>
              </div>
              <div className="bar-label">{d.model}</div>
            </div>
          )
        })}
      </div>
      <div className="legend"><span className="legend-swatch" /> Accuracy (%)</div>
    </div>
  )
}

export default ModelAccuracyChart
