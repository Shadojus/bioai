// src/lib/state/state-manager.ts
import { BiometricData } from "@/types/biometric";
import { EnhancedAIResponse } from "@/lib/ai/enhanced-integration";

export type StateColor = "deep-blue" | "green" | "purple" | "orange" | "gray";

export interface StateDefinition {
  color: string;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  energyThreshold: number;
  stressThreshold: number;
  focusThreshold: number;
  aiModel: "gpt" | "claude" | "auto";
  transitionRules: {
    allowedNextStates: StateColor[];
    minDuration: number;
    cooldownPeriod: number;
  };
}

export const STATE_DEFINITIONS: Record<StateColor, StateDefinition> = {
  "deep-blue": {
    color: "bg-blue-600",
    name: "Deep Blue",
    description: "Strategic Planning & Deep Work",
    icon: "Brain",
    emoji: "🔵",
    energyThreshold: 70,
    stressThreshold: 30,
    focusThreshold: 80,
    aiModel: "claude",
    transitionRules: {
      allowedNextStates: ["green", "purple", "gray"],
      minDuration: 45, // minutes
      cooldownPeriod: 120, // minutes
    },
  },
  green: {
    color: "bg-green-600",
    name: "Green",
    description: "Physical Activity & Health",
    icon: "Activity",
    emoji: "🟢",
    energyThreshold: 60,
    stressThreshold: 50,
    focusThreshold: 60,
    aiModel: "auto",
    transitionRules: {
      allowedNextStates: ["deep-blue", "purple", "orange"],
      minDuration: 30,
      cooldownPeriod: 60,
    },
  },
  purple: {
    color: "bg-purple-600",
    name: "Purple",
    description: "Learning & Knowledge",
    icon: "Brain",
    emoji: "🟣",
    energyThreshold: 65,
    stressThreshold: 40,
    focusThreshold: 75,
    aiModel: "claude",
    transitionRules: {
      allowedNextStates: ["deep-blue", "green", "orange"],
      minDuration: 40,
      cooldownPeriod: 90,
    },
  },
  orange: {
    color: "bg-orange-500",
    name: "Orange",
    description: "External Communication",
    icon: "Globe",
    emoji: "🟧",
    energyThreshold: 50,
    stressThreshold: 60,
    focusThreshold: 65,
    aiModel: "gpt",
    transitionRules: {
      allowedNextStates: ["green", "purple", "gray"],
      minDuration: 25,
      cooldownPeriod: 45,
    },
  },
  gray: {
    color: "bg-gray-600",
    name: "Gray",
    description: "System Maintenance",
    icon: "Settings",
    emoji: "⚪",
    energyThreshold: 40,
    stressThreshold: 70,
    focusThreshold: 50,
    aiModel: "auto",
    transitionRules: {
      allowedNextStates: ["deep-blue", "green", "orange"],
      minDuration: 20,
      cooldownPeriod: 30,
    },
  },
};

export class StateManager {
  private static instance: StateManager;
  private currentState: StateColor = "green";
  private stateHistory: Array<{ state: StateColor; timestamp: Date }> = [];
  private lastTransition: Date = new Date();
  private metrics: BiometricData | null = null;
  private aiResponses: EnhancedAIResponse[] = [];

  private constructor() {
    this.initializeState();
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  public async transitionTo(
    newState: StateColor,
    force: boolean = false
  ): Promise<boolean> {
    const currentDef = STATE_DEFINITIONS[this.currentState];
    const newDef = STATE_DEFINITIONS[newState];

    if (!force) {
      // Check transition rules
      if (!this.isTransitionAllowed(newState)) {
        console.warn("Transition not allowed by rules");
        return false;
      }

      // Check biometric thresholds
      if (!this.meetsBiometricThresholds(newDef)) {
        console.warn("Biometric thresholds not met");
        return false;
      }
    }

    // Perform transition
    this.stateHistory.push({
      state: this.currentState,
      timestamp: new Date(),
    });
    this.currentState = newState;
    this.lastTransition = new Date();

    // Trigger state-specific initialization
    await this.initializeStateConfigs(newState);

    return true;
  }

  public async recommendNextState(): Promise<StateColor | null> {
    if (!this.metrics) return null;

    const currentDef = STATE_DEFINITIONS[this.currentState];
    const allowedStates = currentDef.transitionRules.allowedNextStates;

    // Calculate optimal next state based on current metrics and AI insights
    const scores = await Promise.all(
      allowedStates.map(async (state) => {
        const score = await this.calculateStateScore(state);
        return { state, score };
      })
    );

    const bestNextState = scores.reduce((best, current) =>
      current.score > best.score ? current : best
    );

    return bestNextState.score > this.calculateCurrentStateScore()
      ? bestNextState.state
      : null;
  }

  private async calculateStateScore(state: StateColor): Promise<number> {
    // Implementation of sophisticated scoring algorithm
    // considering biometrics, time of day, previous patterns, and AI insights
    return 0; // Placeholder
  }

  private async initializeStateConfigs(state: StateColor): Promise<void> {
    // Configure system for new state
    // Set up AI model preferences, adjust UI, etc.
  }

  // Additional helper methods...
}
