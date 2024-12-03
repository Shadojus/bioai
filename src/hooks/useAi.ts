// src/hooks/useAI.ts
"use client";

import { useState, useCallback } from "react";
import {
  AIIntegrationService,
  AIRequest,
  AIResponse,
} from "@/lib/ai/integration";
import { useSystemState } from "@/contexts/StateContext";
import { logError, logInfo } from "@/lib/utils/logging";

interface UseAIReturn {
  getAIResponse: (
    prompt: string,
    preferredModel?: "gpt" | "claude" | "auto"
  ) => Promise<AIResponse>;
  loading: boolean;
  error: string | null;
}

export function useAI(): UseAIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useSystemState();

  const getAIResponse = useCallback(
    async (
      prompt: string,
      preferredModel: "gpt" | "claude" | "auto" = "auto"
    ): Promise<AIResponse> => {
      setLoading(true);
      setError(null);

      try {
        const aiService = AIIntegrationService.getInstance();
        const request: AIRequest = {
          prompt,
          context: {
            systemState: state.currentState,
            userMetrics: {
              energy: state.energy,
              stress: state.stress,
              focus: state.focus,
            },
            previousResponses: [], // This could be extended for conversational context
          },
          preferredModel,
        };

        const response = await aiService.getResponse(request);

        logInfo("AI response received", response);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        logError("AI response error", err);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [state]
  );

  return { getAIResponse, loading, error };
}
