// convex/messages.ts
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const list = query(async ({ db }): Promise<Message[]> => {
  return await db.query("messages").collect();
});

export const send = mutation(
  async ({ db }, { content }: { content: string }) => {
    const message: Message = {
      _id: Id.fromString(new ObjectId().toString()),
      content,
      role: "assistant",
    };
    await db.insert("messages", message);
  }
);

interface Message {
  _id: Id;
  content: string;
  role: "user" | "assistant";
}
