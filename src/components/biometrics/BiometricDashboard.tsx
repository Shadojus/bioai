// src/components/biometrics/BiometricDashboard.tsx
"use client";

import { useWearable } from "@/hooks/useWearable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Heart, Brain, Activity } from "lucide-react";
import { SimpleLineChart } from "@/components/ui/chart";

export function BiometricDashboard() {
  const { currentMetrics, historicalData, loading, error } = useWearable();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg border border-red-200">
        Failed to load biometric data: {error.message}
      </div>
    );
  }

  if (!currentMetrics) return null;

  const energyData = historicalData.map((d) => ({
    value: d.bodyBattery,
    label: new Date(d.timestamp).toLocaleDateString(undefined, {
      weekday: "short",
    }),
  }));

  const metrics = [
    {
      label: "Body Battery",
      value: `${currentMetrics.bodyBattery}%`,
      icon: Battery,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      chartData: energyData,
      chartColor: "#22c55e",
    },
    {
      label: "Heart Rate",
      value: `${currentMetrics.heartRate} BPM`,
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      chartData: historicalData.map((d) => ({
        value: d.heartRate,
        label: new Date(d.timestamp).toLocaleDateString(undefined, {
          weekday: "short",
        }),
      })),
      chartColor: "#ef4444",
    },
    // ... other metrics
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Biometric Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className={`p-4 rounded-lg ${metric.bgColor}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">{metric.label}</span>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold mb-4">{metric.value}</div>
                {metric.chartData && (
                  <SimpleLineChart
                    data={metric.chartData}
                    width={400}
                    height={100}
                    color={metric.chartColor}
                    className="mt-4"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
