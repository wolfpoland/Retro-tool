import { ActionPlanRaw } from "../../../../../packages/types/action-plan";

export async function addActionPlan(
  actionPlanRaw: ActionPlanRaw
): Promise<ActionPlanRaw> {
  const { text, percentage, assignee, status } = actionPlanRaw;

  const response = await fetch(`/api/action-plan/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      percentage,
      assignee,
      status,
    }),
  });

  return await response.json();
}
