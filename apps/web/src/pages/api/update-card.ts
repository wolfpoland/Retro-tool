"use server";
import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Card, createCard } from "../../../../../packages/types/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function updateCard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    await checkSession(req, res);

    const card = await saveToDatabase(createCard(req.body));
    res.status(200).json({
      id: card.id,
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(data: Card) {
  return await prisma.card.update({
    where: {
      id: data.id,
    },
    data: {
      text: data.text,
      columnId: data.columnId,
    },
  });
}
