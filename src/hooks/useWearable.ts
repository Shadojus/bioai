// src/hooks/useWearable.ts

import { useState, useEffect } from "react";
import { GarminMetrics } from "@/lib/wearables/garmin-service";
import { logInfo, logError } from "@/lib/utils/logging";

export function useWearable() {
  const [currentMetrics, setCurrentMetrics] = useState<GarminMetrics | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/garmin/metrics");
        if (!response.ok) {
          throw new Error("Failed to fetch Garmin metrics.");
        }

        const data: GarminMetrics = await response.json();
        setCurrentMetrics(data);
        logInfo("Garmin metrics fetched successfully.", data);
      } catch (err) {
        logError("Error fetching Garmin metrics:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return { currentMetrics, loading, error };
}
