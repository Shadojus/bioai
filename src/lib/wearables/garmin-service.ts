// src/lib/wearables/garmin-service.ts

interface GarminSession {
  ticket: string;
  cookies: string[];
}

export class GarminService {
  private static instance: GarminService;
  private isAuthenticated: boolean = false;
  private cookies: string[] = [];

  private constructor() {}

  public static getInstance(): GarminService {
    if (!GarminService.instance) {
      GarminService.instance = new GarminService();
    }
    return GarminService.instance;
  }

  public async login(email: string, password: string): Promise<boolean> {
    try {
      // Step 1: Initial SSO request
      const ssoResponse = await fetch("https://sso.garmin.com/sso/login", {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!ssoResponse.ok) {
        throw new Error("Failed to initialize login");
      }

      // Get cookies from response
      const cookies = ssoResponse.headers.get("set-cookie");
      if (cookies) {
        this.cookies = cookies.split(",").map((cookie) => cookie.split(";")[0]);
      }

      // Step 2: Submit login credentials
      const loginResponse = await fetch("https://sso.garmin.com/sso/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0",
          Cookie: this.cookies.join("; "),
        },
        body: new URLSearchParams({
          username: email,
          password: password,
          embed: "true",
          service: "https://connect.garmin.com/modern",
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Invalid credentials");
      }

      // Update cookies from login response
      const loginCookies = loginResponse.headers.get("set-cookie");
      if (loginCookies) {
        this.cookies = [
          ...this.cookies,
          ...loginCookies.split(",").map((cookie) => cookie.split(";")[0]),
        ];
      }

      this.isAuthenticated = true;
      return true;
    } catch (error) {
      console.error("Login error:", error);
      this.isAuthenticated = false;
      throw error;
    }
  }

  public async getCurrentMetrics(): Promise<any> {
    if (!this.isAuthenticated) {
      throw new Error("Not authenticated");
    }

    try {
      const response = await fetch(
        "https://connect.garmin.com/modern/proxy/usersummary-service/usersummary/daily/latest",
        {
          headers: {
            Cookie: this.cookies.join("; "),
            "User-Agent": "Mozilla/5.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching metrics:", error);
      throw error;
    }
  }

  public logout(): void {
    this.isAuthenticated = false;
    this.cookies = [];
  }
}

export const garminService = GarminService.getInstance();
