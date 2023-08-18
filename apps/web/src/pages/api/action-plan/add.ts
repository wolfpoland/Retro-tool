import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ActionPlanRaw } from "../../../../../../packages/types/action-plan";
import prisma from "@/utils/prisma";
import { checkSession } from "@/pages/api/(utils)/server-session";

export default async function addActionPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Wrong method");
    }

    await checkSession(req, res);

    const actionPlan = await saveToDatabase(req.body);

    res.status(200).json({ ...actionPlan });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function saveToDatabase(actionPlanRaw: ActionPlanRaw) {
  const schema = z.object({
    text: z.string(),
    percentage: z.number(),
    assignee: z.string(),
  });

  const data = schema.parse(actionPlanRaw);

  return await prisma.actionPlan.create({
    data: {
      text: data.text,
      percentage: data.percentage,
      assignee: data.assignee,
    },
  });
}
