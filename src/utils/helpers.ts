export const cn = (...inputs: (string | undefined)[]) => {
  return inputs.join(" ");
}

export type SortOrder = "asc" | "desc";