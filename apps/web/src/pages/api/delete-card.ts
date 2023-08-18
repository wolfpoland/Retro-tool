import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function deleteCard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await checkSession(req, res);

    const card = await saveToDatabase({
      id: parseInt(req.body.id),
    });
    res.status(200).json({ id: card.id });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(data: { id: number }) {
  const schema = z.object({
    id: z.number(),
  });

  schema.parse(data);

  return await prisma.card.delete({
    where: {
      id: data.id,
    },
  });
}
