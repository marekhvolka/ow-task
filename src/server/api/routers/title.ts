import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type APITitle = {
  "Title Number": string;
  "Property Address": string;
  "Tenure": string;
  "X": number;
  "Y": string;
};

export type Title = {
  titleNumber: string;
  propertyAddress: string;
  tenure: string;
  x: number;
  y: string;
  
};

const normalizeTitle = (title: APITitle): Title => {
  return {
    titleNumber: title["Title Number"],
    propertyAddress: title["Property Address"],
    tenure: title.Tenure,
    x: title.X,
    y: title.Y,
  };
}

const testDataUrl = "https://owfetechtask.blob.core.windows.net/titledata/testdata.json";

export const titleRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async () => {
      const res = await fetch(testDataUrl);
      const data = await res.json() as APITitle[];
      return data.map((title) => normalizeTitle(title));
    }),

  get: publicProcedure
    .input(z.object({ titleNumber: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(testDataUrl);
      const data = await res.json() as APITitle[];
      const title = data.find((t) => t["Title Number"] === input.titleNumber);

      console.log(data.length, title, input.titleNumber);

      if (!title) {
        throw new Error("Title not found");
      }

      return normalizeTitle(title);
    }),
});
