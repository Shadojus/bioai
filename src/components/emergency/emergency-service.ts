// src/lib/emergency/emergency-service.ts
export type EmergencyLevel = "warning" | "critical" | "severe";

export interface EmergencyEvent {
  id: string;
  level: EmergencyLevel;
  type: string;
  description: string;
  timestamp: Date;
  metrics?: Record<string, any>;
  resolved?: boolean;
  resolvedAt?: Date;
}

export interface EmergencyThresholds {
  bodyBattery: number;
  stressLevel: number;
  heartRate: { min: number; max: number };
}

class EmergencyService {
  private static instance: EmergencyService;
  private activeEmergencies: Map<string, EmergencyEvent> = new Map();
  private subscribers: Set<(event: EmergencyEvent) => void> = new Set();

  private thresholds: EmergencyThresholds = {
    bodyBattery: 20,
    stressLevel: 80,
    heartRate: { min: 40, max: 150 },
  };

  private constructor() {}

  public static getInstance(): EmergencyService {
    if (!EmergencyService.instance) {
      EmergencyService.instance = new EmergencyService();
    }
    return EmergencyService.instance;
  }

  public setThresholds(thresholds: Partial<EmergencyThresholds>) {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  public subscribe(callback: (event: EmergencyEvent) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  public async checkMetrics(metrics: BiometricData): Promise<EmergencyEvent[]> {
    const emergencies: EmergencyEvent[] = [];

    // Check body battery
    if (metrics.bodyBattery < this.thresholds.bodyBattery) {
      emergencies.push(
        this.createEmergencyEvent(
          "low_energy",
          "warning",
          `Body battery critically low: ${metrics.bodyBattery}%`,
          metrics
        )
      );
    }

    // Check stress level
    if (metrics.stressLevel > this.thresholds.stressLevel) {
      emergencies.push(
        this.createEmergencyEvent(
          "high_stress",
          "critical",
          `Stress level exceeds threshold: ${metrics.stressLevel}`,
          metrics
        )
      );
    }

    // Check heart rate
    if (
      metrics.heartRate < this.thresholds.heartRate.min ||
      metrics.heartRate > this.thresholds.heartRate.max
    ) {
      emergencies.push(
        this.createEmergencyEvent(
          "abnormal_heart_rate",
          "severe",
          `Heart rate outside safe range: ${metrics.heartRate} BPM`,
          metrics
        )
      );
    }

    // Notify subscribers of new emergencies
    emergencies.forEach((emergency) => {
      this.activeEmergencies.set(emergency.id, emergency);
      this.notifySubscribers(emergency);
    });

    return emergencies;
  }

  private createEmergencyEvent(
    type: string,
    level: EmergencyLevel,
    description: string,
    metrics?: Record<string, any>
  ): EmergencyEvent {
    return {
      id: `${type}-${Date.now()}`,
      level,
      type,
      description,
      timestamp: new Date(),
      metrics,
    };
  }

  private notifySubscribers(event: EmergencyEvent) {
    this.subscribers.forEach((callback) => callback(event));
  }

  public resolveEmergency(id: string) {
    const emergency = this.activeEmergencies.get(id);
    if (emergency) {
      emergency.resolved = true;
      emergency.resolvedAt = new Date();
      this.activeEmergencies.delete(id);
      this.notifySubscribers({ ...emergency });
    }
  }

  public getActiveEmergencies(): EmergencyEvent[] {
    return Array.from(this.activeEmergencies.values());
  }
}

export const emergencyService = EmergencyService.getInstance();
