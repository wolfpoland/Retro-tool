import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ActionPlanRaw } from "../../../../../../packages/types/action-plan";
import prisma from "@/utils/prisma";

export default async function editActionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Wrong method");
    }

    const actionPlan = await saveToDatabase(req.body);

    res.status(200).json({ ...actionPlan });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function saveToDatabase(actionPlanRaw: ActionPlanRaw) {
  const schema = z.object({
    id: z.number(),
  });

  const data = schema.parse(actionPlanRaw);

  return await prisma.actionPlan.update({
    where: {
      id: data.id,
    },
    data: {
      id: actionPlanRaw.id,
      text: actionPlanRaw.text,
      percentage: actionPlanRaw.percentage,
      assignee: actionPlanRaw.assignee,
      status: actionPlanRaw.status,
      createdAt: actionPlanRaw.createdAt,
      updatedAt: actionPlanRaw.updatedAt,
    },
  });
}
