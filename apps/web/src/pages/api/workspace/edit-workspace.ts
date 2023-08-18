import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Workspace } from "../../../../../../packages/types/workspace";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function editWorkspace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await checkSession(req, res);

    const rawWorkspace = await saveToDatabase(req.body);
    res.status(200).json({ ...rawWorkspace });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(body: Workspace) {
  return await prisma.workspace.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
    },
    select: {
      id: true,
      name: true,
      column: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

function saveToRedis(body: { name: string }, id: string): void {
  // TODO: Add to redis
}
