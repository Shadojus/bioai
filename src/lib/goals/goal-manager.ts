// src/lib/goals/goal-manager.ts
/**
 * GoalManager
 * Verwalte langfristige Ziele und ihren Fortschritt.
 */

export interface Goal {
  id: string;
  description: string;
  progress: number; // 0 bis 100 Prozent
  completed: boolean;
}

export class GoalManager {
  private static instance: GoalManager;
  private goals: Goal[] = [];

  private constructor() {}

  public static getInstance(): GoalManager {
    if (!GoalManager.instance) {
      GoalManager.instance = new GoalManager();
    }
    return GoalManager.instance;
  }

  public addGoal(description: string): Goal {
    const newGoal: Goal = {
      id: `${Date.now()}`,
      description,
      progress: 0,
      completed: false,
    };

    this.goals.push(newGoal);
    return newGoal;
  }

  public updateProgress(goalId: string, progress: number) {
    const goal = this.goals.find((g) => g.id === goalId);
    if (goal) {
      goal.progress = Math.min(Math.max(progress, 0), 100);
      goal.completed = goal.progress === 100;
    }
  }

  public getGoals(): Goal[] {
    return this.goals;
  }
}
