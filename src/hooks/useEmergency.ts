// src/hooks/useEmergency.ts
import { useState, useEffect } from "react";
import {
  emergencyService,
  EmergencyEvent,
} from "@/components/emergency/emergency-service";
import { useWearable } from "@/hooks/useWearable";
import { useSystemState } from "@/contexts/StateContext";

export function useEmergency() {
  const [activeEmergencies, setActiveEmergencies] = useState<EmergencyEvent[]>(
    []
  );
  const { currentMetrics } = useWearable();
  const { dispatch } = useSystemState();

  useEffect(() => {
    // Subscribe to emergency events
    const unsubscribe = emergencyService.subscribe((event) => {
      if (event.resolved) {
        setActiveEmergencies((prev) => prev.filter((e) => e.id !== event.id));
      } else {
        setActiveEmergencies((prev) => [...prev, event]);
      }

      // Update system state on emergency
      if (!event.resolved) {
        dispatch({
          type: "TRANSITION_STATE",
          payload: "gray", // Switch to infrastructure/maintenance state
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    // Check metrics whenever they update
    if (currentMetrics) {
      emergencyService.checkMetrics(currentMetrics);
    }
  }, [currentMetrics]);

  const resolveEmergency = (id: string) => {
    emergencyService.resolveEmergency(id);
  };

  return {
    activeEmergencies,
    resolveEmergency,
  };
}
