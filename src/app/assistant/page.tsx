// src/app/assistant/page.tsx
"use client";

import { AssistantChat } from "@/components/assistant-chat";

export default function AssistantPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <header className="text-center">
        <h2 className="text-3xl font-bold">
          AI Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Chat with your AI Assistant for personalized insights and support.
        </p>
      </header>

      <main>
        <AssistantChat />
      </main>
    </div>
  );
}
