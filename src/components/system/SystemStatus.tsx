// src/components/system/SystemStatus.tsx

"use client";

import { useSystemState } from "@/contexts/StateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stateColors = {
  "deep-blue": "bg-blue-600",
  green: "bg-green-500",
  purple: "bg-purple-600",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
};

export function SystemStatus() {
  const { state } = useSystemState();

  if (!state) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No system state available.</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current State */}
          <div className="flex items-center space-x-4">
            <div
              className={`w-4 h-4 rounded-full ${
                stateColors[state.currentState] || "bg-gray-400"
              }`}
            />
            <span className="font-medium">
              Current State: {state.currentState}
            </span>
          </div>

          {/* Energy */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Energy</span>
              <span>{state.energy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${state.energy}%` }}
              />
            </div>
          </div>

          {/* Focus */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Focus</span>
              <span>{state.focus}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${state.focus}%` }}
              />
            </div>
          </div>

          {/* Stress */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Stress</span>
              <span>{state.stress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${state.stress}%` }}
              />
            </div>
          </div>

          {/* Historical State History */}
          <div>
            <h3 className="text-lg font-medium mb-2">State History</h3>
            {state.history.length === 0 ? (
              <div className="text-gray-500">
                No historical states recorded.
              </div>
            ) : (
              <ul className="list-disc list-inside text-sm space-y-1">
                {state.history.map((entry, index) => (
                  <li key={index}>
                    {entry.timestamp} - {entry.state}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
