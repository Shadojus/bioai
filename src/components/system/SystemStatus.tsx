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

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-4 h-4 rounded-full ${stateColors[state.currentState]}`}
            />
            <span className="font-medium">
              Current State: {state.currentState}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Energy</span>
              <span>{state.energy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${state.energy}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Focus</span>
              <span>{state.focus}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${state.focus}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Stress</span>
              <span>{state.stress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${state.stress}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
