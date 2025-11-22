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
      <div style={{ width: '100%', height: '320px' }}>
        <svg width="100%" height="100%" viewBox="0 0 560 320">
          {/** Add explicit margins so labels aren't clipped in PNG export */}
          {(() => {
            const margin = { top: 20, right: 50, bottom: 55, left: 110 };
            const innerWidth = 560 - margin.left - margin.right;
            const innerHeight = 320 - margin.top - margin.bottom;
            const axisX = margin.left; // vertical axis x position
            const radius = 14;
            const scaleEnd = margin.left + innerWidth - radius; // leave room for circle edge
            const scaleWidth = scaleEnd - axisX;
            const bottomY = margin.top + innerHeight;
            const rowStart = margin.top + 20;
            const rowGap = 36;
            return (
              <g>

                {[0,20,40,60,80,100].map(v => {
                  const gx = axisX + (v/100)*scaleWidth;
                  return (
                    <g key={`grid-${v}`}>
                      <line x1={gx} y1={margin.top} x2={gx} y2={bottomY} stroke="#e5e7eb" strokeDasharray="2 2" />
                      <text x={gx} y={bottomY + 20} fontSize="12" textAnchor="middle" fill="#6b7280">{v}%</text>
                    </g>
                  );
                })}
                {/* Axes */}
                <line x1={axisX} y1={margin.top} x2={axisX} y2={bottomY+1} stroke="#9ca3af" strokeWidth="2" />
                <line x1={axisX} y1={bottomY} x2={scaleEnd} y2={bottomY} stroke="#9ca3af" strokeWidth="2" />
                <text x={axisX + scaleWidth/2} y={bottomY + 40} fontSize="14" fill="#374151" fontWeight="bold" textAnchor="middle">Accuracy (%)</text>
                {data.map((item, index) => {
                  const y = rowStart + index * rowGap;
                  const valueX = axisX + (item.accuracy / 100) * scaleWidth;
                  const cx = valueX; // keep center at value, room exists to right
                  const stemEndX = cx;
                  const displayVal = Math.round(item.accuracy);
                  const circleColor = colors[index];
                  return (
                    <g key={index}>
                      <text x={axisX - 12} y={y + 4} fontSize="12" fill="#374151" textAnchor="end">{item.model}</text>
                      <line x1={axisX+1} y1={y} x2={stemEndX - radius} y2={y} stroke={circleColor} strokeWidth="3" strokeLinecap="round" />
                      <circle cx={cx - radius} cy={y} r={radius} fill={circleColor} />
                      <text x={cx - radius} y={y + 4} fontSize="12" fontWeight="600" textAnchor="middle" fill="#000">{displayVal}%</text>
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
