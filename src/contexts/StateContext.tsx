// src/contexts/StateContext.tsx
"use client";

import React, { createContext, useContext, useReducer } from "react";

export interface SystemState {
  currentState: string;
  energy: number;
  focus: number;
  stress: number;
  history: Array<{ state: string; timestamp: string }>;
}

type Action =
  | { type: "UPDATE_METRICS"; payload: Partial<SystemState> }
  | { type: "RESET_STATE" };

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
    case "RESET_STATE":
      return initialState;
    default:
      throw new Error("Unhandled action type");
  }
}

const StateContext = createContext<{
  state: SystemState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

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
