import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function addWorkspace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.name) {
    await checkSession(req, res);

    const rawWorkspace = await saveToDatabase(req.body);
    res.status(200).json({ ...rawWorkspace });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(body: { name: string }) {
  return await prisma.workspace.create({
    select: {
      id: true,
      name: true,
      column: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
    data: {
      name: body.name,
      column: {
        createMany: {
          data: [
            {
              name: "Start",
            },
            {
              name: "Stop",
            },
            {
              name: "Future",
            },
          ],
        },
      },
    },
  });
}

function saveToRedis(body: { name: string }, id: string): void {
  // TODO: Add to redis
}
