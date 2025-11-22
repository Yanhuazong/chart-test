import React from 'react';
import { Download } from 'lucide-react';

const LollipopChartViz = ({ data, colors, chartRef, isSelected, onSelect, onDownload }) => {
  return (
    <div 
      ref={chartRef}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow relative"
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Lollipop Chart</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <svg width="100%" height="100%" viewBox="0 0 500 300">
          {/** Reduced left/right space: shift axis left from 120->80 and extend scale to 380 (was right 420) */}
          {(() => {
            const axisX = 80; // left axis x
            const scaleEnd = 460; // extend further right (previous 420) to use space
            const scaleWidth = scaleEnd - axisX; // dynamic width
            const top = 20;
            const bottom = 250;
            const radius = 14;
            const rowStart = 40;
            const rowGap = 36;
            return (
              <g>
                {[0,20,40,60,80,100].map(v => {
                  const gx = axisX + (v/100)*scaleWidth;
                  return (
                    <g key={`grid-${v}`}>
                      <line x1={gx} y1={top} x2={gx} y2={bottom} stroke="#e5e7eb" strokeDasharray="2 2" />
                      <text x={gx} y={bottom + 15} fontSize="12" textAnchor="middle" fill="#6b7280">{v}%</text>
                    </g>
                  );
                })}
                {/* Axes */}
                <line x1={axisX} y1={top} x2={axisX} y2={bottom} stroke="#9ca3af" strokeWidth="2" />
                <line x1={axisX} y1={bottom} x2={scaleEnd} y2={bottom} stroke="#9ca3af" strokeWidth="2" />
                <text x={axisX + scaleWidth/2} y={bottom + 35} fontSize="14" fill="#374151" fontWeight="bold" textAnchor="middle">Accuracy (%)</text>
                {data.map((item, index) => {
                  const y = rowStart + index * rowGap;
                  const valueX = axisX + (item.accuracy / 100) * scaleWidth;
                  const cx = valueX - radius; // right edge indicates value
                  const stemEndX = cx;
                  const displayVal = Math.round(item.accuracy);
                  const circleColor = colors[index];
                  return (
                    <g key={index}>
                      <text x={axisX - 8} y={y + 4} fontSize="12" fill="#374151" textAnchor="end">{item.model}</text>
                      <line x1={axisX} y1={y} x2={stemEndX} y2={y} stroke={circleColor} strokeWidth="3" strokeLinecap="round" />
                      <circle cx={cx} cy={y} r={radius} fill={circleColor} />
                      <text x={cx} y={y + 4} fontSize="12" fontWeight="600" textAnchor="middle" fill="#000">{displayVal}%</text>
                    </g>
                  );
                })}
              </g>
            );
          })()}
        </svg>
      </div>
      {isSelected && (
        <button
          onClick={onDownload}
          className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Download size={20} />
        </button>
      )}
    </div>
  );
};

export default LollipopChartViz;
