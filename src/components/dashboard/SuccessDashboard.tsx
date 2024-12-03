// src/components/dashboard/SuccessDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { SuccessTracker, SuccessLog } from "@/lib/success/success-tracker";
import { Trophy } from "lucide-react";

export function SuccessDashboard() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [successLog, setSuccessLog] = useState<SuccessLog[]>([]);

  useEffect(() => {
    const tracker = SuccessTracker.getInstance();
    setTotalPoints(tracker.getTotalPoints());
    setSuccessLog(tracker.getSuccessLog());
  }, []);

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Success Dashboard
      </h3>
      <p className="text-sm text-gray-600">Total Points: {totalPoints}</p>
      <ul className="mt-4 space-y-2">
        {successLog.map((log, index) => (
          <li
            key={index}
            className="p-2 bg-white rounded shadow text-sm flex justify-between items-center"
          >
            <span>{log.activity}</span>
            <span className="text-green-500 font-bold">+{log.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
