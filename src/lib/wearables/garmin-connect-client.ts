// src/lib/wearables/garmin-connect-client.ts

import GarminConnect from "garmin-connect";

export class GarminClient {
  private static instance: GarminConnect | null = null;

  static async createClient(
    email: string,
    password: string
  ): Promise<GarminConnect> {
    try {
      // Create a new GarminConnect instance with provided credentials
      const client = new GarminConnect({
        username: email,
        password: password,
      });

      // Attempt to login and get user info to verify credentials
      await client.login();
      const userInfo = await client.getUserInfo();

      if (!userInfo) {
        throw new Error("Failed to verify user credentials");
      }

      this.instance = client;
      return client;
    } catch (error: any) {
      // Enhanced error handling
      const errorMessage = error?.message || "Unknown error occurred";
      console.error("Garmin login failed:", errorMessage);

      if (errorMessage.includes("credentials")) {
        throw new Error("Invalid Garmin credentials");
      } else if (errorMessage.includes("network")) {
        throw new Error("Network error connecting to Garmin");
      } else {
        throw new Error(`Failed to connect to Garmin: ${errorMessage}`);
      }
    }
  }

  static getInstance(): GarminConnect | null {
    return this.instance;
  }

  static clearInstance(): void {
    this.instance = null;
  }
}
