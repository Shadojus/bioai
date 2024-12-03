// src/hooks/useWearable.ts
import { useState, useEffect } from "react";
import {
  wearableService,
  BiometricData,
  WearableConfig,
} from "@/lib/wearables/wearable-service";
import { useSystemState } from "@/contexts/StateContext";

export function useWearable() {
  const [currentMetrics, setCurrentMetrics] = useState<BiometricData | null>(
    null
  );
  const [historicalData, setHistoricalData] = useState<BiometricData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { dispatch } = useSystemState();

  useEffect(() => {
    const config: WearableConfig = {
      type: "garmin", // Could be made configurable
      apiKey: process.env.NEXT_PUBLIC_GARMIN_API_KEY || "",
      userId: "default-user", // Should come from auth
    };

    wearableService.configure(config).catch(setError);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const metrics = await wearableService.getCurrentMetrics();
        setCurrentMetrics(metrics);

        // Update system state based on biometrics
        dispatch({
          type: "UPDATE_METRICS",
          payload: {
            energy: metrics.bodyBattery,
            stress: metrics.stressLevel,
            focus: metrics.readinessScore,
          },
        });

        const history = await wearableService.getHistoricalData(7);
        setHistoricalData(history);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch biometric data")
        );
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    fetchData();

    return () => clearInterval(interval);
  }, [dispatch]);

  return {
    currentMetrics,
    historicalData,
    loading,
    error,
  };
}
