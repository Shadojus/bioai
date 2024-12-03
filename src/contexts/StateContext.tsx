// src/contexts/StateContext.tsx
"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export type StateColor = "deep-blue" | "green" | "purple" | "orange" | "gray";

export interface SystemState {
  currentState: StateColor;
  energy: number;
  focus: number;
  stress: number;
  mode: "active" | "rest" | "emergency";
  lastUpdate: Date;
}

type Action =
  | { type: "SET_STATE"; payload: StateColor }
  | {
      type: "UPDATE_METRICS";
      payload: Partial<Omit<SystemState, "currentState">>;
    }
  | { type: "SET_MODE"; payload: SystemState["mode"] };

const initialState: SystemState = {
  currentState: "green",
  energy: 100,
  focus: 100,
  stress: 0,
  mode: "active",
  lastUpdate: new Date(),
};

const StateContext = createContext<{
  state: SystemState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: SystemState, action: Action): SystemState {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, currentState: action.payload, lastUpdate: new Date() };
    case "UPDATE_METRICS":
      return { ...state, ...action.payload, lastUpdate: new Date() };
    case "SET_MODE":
      return { ...state, mode: action.payload, lastUpdate: new Date() };
    default:
      return state;
  }
}

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export const useSystemState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useSystemState must be used within a StateProvider");
  }
  return context;
};
