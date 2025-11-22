import React from 'react';

const PerformanceSummary = ({ data, colors }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Performance Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: colors[index] }}
            ></div>
            <span className="text-sm text-gray-700">
              {item.model}: {item.accuracy}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
