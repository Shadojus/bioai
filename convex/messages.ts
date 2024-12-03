// convex/messages.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const message = await ctx.db.insert("messages", {
      content: args.content,
      role: args.role,
      userId: identity.subject,
      createdAt: Date.now(),
    });

    return message;
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .take(50);

    return messages;
  },
});
