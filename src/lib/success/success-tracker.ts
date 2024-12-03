// src/lib/success/success-tracker.ts

export interface SuccessLogEntry {
  message: string;
  points: number;
  timestamp: Date;
}

export class SuccessTracker {
  private static instance: SuccessTracker;
  private successLog: SuccessLogEntry[] = [];

  private constructor() {}

  public static getInstance(): SuccessTracker {
    if (!SuccessTracker.instance) {
      SuccessTracker.instance = new SuccessTracker();
    }
    return SuccessTracker.instance;
  }

  /**
   * Logs a success event with a message and associated points.
   * @param message - The success message.
   * @param points - The reward points for the success.
   */
  public logSuccess(message: string, points: number): void {
    const logEntry: SuccessLogEntry = {
      message,
      points,
      timestamp: new Date(),
    };
    this.successLog.push(logEntry);
    console.log(`Success Logged: ${message} (${points} points)`);
  }

  /**
   * Retrieves the complete success log.
   * @returns An array of success log entries.
   */
  public getSuccessLog(): SuccessLogEntry[] {
    return [...this.successLog]; // Return a copy to prevent mutations
  }

  /**
   * Calculates the total reward points from all logged successes.
   * @returns The total points.
   */
  public getTotalPoints(): number {
    return this.successLog.reduce((total, entry) => total + entry.points, 0);
  }

  /**
   * Clears the success log for resetting purposes.
   */
  public clearLog(): void {
    this.successLog = [];
    console.log("Success log cleared.");
  }
}
