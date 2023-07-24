import { Card, CardSchema } from "./card";
import { z } from "zod";

export type Column = {
  id: number;
  name: string;
  card: Card[];
};

export const ColumnSchema = z.object({
  id: z.number(),
  name: z.string(),
  card: z.array(CardSchema).optional(),
});

export const createColumn = (rawColumn: Column) => {
  ColumnSchema.parse(rawColumn);

  return rawColumn as Column;
};
