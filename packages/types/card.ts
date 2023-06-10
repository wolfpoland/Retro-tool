import { z } from "zod";

export type Card = {
  id: number;
  text: string;
  columnId: number;
};

export const CardSchema = z.object({
  id: z.number(),
  text: z.string(),
  columnId: z.number(),
});

export const createCard = (rawCard: Card) => {
  CardSchema.parse(rawCard);

  return rawCard as Card;
};
