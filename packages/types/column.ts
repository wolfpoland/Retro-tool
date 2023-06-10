import { Card, CardSchema } from "./card";
import { z } from "zod";

export type Column = {
  id: string;
  name: string;
  card: Card[];
};

export const ColumnSchema = z.object({
  id: z.number(),
  name: z.string(),
  card: z.array(CardSchema),
});

export const createColumn = (rawColumn: Column) => {
  ColumnSchema.parse(rawColumn);

  return rawColumn as Column;
};
