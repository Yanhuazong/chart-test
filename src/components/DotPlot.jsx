import React from 'react';
import { Download } from 'lucide-react';

const DotPlot = ({ data, colors, chartRef, isSelected, onSelect, onDownload }) => {
  return (
    <div 
      ref={chartRef}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow relative"
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Dot Plot</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <svg width="100%" height="100%" viewBox="0 0 500 300">
          {data.map((item, index) => {
            const y = 30 + index * 40;
            const x = 120 + (item.accuracy / 100) * 300;
            return (
              <g key={index}>
                <text x="10" y={y + 5} fontSize="12" fill="#374151">
                  {item.model}
                </text>
                <circle cx={x} cy={y} r="8" fill={colors[index]} />
                <text x={x + 15} y={y + 5} fontSize="12" fill="#374151">
                  {item.accuracy}%
                </text>
              </g>
            );
          })}
          <line x1="120" y1="10" x2="120" y2="260" stroke="#d1d5db" strokeWidth="2" />
          <text x="120" y="280" fontSize="12" fill="#6b7280">0%</text>
          <text x="270" y="280" fontSize="12" fill="#6b7280">50%</text>
          <text x="420" y="280" fontSize="12" fill="#6b7280">100%</text>
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

export default DotPlot;
