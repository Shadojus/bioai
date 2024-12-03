// src/pages/api/garmin/metrics.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { GarminService } from "@/lib/wearables/garmin-service";

const garminService = GarminService.getInstance();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const metrics = await garminService.getCurrentMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Garmin metrics." });
  }
}
