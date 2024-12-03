// convex/schema.ts
import { v } from "convex/values";
import { defineTable, defineSchema } from "convex/server";

export default defineSchema({
  messages: defineTable({
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    userId: v.string(),
    createdAt: v.number(),
  }),
});
