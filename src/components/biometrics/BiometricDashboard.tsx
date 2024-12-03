// src/components/biometrics/BiometricDashboard.tsx
"use client";

import { useWearable } from "@/hooks/useWearable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Heart, Brain, Activity, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BiometricDashboard() {
  const { currentMetrics, historicalMetrics, loading, error, refreshMetrics } = useWearable();

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <div className="space-x-4">
            <Button onClick={refreshMetrics}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button asChild variant="outline">
              <Link href="/garmin-login">Reconnect Garmin</Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (loading && !currentMetrics) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      </Card>
    );
  }

  if (!currentMetrics) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-gray-500">No biometric data available.</p>
          <Button asChild>
            <Link href="/garmin-login">Connect Garmin</Link>
          </Button>
        </div>
      </Card>
    );
  }

  const metrics = [
    {
      label: "Body Battery",
      value: `${currentMetrics.bodyBattery}%`,
      icon: Battery,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Heart Rate",
      value: `${currentMetrics.heartRate} BPM`,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      label: "Readiness",
      value: `${currentMetrics.readinessScore}`,
      icon: Brain,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Steps",
      value: `${currentMetrics.steps}`,
      icon: Activity,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Biometric Data</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={refreshMetrics}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`p-4 rounded-lg ${metric.bgColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{metric.label}</span>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}