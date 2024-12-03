// src/app/assistant/page.tsx
import { AssistantChat } from "@/components/assistant-chat";

export default function AssistantPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
      <AssistantChat />
    </div>
  );
}
