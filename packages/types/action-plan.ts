import { z } from "zod";

export type ActionPlanRaw = Partial<ActionPlan>;

export type ActionPlan = {
  id: number;
  text: string;
  percentage: number;
  assignee: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ActionPlanSchema = z.object({
  id: z.number(),
  text: z.string(),
  percentage: z.number(),
  assignee: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createActionPlan = (rawCard: ActionPlan) => {
  ActionPlanSchema.parse(rawCard);

  return rawCard as ActionPlan;
};
