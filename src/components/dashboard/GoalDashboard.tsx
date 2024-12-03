// src/components/dashboard/GoalDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { GoalManager, Goal } from "@/lib/goals/goal-manager";
import { Progress } from "@/components/ui/progress";

export function GoalDashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const manager = GoalManager.getInstance();
    setGoals(manager.getGoals());
  }, []);

  const addGoal = () => {
    const description = prompt("Enter your new goal:");
    if (description) {
      const manager = GoalManager.getInstance();
      manager.addGoal(description);
      setGoals(manager.getGoals());
    }
  };

  return (
    <div className="p-4 bg-green-50 rounded-lg shadow">
      <h3 className="text-lg font-bold">Your Goals</h3>
      <button
        onClick={addGoal}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Add Goal
      </button>
      <ul className="mt-4 space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="p-2 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <span>{goal.description}</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} />
          </li>
        ))}
      </ul>
    </div>
  );
}
