import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SortOrder } from "~/utils/helpers";

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
  y: number;
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

const compareTitles = (a: Title, b: Title, key: "titleNumber" | "tenure", order: SortOrder) => {
  const result = a[key].localeCompare(b[key]);
  return order === "asc" ? result : -result;
}

const testDataUrl = "https://owfetechtask.blob.core.windows.net/titledata/testdata.json";

export const titleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      page: z.number(),
      pageSize: z.number(),
      sort: z.object({
        by: z.enum(["titleNumber", "tenure"]),
        order: z.enum(["asc", "desc"]),
      }),
    }))
    .query(async ({ input }) => {
      const res = await fetch(testDataUrl);
      const data = await res.json() as APITitle[];
      let normalizedData = data.map((title) => normalizeTitle(title));

      if (input.sort) {
        normalizedData = normalizedData.sort((a, b) => compareTitles(a, b, input.sort.by, input.sort.order));
      }

      const start = input.pageSize * (input.page - 1);
      const end = start + input.pageSize;

      return normalizedData.slice(start, end);
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
