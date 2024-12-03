// src/lib/ai/chatgpt-service.ts
/**
 * ChatGPTService
 * Diese Klasse verwaltet die Kommunikation mit der OpenAI ChatGPT API.
 */

export interface ChatGPTRequest {
  prompt: string;
  userContext?: {
    goals: string[];
    recentAchievements: string[];
  };
}

export interface ChatGPTResponse {
  message: string;
  suggestions?: string[];
}

export class ChatGPTService {
  private static instance: ChatGPTService;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("ChatGPT API key is missing.");
    }
  }

  public static getInstance(): ChatGPTService {
    if (!ChatGPTService.instance) {
      ChatGPTService.instance = new ChatGPTService();
    }
    return ChatGPTService.instance;
  }

  public async sendRequest(request: ChatGPTRequest): Promise<ChatGPTResponse> {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: request.prompt,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from ChatGPT.");
    }

    const data = await response.json();
    return {
      message: data.choices[0].text.trim(),
      suggestions: data.choices[0].text
        .split("\n")
        .filter((line) => line.startsWith("-"))
        .map((line) => line.replace("-", "").trim()),
    };
  }
}
