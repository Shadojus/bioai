// convex/messages.ts

import { Id } from "../convex/_generated/dataModel";
import { mutation, query } from "../convex/_generated/server";

export const list = query(async ({ db }): Promise<Message[]> => {
  const rawMessages = await db.query("messages").collect();
  return rawMessages.map((msg) => ({
    _id: msg._id as Id<"messages">, // Casting für Typkompatibilität
    content: msg.content,
    role: msg.role as "user" | "assistant",
  }));
});

export const send = mutation(
  async ({ db }, { content }: { content: string }) => {
    const messageId: Id<"messages"> = Id.fromString(new ObjectId().toString()); // Typ sicher erstellen
    const message: Message = {
      _id: messageId,
      content,
      role: "assistant",
    };
    await db.insert("messages", message);
  }
);

interface Message {
  _id: Id<"messages">; // Typ für die Tabelle "messages"
  content: string;
  role: "user" | "assistant";
}
