import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { z } from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket()
    .input(
      z.object({
        category: z.string(),
        username: z.string(),
      })
    )
    .path(({ input }) => [{ category: input.category }, { author: input.username }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
