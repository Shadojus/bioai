// src/pages/api/garmin/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import { garminService } from "@/lib/wearables/garmin-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const response = await garminService.login(email, password);

    if (response?.success) {
      return res.status(200).json({ message: "Garmin login successful." });
    } else {
      return res
        .status(500)
        .json({ error: "Garmin login failed.", details: response });
    }
  } catch (error: any) {
    console.error("Garmin login failed:", error.message || error);

    return res.status(500).json({
      error: "Garmin login failed.",
      details: error.message || "Unknown error",
    });
  }
}
