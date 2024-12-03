// src/pages/api/garmin/current.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { GarminMetrics } from "@/lib/wearables/garmin-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GarminMetrics | { error: string }>
) {
  try {
    // Simulated data for testing
    const metrics: GarminMetrics = {
      bodyBattery: 75,
      heartRate: 68,
      readinessScore: 85,
      steps: 5000,
      stressLevel: 20,
      timestamp: new Date().toISOString(),
    };
    res.status(200).json(metrics);
  } catch (error) {
    console.error("Error fetching current Garmin metrics:", error);
    res.status(500).json({ error: "Failed to fetch Garmin metrics." });
  }
}
