// src/lib/ai/integration.ts
import { StateColor } from "@/contexts/StateContext";

export interface AIResponse {
  content: string;
  confidence: number;
  source: "gpt" | "claude";
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AIRequest {
  prompt: string;
  context?: {
    systemState: StateColor;
    userMetrics?: {
      energy: number;
      stress: number;
      focus: number;
    };
    previousResponses?: AIResponse[];
  };
  preferredModel?: "gpt" | "claude";
}

export class AIIntegrationService {
  private static instance: AIIntegrationService;
  private gptEndpoint: string;
  private claudeEndpoint: string;

  private constructor() {
    this.gptEndpoint = process.env.NEXT_PUBLIC_GPT_ENDPOINT || "";
    this.claudeEndpoint = process.env.NEXT_PUBLIC_CLAUDE_ENDPOINT || "";
  }

  public static getInstance(): AIIntegrationService {
    if (!AIIntegrationService.instance) {
      AIIntegrationService.instance = new AIIntegrationService();
    }
    return AIIntegrationService.instance;
  }

  async getResponse(request: AIRequest): Promise<AIResponse> {
    try {
      // Choose model based on state and context
      const model = this.determineOptimalModel(request);

      if (model === "claude") {
        return await this.getClaudeResponse(request);
      } else {
        return await this.getGPTResponse(request);
      }
    } catch (error) {
      console.error("AI Integration Error:", error);
      throw new Error("Failed to get AI response");
    }
  }

  private determineOptimalModel(request: AIRequest): "gpt" | "claude" {
    if (request.preferredModel) return request.preferredModel;

    // Use Claude for strategic and complex tasks
    if (
      request.context?.systemState === "deep-blue" ||
      request.context?.systemState === "purple"
    ) {
      return "claude";
    }

    // Use GPT for real-time and shorter responses
    return "gpt";
  }

  private async getClaudeResponse(request: AIRequest): Promise<AIResponse> {
    // Implementation for Claude API calls
    const response = await fetch(this.claudeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Claude API request failed");
    }

    const data = await response.json();
    return {
      content: data.response,
      confidence: data.confidence,
      source: "claude",
      timestamp: new Date(),
      metadata: data.metadata,
    };
  }

  private async getGPTResponse(request: AIRequest): Promise<AIResponse> {
    // Implementation for GPT API calls
    const response = await fetch(this.gptEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("GPT API request failed");
    }

    const data = await response.json();
    return {
      content: data.response,
      confidence: data.confidence,
      source: "gpt",
      timestamp: new Date(),
      metadata: data.metadata,
    };
  }
}
