// src/app/page.tsx
import { BiometricDashboard } from "@/components/biometrics/BiometricDashboard";
import { SystemStatus } from "@/components/system/SystemStatus";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { StateControls } from "@/components/system/StateControls";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">BioAI Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your integrated biological and artificial intelligence system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* System Status */}
        <div className="col-span-1">
          <SystemStatus />
        </div>

        {/* State Controls */}
        <div className="col-span-1">
          <StateControls />
        </div>
      </div>

      {/* Biometric Dashboard */}
      <div className="mb-6">
        <BiometricDashboard />
      </div>

      {/* AI Assistant Integration */}
      <div>
        <AIAssistant />
      </div>
    </div>
  );
}
