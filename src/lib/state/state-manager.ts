// src/lib/state/state-manager.ts

import { BiometricData } from "@/types/biometric";
import { SuccessTracker } from "@/lib/success/success-tracker";

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
  transitionRules: {
    allowedNextStates: StateColor[];
    minDuration: number; // in minutes
    cooldownPeriod: number; // in minutes
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
    transitionRules: {
      allowedNextStates: ["green", "purple", "gray"],
      minDuration: 45,
      cooldownPeriod: 120,
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

  private constructor() {}

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  /**
   * Transitions to a new state, if allowed.
   * @param newState - The target state.
   * @param force - Whether to bypass rules.
   */
  public async transitionTo(
    newState: StateColor,
    force: boolean = false
  ): Promise<boolean> {
    const currentDef = STATE_DEFINITIONS[this.currentState];
    const newDef = STATE_DEFINITIONS[newState];

    if (!force) {
      if (!this.isTransitionAllowed(newState)) {
        console.warn("Transition not allowed by rules");
        return false;
      }
      if (!this.meetsBiometricThresholds(newDef)) {
        console.warn("Biometric thresholds not met");
        return false;
      }
    }

    this.stateHistory.push({ state: this.currentState, timestamp: new Date() });
    this.currentState = newState;
    this.lastTransition = new Date();

    SuccessTracker.getInstance().logSuccess(`Transitioned to ${newState}`, 10);
    await this.initializeStateConfigs(newState);
    return true;
  }

  /**
   * Checks if the transition to a given state is allowed.
   */
  private isTransitionAllowed(newState: StateColor): boolean {
    const currentDef = STATE_DEFINITIONS[this.currentState];
    return currentDef.transitionRules.allowedNextStates.includes(newState);
  }

  /**
   * Ensures the biometric data meets the thresholds for the target state.
   */
  private meetsBiometricThresholds(stateDef: StateDefinition): boolean {
    if (!this.metrics) return false;
    return (
      this.metrics.bodyBattery >= stateDef.energyThreshold &&
      this.metrics.stressLevel <= stateDef.stressThreshold &&
      this.metrics.readinessScore >= stateDef.focusThreshold
    );
  }

  /**
   * Initializes configurations for the new state.
   */
  private async initializeStateConfigs(state: StateColor): Promise<void> {
    console.log(`Initializing state: ${state}`);
    // Add specific initialization logic here
  }

  /**
   * Returns the current state.
   */
  public getCurrentState(): StateColor {
    return this.currentState;
  }

  /**
   * Returns the full state history.
   */
  public getStateHistory(): Array<{ state: StateColor; timestamp: Date }> {
    return this.stateHistory;
  }
}
