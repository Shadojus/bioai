// src/hooks/useAI.ts
"use client";

import { useState, useCallback } from "react";
import {
  AIIntegrationService,
  AIRequest,
  AIResponse,
} from "@/lib/ai/integration";
import { useSystemState } from "@/contexts/StateContext";

interface UseAIReturn {
  getAIResponse: (
    prompt: string,
    preferredModel?: "gpt" | "claude"
  ) => Promise<AIResponse>;
  loading: boolean;
  error: Error | null;
}

export function useAI(): UseAIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { state } = useSystemState();

  const getAIResponse = useCallback(
    async (
      prompt: string,
      preferredModel?: "gpt" | "claude"
    ): Promise<AIResponse> => {
      setLoading(true);
      setError(null);
      try {
        // Implementation here
        return {} as AIResponse; // Placeholder
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unknown error occurred");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [state]
  );

  return { getAIResponse, loading, error };
}
