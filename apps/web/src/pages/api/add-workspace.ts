import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addWorkspace(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || !req?.body?.name) {
    await prisma.workspace.create({
      data: {
        name: req.body.name,
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
    res.status(200).json({ message: "Updated" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
