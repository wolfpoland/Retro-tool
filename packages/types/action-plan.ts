import { z } from "zod";

export type ActionPlanRaw = Partial<ActionPlan>;

export enum ActionPlanStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
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
  id: z.number(),
  text: z.string(),
  percentage: z.number(),
  assignee: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createActionPlan = (rawCard: ActionPlanRaw) => {
  ActionPlanSchema.parse(rawCard);

  return rawCard as ActionPlan;
};
