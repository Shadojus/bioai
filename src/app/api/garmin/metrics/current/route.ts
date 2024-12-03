// src/app/api/garmin/metrics/current/route.ts

import { NextRequest, NextResponse } from "next/server";
import { garminService } from "@/lib/wearables/garmin-service";

export async function GET(request: NextRequest) {
  // Check for session cookie
  const session = request.cookies.get("garmin_session");

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const metrics = await garminService.getCurrentMetrics();

    if (!metrics) {
      throw new Error("No metrics available");
    }

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);

    // If authentication expired
    if (error instanceof Error && error.message.includes("authenticated")) {
      return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
