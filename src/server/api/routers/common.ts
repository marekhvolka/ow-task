import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const commonRouter = createTRPCRouter({
  getMapsApiKey: publicProcedure
    .query(async () => {
      return process.env.GOOGLE_MAPS_API_KEY ?? "";
    }),
});
