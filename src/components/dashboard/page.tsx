// src/app/dashboard/page.tsx
"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg text-gray-700">
        Welcome to your personal dashboard. Access your biometric data, manage
        your system state, and track your progress.
      </p>

      <div className="space-y-4">
        {/* Garmin Login Section */}
        <div className="p-4 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700">
            Garmin Integration
          </h2>
          <p className="text-gray-600">
            To view your Garmin data, you need to log in to your Garmin account
            first.
          </p>
          <Link href="/garmin-login">
            <a className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
              Go to Garmin Login
            </a>
          </Link>
        </div>

        {/* Other Dashboard Sections */}
        <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700">
            Biometric Dashboard
          </h2>
          <p className="text-gray-600">
            View your real-time biometric metrics from Garmin and other wearable
            devices.
          </p>
          <Link href="/biometric-dashboard">
            <a className="mt-2 inline-block px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
              Open Biometric Dashboard
            </a>
          </Link>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-700">
            Success Tracker
          </h2>
          <p className="text-gray-600">
            Monitor your achievements and track your progress toward goals.
          </p>
          <Link href="/success-tracker">
            <a className="mt-2 inline-block px-4 py-2 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-600">
              View Success Tracker
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
