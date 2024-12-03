// src/lib/ai/goal-assistant.ts
/**
 * GoalAssistant
 * Dieser Assistent verfolgt langfristige Ziele und nutzt die ChatGPT-API für personalisierte Vorschläge.
 */

import {
  AIIntegrationService,
  AIRequest,
  AIResponse,
} from "@/lib/ai/integration";

export interface UserGoal {
  id: string;
  description: string;
  dueDate: Date;
  progress: number; // Prozentangabe
}

export class GoalAssistant {
  private static instance: GoalAssistant;
  private goals: UserGoal[] = [];

  private constructor() {}

  public static getInstance(): GoalAssistant {
    if (!GoalAssistant.instance) {
      GoalAssistant.instance = new GoalAssistant();
    }
    return GoalAssistant.instance;
  }

  public addGoal(description: string, dueDate: Date) {
    const newGoal: UserGoal = {
      id: crypto.randomUUID(),
      description,
      dueDate,
      progress: 0,
    };
    this.goals.push(newGoal);
    console.log(`Goal added: ${description}`);
  }

  public getGoals(): UserGoal[] {
    return this.goals;
  }

  public async getSuggestions(): Promise<AIResponse> {
    const aiService = AIIntegrationService.getInstance();
    const request: AIRequest = {
      prompt: `Provide suggestions for improving progress on the following goals: ${this.goals
        .map((goal) => goal.description)
        .join(", ")}`,
    };

    return await aiService.getResponse(request);
  }
}
