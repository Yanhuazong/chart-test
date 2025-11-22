export default function LollipopChart({ data, max = Math.max(...data.map(d => d.accuracy)) }) {
  return (
    <div className="lollipop-wrapper">
      {data.map(d => {
        const pct = d.accuracy / max * 100
        return (
          <div className="lollipop-row" key={d.model}>
            <span className="lollipop-label">{d.model}</span>
            <div className="lollipop-track">
              <div className="lollipop-stem" style={{ width: pct + '%' }}>
                <span className="lollipop-dot" />
                <span className="lollipop-value">{d.accuracy.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}