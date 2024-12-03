// src/components/message-list.tsx
import { cn } from "@/lib/utils";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex w-full",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%]",
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
