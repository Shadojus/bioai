// src/pages/api/garmin/historical.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { GarminMetrics } from "@/lib/wearables/garmin-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GarminMetrics[] | { error: string }>
) {
  try {
    const days = parseInt(req.query.days as string, 10) || 7;

    // Simulated data for testing
    const now = new Date();
    const metrics: GarminMetrics[] = Array.from({ length: days }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      return {
        bodyBattery: 70 - i,
        heartRate: 65 + i,
        readinessScore: 80 - i,
        steps: 6000 - i * 100,
        stressLevel: 15 + i,
        timestamp: date.toISOString(),
      };
    });

    res.status(200).json(metrics);
  } catch (error) {
    console.error("Error fetching historical Garmin metrics:", error);
    res.status(500).json({ error: "Failed to fetch historical metrics." });
  }
}
