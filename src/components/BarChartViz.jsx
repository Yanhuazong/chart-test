import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Download } from 'lucide-react';

const BarChartViz = ({ data, colors, title, chartRef, isSelected, onSelect, onDownload }) => {
  return (
    <div 
      ref={chartRef}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow relative"
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="model" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fontSize: 12 }}
            label={{ 
              value: 'Accuracy (%)', 
              angle: -90, 
              position: 'insideLeft', 
              offset:10,
              style: { textAnchor: 'middle', fill: '#374151', fontSize: 14, fontWeight: 'bold' }
            }}
          />
          <Bar dataKey="accuracy">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
            <LabelList
              dataKey="accuracy"
              content={(props) => {
                const { x, y, width, height, value } = props;
                const insideThreshold = 60; // px bar height required to show label inside
                const padding = 6;
                const isInside = height > insideThreshold;
                // y is the top of the bar; height extends downward
                const labelY = isInside ? y + padding + 12 : y - 6; // inside slightly below top, else just above
                const labelFill = isInside ? '#000' : '#374151';
                return (
                  <text
                    x={x + width / 2}
                    y={labelY}
                    textAnchor="middle"
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

export default BarChartViz;
