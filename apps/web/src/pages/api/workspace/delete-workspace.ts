import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function deleteWorkspace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.id) {
    await checkSession(req, res);

    await saveToDatabase(req.body);
    res.status(200).json({ message: "Removed" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(body: { id: number }) {
  return await prisma.workspace.delete({
    where: {
      id: body.id,
    },
  });
}

function saveToRedis(body: { name: string }, id: string): void {
  // TODO: Add to redis
}
