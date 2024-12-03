// convex/schema.ts
import { defineSchema, defineTable, s } from "convex/server";

export default defineSchema({
  messages: defineTable({
    content: s.string(),
    role: s.union(s.literal("user"), s.literal("assistant")),
  }),
});
