// src/components/assistant/GoalDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { GoalAssistant, UserGoal } from "@/lib/ai/goal-assistant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GoalDashboard() {
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [suggestions, setSuggestions] = useState<string>("");

  useEffect(() => {
    const assistant = GoalAssistant.getInstance();
    setGoals(assistant.getGoals());
  }, []);

  const addGoal = () => {
    if (newGoal && dueDate) {
      const assistant = GoalAssistant.getInstance();
      assistant.addGoal(newGoal, new Date(dueDate));
      setGoals(assistant.getGoals());
      setNewGoal("");
      setDueDate("");
    }
  };

  const fetchSuggestions = async () => {
    const assistant = GoalAssistant.getInstance();
    const response = await assistant.getSuggestions();
    setSuggestions(response.content);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h3 className="text-lg font-bold">Goal Dashboard</h3>
      <div className="mt-4">
        <Input
          placeholder="New Goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button onClick={addGoal}>Add Goal</Button>
      </div>
      <ul className="mt-4 space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="p-2 bg-white rounded shadow">
            <span>
              {goal.description} - Due: {goal.dueDate.toDateString()}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button onClick={fetchSuggestions}>Get Suggestions</Button>
        {suggestions && (
          <div className="mt-4 p-2 bg-green-100 rounded">
            <p>{suggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
