// src/lib/ai/enhanced-integration.ts
import { StateColor } from "@/types/system";
import { BiometricData } from "@/types/biometric";

export interface EnhancedAIResponse {
  content: string;
  confidence: number;
  source: "gpt" | "claude";
  timestamp: Date;
  metadata: {
    executionTime: number;
    tokenCount: number;
    contextQuality: number;
    stateAlignment: number;
  };
  suggestions?: {
    nextActions: string[];
    stateTransitions: StateColor[];
    energyOptimizations: string[];
  };
}

export interface EnhancedAIRequest {
  prompt: string;
  context: {
    systemState: StateColor;
    biometricData: BiometricData;
    previousResponses: EnhancedAIResponse[];
    environmentData: {
      timeOfDay: string;
      location: string;
      deviceContext: string;
    };
  };
  preferences: {
    preferredModel: "gpt" | "claude" | "auto";
    responseFormat: "detailed" | "concise";
    maxTokens: number;
    temperature: number;
  };
}

export class EnhancedAIIntegrationService {
  private static instance: EnhancedAIIntegrationService;
  private readonly gptConfig: AIModelConfig;
  private readonly claudeConfig: AIModelConfig;

  private constructor() {
    this.gptConfig = {
      endpoint: process.env.NEXT_PUBLIC_GPT_ENDPOINT!,
      apiKey: process.env.GPT_API_KEY!,
      modelVersion: "gpt-4-turbo",
    };

    this.claudeConfig = {
      endpoint: process.env.NEXT_PUBLIC_CLAUDE_ENDPOINT!,
      apiKey: process.env.CLAUDE_API_KEY!,
      modelVersion: "claude-3-opus",
    };
  }

  public static getInstance(): EnhancedAIIntegrationService {
    if (!EnhancedAIIntegrationService.instance) {
      EnhancedAIIntegrationService.instance =
        new EnhancedAIIntegrationService();
    }
    return EnhancedAIIntegrationService.instance;
  }

  async processRequest(
    request: EnhancedAIRequest
  ): Promise<EnhancedAIResponse> {
    const startTime = Date.now();

    try {
      const model = this.determineOptimalModel(request);
      const response = await this.getModelResponse(request, model);

      const executionTime = Date.now() - startTime;

      return {
        ...response,
        metadata: {
          ...response.metadata,
          executionTime,
          stateAlignment: this.calculateStateAlignment(
            response,
            request.context.systemState
          ),
          contextQuality: this.evaluateContextQuality(request.context),
        },
        suggestions: await this.generateSuggestions(response, request.context),
      };
    } catch (error) {
      console.error("Enhanced AI Integration Error:", error);
      throw new Error("Failed to process AI request");
    }
  }

  private determineOptimalModel(request: EnhancedAIRequest): "gpt" | "claude" {
    if (request.preferences.preferredModel !== "auto") {
      return request.preferences.preferredModel;
    }

    // Complex decision matrix based on multiple factors
    const factors = {
      stateComplexity: this.calculateStateComplexity(
        request.context.systemState
      ),
      biometricUrgency: this.evaluateBiometricUrgency(
        request.context.biometricData
      ),
      timeConstraint: this.calculateTimeConstraint(
        request.context.environmentData
      ),
    };

    return this.evaluateModelSelection(factors);
  }

  private async generateSuggestions(
    response: EnhancedAIResponse,
    context: EnhancedAIRequest["context"]
  ): Promise<EnhancedAIResponse["suggestions"]> {
    // Implementation of advanced suggestion generation
    return {
      nextActions: await this.predictNextActions(response, context),
      stateTransitions: await this.suggestStateTransitions(context),
      energyOptimizations: await this.generateEnergyOptimizations(context),
    };
  }

  // Additional helper methods...
}
