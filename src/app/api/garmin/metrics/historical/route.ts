// src/app/api/garmin/metrics/historical/route.ts

import { NextRequest, NextResponse } from "next/server";
import { garminService } from "@/lib/wearables/garmin-service";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("garmin_session");

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "7");
    const metrics = await garminService.getHistoricalMetrics(days);
    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error("Error fetching historical metrics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch historical metrics" },
      { status: 500 }
    );
  }
}
