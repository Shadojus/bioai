// src/app/garmin-login/_components/verify-connection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function VerifyConnection() {
  const [status, setStatus] = useState<{
    login?: string;
    current?: string;
    historical?: string;
  }>({});

  const verifyRoutes = async () => {
    // Test login route
    try {
      const loginRes = await fetch("/api/garmin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com", password: "test" }),
      });
      setStatus((prev) => ({
        ...prev,
        login: loginRes.ok ? "Route OK" : `Error: ${loginRes.status}`,
      }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, login: "Route not found" }));
    }

    // Test current metrics route
    try {
      const currentRes = await fetch("/api/garmin/metrics/current");
      setStatus((prev) => ({
        ...prev,
        current: currentRes.ok ? "Route OK" : `Error: ${currentRes.status}`,
      }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, current: "Route not found" }));
    }

    // Test historical metrics route
    try {
      const historicalRes = await fetch(
        "/api/garmin/metrics/historical?days=7"
      );
      setStatus((prev) => ({
        ...prev,
        historical: historicalRes.ok
          ? "Route OK"
          : `Error: ${historicalRes.status}`,
      }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, historical: "Route not found" }));
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <Button onClick={verifyRoutes}>Verify Routes</Button>
      {Object.entries(status).length > 0 && (
        <div className="mt-4 space-y-2">
          <p>Login Route: {status.login}</p>
          <p>Current Metrics: {status.current}</p>
          <p>Historical Metrics: {status.historical}</p>
        </div>
      )}
    </div>
  );
}
