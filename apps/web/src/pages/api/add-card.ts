import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function addCard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.name) {
    await checkSession(req, res);

    const card = await saveToDatabase({
      text: req.body.text,
      columnId: parseInt(req.body.columnId),
    });
    res.status(200).json({ id: card.id });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(data: { text: string; columnId: number }) {
  const schema = z.object({
    text: z.string(),
    columnId: z.number(),
  });

  schema.parse(data);

  return await prisma.card.create({
    data: {
      text: data.text,
      columnId: data.columnId,
    },
  });
}
