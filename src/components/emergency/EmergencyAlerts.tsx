// src/components/emergency/EmergencyAlerts.tsx
"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, XCircle } from "lucide-react";
import { useSystemState } from "@/contexts/StateContext";

export interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  message: string;
  timestamp: Date;
}

export function EmergencyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { state } = useSystemState();

  useEffect(() => {
    // Monitor system state for potential emergencies
    if (state.energy < 20) {
      addAlert({
        type: "warning",
        message:
          "Low energy detected. Consider transitioning to recovery state.",
      });
    }

    if (state.stress > 80) {
      addAlert({
        type: "error",
        message: "High stress levels detected. Immediate action required.",
      });
    }
  }, [state]);

  const addAlert = (alert: Omit<Alert, "id" | "timestamp">) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-lg flex items-start space-x-2
            ${
              alert.type === "error"
                ? "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                : alert.type === "warning"
                  ? "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
            }`}
        >
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p className="flex-1">{alert.message}</p>
          <button
            onClick={() => removeAlert(alert.id)}
            className="flex-shrink-0 hover:opacity-75"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
