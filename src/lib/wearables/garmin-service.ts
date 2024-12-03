// src/lib/wearables/garmin-service.ts

import axios, { AxiosInstance } from "axios";

class GarminService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://connect.garmin.com",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.client.post("/signin", {
        username: email,
        password: password,
      });

      if (response.status !== 200) {
        throw new Error(
          `Garmin Login failed with status ${response.status}: ${response.statusText}`
        );
      }

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Garmin Login Error:", error.message || error);
      throw new Error(error.response?.data || "Garmin login failed.");
    }
  }
}

export const garminService = new GarminService();
