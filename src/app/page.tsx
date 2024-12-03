// src/app/page.tsx
"use client";

import { BiometricDashboard } from "@/components/biometrics/BiometricDashboard";
import { SystemStatus } from "@/components/system/SystemStatus";
import { StateControls } from "@/components/system/StateControls";
import { EmergencyAlerts } from "@/components/emergency/EmergencyAlerts";
import { SuccessDashboard } from "@/components/dashboard/SuccessDashboard";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">
          Bio<span className="text-blue-600">AI</span> Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your integrated biological and artificial intelligence system
        </p>
      </header>

      <main>
        {/* Emergency Alerts */}
        <EmergencyAlerts />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Status */}
          <div>
            <SystemStatus />
          </div>

          {/* State Controls */}
          <div>
            <StateControls />
          </div>
        </section>

        {/* Biometric Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <BiometricDashboard />
          </div>

          {/* Success Dashboard */}
          <div>
            <SuccessDashboard />
          </div>
        </section>
      </main>
    </div>
  );
}
