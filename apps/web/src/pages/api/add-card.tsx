import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addCard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.name) {
    await saveToDatabase(req.body);
    res.status(200).json({ message: "Updated" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(body: { text: string; columnId: string }) {
  return await prisma.card.create({
    data: {
      text: body.text,
      columnId: parseInt(body.columnId),
    },
  });
}
