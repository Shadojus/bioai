// src/components/emergency/EmergencyAlerts/index.tsx
"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, X } from "lucide-react";

interface EmergencyAlert {
  id: string;
  message: string;
  type: "warning" | "critical" | "severe";
}

export function EmergencyAlerts() {
  const [alerts] = useState<EmergencyAlert[]>([]);

  const handleDismiss = useCallback((id: string) => {
    // Will be implemented later
  }, []);

  if (!alerts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`
            rounded-lg p-4 shadow-lg
            ${alert.type === "warning" ? "bg-yellow-100 text-yellow-800" : ""}
            ${alert.type === "critical" ? "bg-orange-100 text-orange-800" : ""}
            ${alert.type === "severe" ? "bg-red-100 text-red-800" : ""}
          `}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm">{alert.message}</p>
            <button
              onClick={() => handleDismiss(alert.id)}
              className="shrink-0 rounded-full p-1 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}