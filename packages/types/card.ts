import { z } from "zod";

export type Card = {
  id: number;
  text: string;
  columnId: number;
};

export const createCard = (rawCard: Card) => {
  const schema = z.object({
    id: z.number(),
    text: z.string(),
    columnId: z.number(),
  });

  schema.parse(rawCard);

  return rawCard as Card;
};
