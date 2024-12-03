// src/hooks/use-chat.ts
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: number;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (we'll integrate real AI later)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand your question about biology. Let me help you with that.",
        role: "assistant",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
