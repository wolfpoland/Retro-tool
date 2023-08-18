import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ActionPlanRaw } from "../../../../../../packages/types/action-plan";
import prisma from "@/utils/prisma";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function deleteActionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Wrong method");
    }

    await checkSession(req, res);

    const { id } = await saveToDatabase(req.body);

    if (!id) {
      throw new Error("Action plan not found");
    }

    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function saveToDatabase(actionPlanRaw: ActionPlanRaw) {
  const schema = z.object({
    id: z.number(),
  });

  const data = schema.parse(actionPlanRaw);

  return await prisma.actionPlan.delete({
    where: {
      id: data.id,
    },
    select: {
      id: true,
    },
  });
}
