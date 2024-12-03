// src/components/system/StateControls.tsx
"use client";

import { useState } from "react";
import { useSystemState } from "@/contexts/StateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STATE_DEFINITIONS, StateColor } from "@/lib/state/state-manager";
import { Brain, Activity, Globe, Settings } from "lucide-react";

interface StateButtonProps {
  stateKey: StateColor;
  isActive: boolean;
  onClick: () => void;
}

const StateButton = ({ stateKey, isActive, onClick }: StateButtonProps) => {
  const state = STATE_DEFINITIONS[stateKey];

  return (
    <Button
      onClick={onClick}
      className={`h-24 w-full flex flex-col items-center justify-center gap-2 ${
        isActive ? state.color + " text-white" : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <div className="text-2xl">{state.emoji}</div>
      <div className="text-sm font-medium">{state.name}</div>
    </Button>
  );
};

export function StateControls() {
  const { state, dispatch } = useSystemState();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStateChange = async (newState: StateColor) => {
    setIsTransitioning(true);
    try {
      dispatch({ type: "SET_STATE", payload: newState });
    } catch (error) {
      console.error("Failed to transition state:", error);
    } finally {
      setIsTransitioning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          System State Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(STATE_DEFINITIONS).map((stateKey) => (
            <StateButton
              key={stateKey}
              stateKey={stateKey as StateColor}
              isActive={state.currentState === stateKey}
              onClick={() => handleStateChange(stateKey as StateColor)}
            />
          ))}
        </div>

        {isTransitioning && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Transitioning state...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
