import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Download } from 'lucide-react';

const HorizontalBarChartViz = ({ data, colors, chartRef, isSelected, onSelect, onDownload }) => {
  return (
    <div
      ref={chartRef}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow relative"
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Horizontal Bar Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
            margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }} 
              label={{ 
                value: 'Accuracy (%)', 
                position: 'bottom', 
                offset: 0,
                style: { fill: '#374151', fontSize: 14, fontWeight: 'bold', textAnchor: 'middle' }
              }}
            />
          <YAxis type="category" dataKey="model" width={150} interval={0} tick={{ fontSize: 12 }} />
          <Bar dataKey="accuracy">
            {data.map((entry, index) => (
              <Cell key={`hcell-${index}`} fill={colors[index]} />
            ))}
            <LabelList
              dataKey="accuracy"
              content={(props) => {
                const { x, y, width, height, value, fill } = props;
                // Padding inside bar
                const padding = 6;
                // Determine if we have enough width to place label inside; else place just outside end
                const insideThreshold = 40; // px
                const labelX = width > insideThreshold ? x + width - padding : x + width + 8;
                const labelFill = width > insideThreshold ? '#000' : '#374151';
                return (
                  <text
                    x={labelX}
                    y={y + height / 2 + 4}
                    textAnchor={width > insideThreshold ? 'end' : 'start'}
                    fontSize={12}
                    fontWeight="bold"
                    fill={labelFill}
                  >
                    {value}%
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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

export default HorizontalBarChartViz;
