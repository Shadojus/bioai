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

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  width = 400,
  height = 200,
  color = "#3b82f6",
  className = "",
}) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

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
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2}
          className="transition-all duration-300"
        />
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
                className="text-xs text-gray-500"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
