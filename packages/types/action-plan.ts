import { z } from "zod";

export type ActionPlanRaw = Partial<ActionPlan>;

export enum ActionPlanStatus {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

export type ActionPlan = {
  id: number;
  text: string;
  percentage: number;
  assignee: string;
  status: ActionPlanStatus;
  createdAt: string;
  updatedAt: string;
};

export const ActionPlanSchema = z.object({
  id: z.number().optional(),
  text: z.string(),
  percentage: z.number().default(0),
  assignee: z.string().default("Unassigned"),
  status: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createActionPlan = (rawCard: ActionPlanRaw) => {
  ActionPlanSchema.parse(rawCard);

  return rawCard as ActionPlan;
};
