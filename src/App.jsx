import React, { useRef, useState } from "react";
import "./App.css";
import BarChartViz from "./components/BarChartViz.jsx";
import HorizontalBarChartViz from "./components/HorizontalBarChartViz.jsx";
import DotPlot from "./components/DotPlot.jsx";
import LollipopChartViz from "./components/LollipopChartViz.jsx";
import PerformanceSummary from "./components/PerformanceSummary.jsx";
import { downloadChart } from "./utils/chartDownload.js";

const data = [
  { model: "SVM (RBF)", accuracy: 98.25 },
  { model: "Logistic Regression", accuracy: 96.49 },
  { model: "Random Forest", accuracy: 95.61 },
  { model: "KNN", accuracy: 95.61 },
  { model: "Naive Bayes", accuracy: 93.86 },
  { model: "Decision Tree", accuracy: 91.23 },
];

const colors = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];
const colors_highlight = [
  "#8b5cf6",
  "#c7c2c6ff",
  "#c7c2c6ff",
  "#c7c2c6ff",
  "#c7c2c6ff",
  "#c7c2c6ff",
];

function App() {
  const [selectedChart, setSelectedChart] = useState(null);
  const barChartRef = useRef(null);
  const dotPlotRef = useRef(null);
  const lollipopRef = useRef(null);
  const horizontalRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Charts Comparison
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Click on any chart to download it as PNG
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <BarChartViz
            data={data}
            colors={colors}
            title="Vertical Bar Chart With Grid"
            chartRef={barChartRef}
            isSelected={selectedChart === "bar"}
            onSelect={() => setSelectedChart("bar")}
            onDownload={(e) => {
              e.stopPropagation();
              downloadChart(barChartRef, "bar-chart.png", 3);
            }}
          />
          <BarChartViz
            data={data}
            colors={colors_highlight}
            title="Vertical Bar Chart hightlighting the best model"
            chartRef={barChartRef}
            isSelected={selectedChart === "bar"}
            onSelect={() => setSelectedChart("bar")}
            onDownload={(e) => {
              e.stopPropagation();
              downloadChart(barChartRef, "bar-chart-highlight.png", 3);
            }}
          />
          <HorizontalBarChartViz
            data={data}
            colors={colors_highlight}
            chartRef={horizontalRef}
            isSelected={selectedChart === "hbar"}
            onSelect={() => setSelectedChart("hbar")}
            onDownload={(e) => {
              e.stopPropagation();
              downloadChart(horizontalRef, "horizontal-bar-chart.png", 3);
            }}
          />

          <LollipopChartViz
            data={data}
            colors={colors}
            chartRef={lollipopRef}
            isSelected={selectedChart === "lollipop"}
            onSelect={() => setSelectedChart("lollipop")}
            onDownload={(e) => {
              e.stopPropagation();
              // Export at 3x resolution for sharper PNG
              downloadChart(lollipopRef, "lollipop-chart.png", 3);
            }}
          />

        </div>

      </div>
    </div>
  );
}

export default App;
