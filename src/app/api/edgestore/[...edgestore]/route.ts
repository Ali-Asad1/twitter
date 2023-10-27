import getCurrentUser from "@/actions/getCurrentUser";
import { initEdgeStore } from "@edgestore/server";
import {
  type CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
  username: string;
};

const createContext = async ({ req }: CreateContextOptions): Promise<Context> => {
  const user = await getCurrentUser();
  return {
    username: user?.username as string,
  };
};

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket()
    .input(
      z.object({
        category: z.string(),
      })
    )
    .path(({ ctx, input }) => [{ category: input.category }, { author: ctx.username }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
