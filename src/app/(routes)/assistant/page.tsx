// src/app/(routes)/assistant/page.tsx
import { AssistantChat } from "@/components/assistant-chat";

export default function AssistantPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <AssistantChat />
      </div>
    </div>
  );
}
