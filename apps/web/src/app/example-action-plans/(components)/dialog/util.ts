import { z } from "zod";

export const actionPlanFormSchema = z.object({
  text: z.string().min(2).max(255),
  assignee: z.string().min(2).max(15),
  percentage: z.array(z.number().min(0).max(100)),
});
