import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
  "/placeholder/1.png",
  "/placeholder/2.png",
  "/placeholder/3.png",
  "/placeholder/4.png",
  "/placeholder/5.png",
  "/placeholder/6.png",
  "/placeholder/7.png",
  "/placeholder/8.png",
  "/placeholder/9.png",
  "/placeholder/10.png",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = Math.floor(Math.random() * images.length);

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name,
      imageUrl: randomImage,
    });

    return board;
  },
});
