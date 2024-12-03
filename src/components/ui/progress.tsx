// src/components/ui/progress.tsx

import React from "react";

interface ProgressProps {
  value: number;
  max: number;
}

export function Progress({ value, max }: ProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
