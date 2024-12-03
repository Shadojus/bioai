// src/hooks/useWearable.ts

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface WearableMetrics {
  steps: number;
  heartRate: number;
  stressLevel: number;
  bodyBattery: number;
  readinessScore: number;
  timestamp: string;
}

export function useWearable() {
  const [currentMetrics, setCurrentMetrics] = useState<WearableMetrics | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkAuthAndFetchMetrics = async () => {
    try {
      const response = await fetch("/api/garmin/metrics/current");

      if (response.status === 401) {
        router.push("/garmin-login");
        throw new Error("Please connect your Garmin device");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }

      const data = await response.json();
      setCurrentMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics");
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    checkAuthAndFetchMetrics();

    // Set up polling every 5 minutes
    const interval = setInterval(checkAuthAndFetchMetrics, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

  const refreshMetrics = () => {
    setLoading(true);
    checkAuthAndFetchMetrics();
  };

  return {
    currentMetrics,
    loading,
    error,
    refreshMetrics,
  };
}
