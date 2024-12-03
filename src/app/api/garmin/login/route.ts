// src/app/api/garmin/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { garminService } from "@/lib/wearables/garmin-service";

export async function POST(request: NextRequest) {
  try {
    // Ensure the request is properly formatted
    if (!request.body) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    try {
      // Attempt login
      const success = await garminService.login(email, password);

      if (success) {
        // If login successful, try to get initial metrics
        try {
          const metrics = await garminService.getCurrentMetrics();

          const response = NextResponse.json({
            success: true,
            message: "Successfully connected to Garmin",
            data: metrics,
          });

          // Set session cookie
          response.cookies.set({
            name: "garmin_session",
            value: "true",
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 24 hours
          });

          return response;
        } catch (metricsError) {
          console.error("Metrics error:", metricsError);
          // Even if metrics fail, we still return success for the login
          return NextResponse.json({
            success: true,
            message: "Connected to Garmin but failed to fetch initial metrics",
          });
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to connect to Garmin",
        },
        { status: 401 }
      );
    } catch (loginError: any) {
      console.error("Login error:", loginError);
      return NextResponse.json(
        {
          success: false,
          message: loginError.message || "Failed to authenticate with Garmin",
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Request error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error processing login request",
      },
      { status: 500 }
    );
  }
}
