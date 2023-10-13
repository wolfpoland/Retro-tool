import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import {
  ActionPlanRaw,
  ActionPlanSchema,
} from "../../../../../../packages/types/action-plan";
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
  const data = ActionPlanSchema.parse(actionPlanRaw);

  return await prisma.actionPlan.create({
    select: {
      id: true,
      text: true,
      percentage: true,
      assignee: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      text: data.text,
      percentage: data.percentage,
      assignee: data.assignee,
      status: data.status,
    },
  });
}
