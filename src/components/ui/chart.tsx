// src/components/ui/chart.tsx
"use client";

import React from "react";

interface DataPoint {
  value: number;
  label: string;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function SimpleLineChart({
  data,
  width = 300,
  height = 100,
  color = "#3b82f6",
  className = "",
}: SimpleLineChartProps) {
  // Find min and max values for scaling
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  // Create points for the path
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={className}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Background grid */}
        <g className="text-gray-200 dark:text-gray-800">
          {[0, 0.25, 0.5, 0.75, 1].map((step) => (
            <line
              key={step}
              x1={0}
              y1={height * step}
              x2={width}
              y2={height * step}
              strokeWidth={1}
              stroke="currentColor"
            />
          ))}
        </g>

        {/* Line path */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2}
          className="transition-all duration-300"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((d.value - min) / range) * height;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={4}
                fill="white"
                stroke={color}
                strokeWidth={2}
                className="transition-all duration-300"
              />
              <text
                x={x}
                y={height + 20}
                textAnchor="middle"
                className="text-xs text-gray-500 fill-current"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        <text
          x={-10}
          y={height}
          textAnchor="end"
          className="text-xs text-gray-500 fill-current"
        >
          {min}
        </text>
        <text
          x={-10}
          y={10}
          textAnchor="end"
          className="text-xs text-gray-500 fill-current"
        >
          {max}
        </text>
      </svg>
    </div>
  );
}
