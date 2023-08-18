import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "@/utils/prisma";
import { UpdateColumCardsPositions } from "@/client-calls/column/update-colum-cards-positions";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function updatePositions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Wrong method");
    }

    await checkSession(req, res);

    await saveToDatabase(req.body);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function saveToDatabase(
  updateColumCardsPositions: UpdateColumCardsPositions
) {
  const schema = z.object({
    columnId: z.number(),
    cards: z.array(
      z.object({
        id: z.number(),
        newPosition: z.number(),
      })
    ),
  });

  const data = schema.parse(updateColumCardsPositions);
  // expensive operation
  const actions = data.cards.map((card) => {
    return prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        position: card.newPosition,
      },
    });
  });

  prisma.$transaction(actions).catch((error) => {
    console.error(error);
  });
}
