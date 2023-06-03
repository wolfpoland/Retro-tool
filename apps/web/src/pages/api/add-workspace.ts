import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addWorkspace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.name) {
    const id = await saveToDatabase(req.body);
    res.status(200).json({ message: "Updated" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

async function saveToDatabase(body: { name: string }) {
  return await prisma.workspace.create({
    select: {
      id: true,
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
