// src/components/ai/AIAssistant.tsx
"use client";

import { useState } from "react";
import { useAI } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AIAssistant() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<any[]>([]);
  const { getAIResponse, loading, error } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await getAIResponse(input);
      setResponses((prev) => [...prev, response]);
      setInput("");
    } catch (err) {
      console.error("Failed to get AI response:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
            {responses.map((response, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <p>{response.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded-md dark:bg-gray-800"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Send
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
