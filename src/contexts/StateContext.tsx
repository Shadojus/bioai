// src/contexts/StateContext.tsx
"use client";

import React, { createContext, useContext, useReducer } from "react";
import { StateColor } from "@/lib/state/state-manager";

export interface SystemState {
  currentState: StateColor;
  energy: number;
  focus: number;
  stress: number;
  history: Array<{ state: StateColor; timestamp: string }>;
}

type Action =
  | { type: "UPDATE_METRICS"; payload: Partial<SystemState> }
  | { type: "SET_STATE"; payload: StateColor }
  | { type: "RESET_STATE" }
  | { type: "UPDATE_ENERGY"; payload: number }
  | { type: "UPDATE_FOCUS"; payload: number }
  | { type: "UPDATE_STRESS"; payload: number }
  | { type: "TRANSITION_STATE"; payload: StateColor };

const initialState: SystemState = {
  currentState: "green",
  energy: 75,
  focus: 80,
  stress: 20,
  history: [],
};

function stateReducer(state: SystemState, action: Action): SystemState {
  switch (action.type) {
    case "UPDATE_METRICS":
      return {
        ...state,
        ...action.payload,
        history: [
          ...state.history,
          {
            state: action.payload.currentState || state.currentState,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "SET_STATE":
      return {
        ...state,
        currentState: action.payload,
        history: [
          ...state.history,
          {
            state: action.payload,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "UPDATE_ENERGY":
      return {
        ...state,
        energy: action.payload,
      };

    case "UPDATE_FOCUS":
      return {
        ...state,
        focus: action.payload,
      };

    case "UPDATE_STRESS":
      return {
        ...state,
        stress: action.payload,
      };

    case "TRANSITION_STATE":
      return {
        ...state,
        currentState: action.payload,
        history: [
          ...state.history,
          {
            state: action.payload,
            timestamp: new Date().toISOString(),
          },
        ],
      };

    case "RESET_STATE":
      return initialState;

    default:
      console.warn("Unknown action type:", (action as any).type);
      return state;
  }
}

interface StateContextType {
  state: SystemState;
  dispatch: React.Dispatch<Action>;
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useSystemState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useSystemState must be used within a StateProvider");
  }
  return context;
};

// Helper functions
export const updateMetrics = (metrics: Partial<SystemState>) => ({
  type: "UPDATE_METRICS" as const,
  payload: metrics,
});

export const setState = (state: StateColor) => ({
  type: "SET_STATE" as const,
  payload: state,
});

export const updateEnergy = (energy: number) => ({
  type: "UPDATE_ENERGY" as const,
  payload: energy,
});

export const updateFocus = (focus: number) => ({
  type: "UPDATE_FOCUS" as const,
  payload: focus,
});

export const updateStress = (stress: number) => ({
  type: "UPDATE_STRESS" as const,
  payload: stress,
});

export const transitionState = (state: StateColor) => ({
  type: "TRANSITION_STATE" as const,
  payload: state,
});

export const resetState = () => ({
  type: "RESET_STATE" as const,
});
